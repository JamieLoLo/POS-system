import React from 'react'
import clsx from 'clsx'
// hook
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// UI
import {
  CustomerOrderCategory,
  CustomerMenuItem,
  ProductDetailModal,
} from '../CustomerComponents'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle.png'
import { ReactComponent as CartIcon } from '../CustomerComponents/assets/icon/cart.svg'
// slice
import { getMinimumApi } from '../store/pos-slice'
import { getOrderApi } from '../store/order-slice'
import { categoryGetAllApi, getProductsApi } from '../store/category-slice'
// SCSS
import styles from './OrderPage.module.scss'

const OrderPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // sessionStorage
  const adultNum = sessionStorage.getItem('adult_count')
  const childrenNum = sessionStorage.getItem('children_count')
  const id = sessionStorage.getItem('default_category_id')
  const table_id = sessionStorage.getItem('table_name')
  const cartList = JSON.parse(sessionStorage.getItem('cart_list')) || []
  const checkoutList = JSON.parse(sessionStorage.getItem('checkout_list')) || []
  const totalCount = sessionStorage.getItem('total_count')
  const totalPrice = sessionStorage.getItem('total_price')
  // useState
  const [totalCountForRender, setTotalCountForRender] = useState(totalCount)
  const [totalPriceForRender, setTotalPriceForRender] = useState(totalPrice)
  // useSelector
  const minCharge = useSelector((state) => state.pos.minimum).minCharge
  const description = useSelector((state) => state.pos.minimum).description
  const allCategoryData = useSelector((state) => state.category.allCategoryData)
  const products = useSelector((state) => state.category.products)

  // 取得描述
  useEffect(() => {
    dispatch(getMinimumApi())
    sessionStorage.setItem('min_charge', minCharge)
  }, [dispatch, minCharge])

  // 取得所有分類
  useEffect(() => {
    dispatch(categoryGetAllApi({ page: 'customer_order_page' }))
  }, [dispatch])

  // 取得單一分類裡的所有餐點 (首次進入本頁時)
  useEffect(() => {
    dispatch(getProductsApi({ id, page: 'customer_order_first' }))
  }, [dispatch, id])

  // 取得單一分類裡的所有餐點
  const productsHandler = async (id) => {
    dispatch(getProductsApi({ id, page: 'customer_order_select' }))
  }

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
      sessionStorage.setItem('cart_list', JSON.stringify(newList))
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
      sessionStorage.setItem('cart_list', JSON.stringify(cartList))
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
      sessionStorage.setItem('checkout_list', JSON.stringify(newList))
    } else {
      // 加入餐點
      checkoutList.push({
        productId: id,
        count: 1,
        sellingPrice: price,
      })
      sessionStorage.setItem('checkout_list', JSON.stringify(checkoutList))
    }

    let calculateCount = cartList.reduce(
      (acc, product) => acc + product.count,
      0
    )
    let calculatePrice = cartList.reduce(
      (acc, product) => acc + product.count * product.price,
      0
    )
    sessionStorage.setItem('total_count', calculateCount)
    sessionStorage.setItem('total_price', calculatePrice)
    setTotalCountForRender(calculateCount)
    setTotalPriceForRender(calculatePrice)
  }

  // 點擊減少產品數量時
  const minusProductHandler = (id) => {
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
      sessionStorage.setItem('cart_list', JSON.stringify(filterCartList))
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
      sessionStorage.setItem('checkout_list', JSON.stringify(filterCartList))
    }

    let calculateCount = cartList.reduce(
      (acc, product) => acc + product.count,
      0
    )
    let calculatePrice = cartList.reduce(
      (acc, product) => acc + product.count * product.price,
      0
    )
    sessionStorage.setItem('total_count', calculateCount)
    sessionStorage.setItem('total_price', calculatePrice)
    setTotalCountForRender(calculateCount)
    setTotalPriceForRender(calculatePrice)
  }

  // 前往購物車
  const getCartHandler = async () => {
    try {
      await dispatch(getOrderApi({ table_id, page: 'customer_go_cart' }))
      navigate('/customer/cart')
    } catch (error) {
      console.error(error)
    }
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
      <ProductDetailModal />
      <header>
        <div className={styles.logo__container}>
          <img className={styles.logo} src={LogoIcon} alt='' />
        </div>
        <div className={styles.restaurant__name}>Good Good Eat</div>
      </header>
      <div className={styles.information__container}>
        <div className={styles.description}>
          <pre className={styles.description__text}>{description}</pre>
        </div>
        <div className={styles.table__information}>
          <div className={styles.table__number}>桌號：{table_id}</div>
          <div className={styles.headcount}>
            人數：{adultNum}大 {childrenNum}小
          </div>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.classification__container}>{categoryList}</div>
        <div className={styles.menu__container}>{productList}</div>
      </main>

      <footer
        className={clsx('', {
          [styles.footer__success]: totalPrice >= adultNum * minCharge,
          [styles.footer__error]: totalPrice < adultNum * minCharge,
        })}
        onClick={getCartHandler}
      >
        <div className={styles.cart__container}>
          <div className={styles.cart__icon__container}>
            <CartIcon className={styles.icon} />
          </div>
          <div className={styles.cart__count}>{totalCountForRender}</div>
        </div>
        <div className={styles.cart__text}>購物車</div>
        <div className={styles.sum}>
          {totalPriceForRender ? '$' : ''} {totalPriceForRender}
        </div>
      </footer>
    </div>
  )
}

export default OrderPage
