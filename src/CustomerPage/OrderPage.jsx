import React from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
// hook
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// UI
import { CustomerOrderCategory, CustomerMenuItem } from '../CustomerComponents'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle.png'
import { ReactComponent as CartIcon } from '../CustomerComponents/assets/icon/cart.svg'
// api
import { getMinimumApi } from '../api/posApi'
import { categoryGetAllApi, getProductsApi } from '../api/categoryApi'
import { getOrderApi } from '../api/orderApi'
// store
import { informationActions } from '../store/information-slice'
// SCSS
import styles from './OrderPage.module.scss'
import clsx from 'clsx'

const OrderPage = () => {
  const dispatch = useDispatch()
  // localStorage
  const defaultCategoryId = localStorage.getItem('default_category_id')
  const tableId = localStorage.getItem('table_id')
  const tableName = localStorage.getItem('table_name')
  const orderId = Number(localStorage.getItem('order_id'))
  const cartList = JSON.parse(localStorage.getItem('cart_list'))
  const checkoutList = JSON.parse(localStorage.getItem('checkout_list'))
  const totalCount = localStorage.getItem('total_count')
  const totalPrice = localStorage.getItem('total_price')

  // useState
  const [minimumInfo, setMinimumInfo] = useState({})
  const [allCategoryData, setAllCategoryData] = useState([])
  const [products, setProducts] = useState([])
  const [totalCountForRender, setTotalCountForRender] = useState(totalCount)
  const [totalPriceForRender, setTotalPriceForRender] = useState(totalPrice)

  // useSelector
  const orderInfo = useSelector((state) => state.information.orderInfo)

  // 取得描述
  useEffect(() => {
    const getDescription = async () => {
      try {
        const res = await getMinimumApi()
        setMinimumInfo(res.data)
        localStorage.setItem('min_charge', res.data.minCharge)
      } catch (error) {
        console.error(error)
      }
    }
    getDescription()
  }, [])

  // 取得所有分類
  useEffect(() => {
    const categoryGetAll = async () => {
      try {
        const res = await categoryGetAllApi()
        await setAllCategoryData(res.data)
        localStorage.setItem('default_category_id', res.data[0].id)
        localStorage.setItem('default_category_name', res.data[0].name)
      } catch (error) {
        console.error(error)
      }
    }
    categoryGetAll()
  }, [])

  // 取得單一分類裡的所有餐點 (首次進入本頁時)
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await getProductsApi(defaultCategoryId)
        await setProducts(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    getProducts()
  }, [defaultCategoryId])

  // 取得單一分類裡的所有餐點
  const productsHandler = async (id) => {
    try {
      const res = await getProductsApi(id)
      setProducts(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  // 取得訂單內容 (餐點、人數)
  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await getOrderApi(tableId)
        await dispatch(informationActions.setOrderInfo(res.data))
      } catch (error) {
        console.error(error)
      }
    }
    getOrder()
  }, [dispatch, tableId])

  // 分類列表
  const categoryList = allCategoryData.map((data) => (
    <CustomerOrderCategory
      data={data}
      key={data.id}
      onClick={(id) => productsHandler(id)}
    />
  ))

  // 點擊增加產品數量時
  const addProductHandler = (id, name, nameEn, description, price, image) => {
    // 用來打印購物車的資訊
    let isProductExit = cartList.find((product) => product.id === id)
    if (isProductExit) {
      // 更新數量
      let newList = cartList.map((product) => {
        if (product.id === id) {
          product.count = product.count + 1
        }
        return product
      })
      localStorage.setItem('cart_list', JSON.stringify(newList))
    } else {
      // 加入餐點
      cartList.push({
        id: id,
        name: name,
        nameEn: nameEn,
        image: image,
        description: description,
        price: price,
        count: 1,
      })
      localStorage.setItem('cart_list', JSON.stringify(cartList))
    }

    // 用來存打點餐api的資訊
    let isCheckoutExit = checkoutList.find(
      (product) => product.productId === id
    )
    if (isCheckoutExit) {
      // 更新數量
      let newList = checkoutList.map((product) => {
        if (product.productId === id) {
          product.count = product.count + 1
        }
        return product
      })
      localStorage.setItem('checkout_list', JSON.stringify(newList))
    } else {
      // 加入餐點
      checkoutList.push({
        orderId: orderId,
        productId: id,
        count: 1,
        sellingPrice: price,
      })
      localStorage.setItem('checkout_list', JSON.stringify(checkoutList))
    }

    let calculateCount = cartList.reduce(
      (acc, product) => acc + product.count,
      0
    )
    let calculatePrice = cartList.reduce(
      (acc, product) => acc + product.count * product.price,
      0
    )
    localStorage.setItem('total_count', calculateCount)
    localStorage.setItem('total_price', calculatePrice)
    setTotalCountForRender(calculateCount)
    setTotalPriceForRender(calculatePrice)
  }

  // 點擊減少產品數量時
  const minusProductHandler = (id, name, nameEn, description, price, image) => {
    // 用來打印購物車的資訊
    let isProductExit = cartList.find((product) => product.id === id)
    if (isProductExit) {
      // 減少數量
      let newList = cartList.map((product) => {
        if (product.id === id && product.count !== 0) {
          product.count = product.count - 1
        }
        return product
      })
      let filterCartList = newList.filter((product) => product.count !== 0)
      localStorage.setItem('cart_list', JSON.stringify(filterCartList))
    }

    // 用來打點餐api的資訊
    let isCheckoutExit = checkoutList.find(
      (product) => product.productId === id
    )
    if (isCheckoutExit) {
      // 減少數量
      let newList = checkoutList.map((product) => {
        if (product.productId === id && product.count !== 0) {
          product.count = product.count - 1
        }
        return product
      })
      let filterCartList = newList.filter((product) => product.count !== 0)
      localStorage.setItem('checkout_list', JSON.stringify(filterCartList))
    }

    let calculateCount = cartList.reduce(
      (acc, product) => acc + product.count,
      0
    )
    let calculatePrice = cartList.reduce(
      (acc, product) => acc + product.count * product.price,
      0
    )
    localStorage.setItem('total_count', calculateCount)
    localStorage.setItem('total_price', calculatePrice)
    setTotalCountForRender(calculateCount)
    setTotalPriceForRender(calculatePrice)
  }

  // 餐點清單
  const productList = products.map((data) => (
    <CustomerMenuItem
      key={data.id}
      data={data}
      count='1'
      addProductHandler={addProductHandler}
      minusProductHandler={minusProductHandler}
    />
  ))

  return (
    <div className='mobile__main__container'>
      <header>
        <div className={styles.logo__container}>
          <img className={styles.logo} src={LogoIcon} alt='' />
        </div>
        <div className={styles.restaurant__name}>咕咕義小餐館</div>
      </header>
      <div className={styles.information__container}>
        <div className={styles.description}>{minimumInfo.description}</div>
        <div className={styles.table__information}>
          <div className={styles.table__number}>桌號：{tableName}</div>
          <div className={styles.headcount}>
            人數：{orderInfo.adultNum}大 {orderInfo.childrenNum}小
          </div>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.classification__container}>{categoryList}</div>
        <div className={styles.menu__container}>{productList}</div>
      </main>
      <Link to='/customer/cart'>
        <footer
          className={clsx('', {
            [styles.footer__success]:
              totalPrice >= orderInfo.adultNum * minimumInfo.minCharge,
            [styles.footer__error]:
              totalPrice < orderInfo.adultNum * minimumInfo.minCharge,
          })}
        >
          <div className={styles.cart__container}>
            <div className={styles.cart__icon__container}>
              <CartIcon className={styles.icon} />
            </div>
            <div className={styles.cart__count}>{totalCountForRender}</div>
          </div>
          <div className={styles.cart__text}>購物車</div>
          <div className={styles.sum}>${totalPriceForRender}</div>
        </footer>
      </Link>
    </div>
  )
}

export default OrderPage
