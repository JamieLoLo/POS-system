import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
// UI
import {
  OrderItem,
  OrderCategory,
  MenuItem,
  CheckoutModal,
  LoadingModal,
} from '../POSComponents'

// slice
import { customerOrderApi } from '../store/order-slice'
import { categoryGetAllApi, getProductsApi } from '../store/category-slice'
import {
  modifyHeadcountApi,
  posActions,
  getTablesApi,
} from '../store/pos-slice'
// icon
import { ReactComponent as CustomerPlusIcon } from '../POSComponents/assets/icon/customer_plus_white.svg'
import { ReactComponent as CustomerMinusIcon } from '../POSComponents/assets/icon/customer_minus_white.svg'
// SCSS
import styles from './OrderSystemPage.module.scss'

const OrderSystemPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // localStorage
  const orderInfo = JSON.parse(localStorage.getItem('order_info'))
  const id = localStorage.getItem('default_category_id')
  const table_id = orderInfo.tableId
  const cartList = JSON.parse(localStorage.getItem('cart_list'))
  const renderCartList = JSON.parse(localStorage.getItem('render_cart_list'))
  const minCharge = Number(localStorage.getItem('min_charge'))
  const totalPrice = orderInfo.totalPrice
  const defaultTotalPrice = orderInfo.totalPrice
  const realTotalPrice = Number(orderInfo.totalPrice)
  const tableName = orderInfo.Table.name
  const order_id = Number(orderInfo.id)
  const defaultAdultNum = orderInfo.adultNum
  const defaultChildrenNum = orderInfo.childrenNum
  // useSelector
  const allCategoryData = useSelector((state) => state.category.allCategoryData)
  const products = useSelector((state) => state.category.products)

  // useState
  const [adultNum, setAdultNum] = useState(defaultAdultNum)
  const [childrenNum, setChildrenNum] = useState(defaultChildrenNum)
  const [adultCountForCompare, setAdultCountForCompare] =
    useState(defaultAdultNum)
  const [childrenCountForCompare, setChildrenCountForCompare] =
    useState(defaultChildrenNum)
  const [totalPriceForRender, setTotalPriceForRender] = useState(totalPrice)
  const [total, setTotal] = useState(defaultTotalPrice)

  // 確認登入狀態
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/admin/login')
    }
  }, [navigate])

  // 取得所有分類
  useEffect(() => {
    dispatch(categoryGetAllApi({ page: 'admin_order_page' }))
  }, [dispatch])

  // 取得單一分類裡的所有餐點 (首次進入本頁時)
  useEffect(() => {
    dispatch(getProductsApi({ id, page: 'admin_order_first' }))
  }, [dispatch, id])

  // 刷新時更新 orderInfo
  // useEffect(() => {
  //   let table_id = tableName
  //   dispatch(getOrderApi({ table_id, page: 'pos_order_page' }))
  // }, [dispatch, table_id, tableName])

  // 取得單一分類裡的所有餐點 (點選分類結果)
  const productsHandler = async (id) => {
    dispatch(getProductsApi({ id, page: 'admin_order_select' }))
  }

  // 點擊增加購物車內產品數量時
  const addProductHandler = (productId, price, name) => {
    // 用來打印購物車的資訊
    let isProductExit = cartList.find(
      (product) => product.productId === productId
    )
    if (isProductExit) {
      // 更新數量
      let newList = cartList.map((product) => {
        if (product.productId === productId) {
          product.count = product.count + 1
        }
        return product
      })
      let filterCartList = newList.filter((product) => product.count !== 0)
      localStorage.setItem('cart_list', JSON.stringify(filterCartList))
    } else {
      // 加入餐點
      cartList.push({
        orderId: order_id,
        productId: productId,
        count: 1,
        sellingPrice: price,
      })
      localStorage.setItem('cart_list', JSON.stringify(cartList))
    }

    // 用來渲染購物車資訊
    let isRenderCartExit = renderCartList.find(
      (product) => product.productId === productId
    )
    if (isRenderCartExit) {
      // 更新數量
      let newList = renderCartList.map((product) => {
        if (product.productId === productId) {
          product.count = product.count + 1
        }
        return product
      })
      let filterCartList = newList.filter((product) => product.count !== 0)
      localStorage.setItem('render_cart_list', JSON.stringify(filterCartList))
    } else {
      // 加入餐點
      renderCartList.push({
        productId: productId,
        name: name,
        count: 1,
        sellingPrice: price,
      })
      localStorage.setItem('render_cart_list', JSON.stringify(renderCartList))
    }

    let calculatePrice = cartList.reduce(
      (acc, product) => acc + product.count * product.sellingPrice,
      0
    )
    localStorage.setItem('total_price', calculatePrice)
    setTotalPriceForRender(calculatePrice)
  }

  // 點擊減少購物車內產品數量時
  const minusProductHandler = (id) => {
    // 用來打印購物車的資訊
    let isProductExit = cartList.find((product) => product.productId === id)
    if (isProductExit) {
      // 減少數量
      let newList = cartList.map((product) => {
        if (product.productId === id && product.count !== 0) {
          product.count = product.count - 1
        }
        return product
      })
      let filterCartList = newList.filter((product) => product.count !== 0)
      localStorage.setItem('cart_list', JSON.stringify(filterCartList))
    }

    // 用來渲染購物車的資訊
    let isRenderCartExit = renderCartList.find(
      (product) => product.productId === id
    )
    if (isRenderCartExit) {
      // 減少數量
      let newList = renderCartList.map((product) => {
        if (product.productId === id && product.count !== 0) {
          product.count = product.count - 1
        }
        return product
      })
      let filterCartList = newList.filter((product) => product.count !== 0)
      localStorage.setItem('render_cart_list', JSON.stringify(filterCartList))
    }

    let calculatePrice = cartList.reduce(
      (acc, product) => acc + product.count * product.sellingPrice,
      0
    )

    localStorage.setItem('total_price', calculatePrice)
    setTotalPriceForRender(calculatePrice)
  }

  // 點擊菜單時新增商品
  const addMenuItemHandler = (productId, price, name) => {
    // 用來打印購物車的資訊
    let isProductExit = cartList.find(
      (product) => product.productId === productId
    )
    if (isProductExit) {
      return
    } else {
      // 加入餐點
      cartList.push({
        orderId: order_id,
        productId: productId,
        count: 1,
        sellingPrice: price,
      })
      localStorage.setItem('cart_list', JSON.stringify(cartList))
    }

    // 用來渲染購物車資訊
    let isRenderCartExit = renderCartList.find(
      (product) => product.productId === productId
    )
    if (isRenderCartExit) {
      return
    } else {
      // 加入餐點
      renderCartList.push({
        productId: productId,
        name: name,
        count: 1,
        sellingPrice: price,
      })
      localStorage.setItem('render_cart_list', JSON.stringify(renderCartList))
    }

    let calculatePrice = cartList.reduce(
      (acc, product) => acc + product.count * product.sellingPrice,
      0
    )
    localStorage.setItem('total_price', calculatePrice)
    setTotalPriceForRender(calculatePrice)
  }

  // 修改訂單人數或內容
  const modifyHandler = async () => {
    dispatch(posActions.setIsLoadingModalOpen(true))
    try {
      if (total !== totalPriceForRender) {
        let data = cartList
        dispatch(customerOrderApi({ order_id, data, page: 'admin_order' }))
        setTotal(totalPriceForRender)
        let newOrderInfoPrice = {
          ...orderInfo,
          totalPrice: totalPriceForRender,
        }
        localStorage.setItem('order_info', JSON.stringify(newOrderInfoPrice))
      }
      if (
        adultCountForCompare !== adultNum ||
        childrenCountForCompare !== childrenNum
      ) {
        dispatch(modifyHeadcountApi({ table_id, adultNum, childrenNum }))
        let newHeadcount = {
          ...orderInfo,
          adultNum: adultNum,
          childrenNum: childrenNum,
        }
        localStorage.setItem('order_info', JSON.stringify(newHeadcount))
        setAdultCountForCompare(adultNum)
        setChildrenCountForCompare(childrenNum)
      }
      dispatch(posActions.setIsLoadingModalOpen(false))
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '訂單更新成功',
        showConfirmButton: false,
        timer: 2000,
      })
    } catch (error) {
      console.error(error)
    }
  }

  // 結帳按鈕
  const checkoutHandler = () => {
    if (realTotalPrice < minCharge * adultNum) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '未達低消',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    } else {
      dispatch(posActions.setIsCheckoutModalOpen(true))
      dispatch(getTablesApi())
    }
  }

  //  已點品項的清單
  const orderList = renderCartList.map((data) => (
    <OrderItem
      data={data}
      key={data.productId}
      addProductHandler={addProductHandler}
      minusProductHandler={minusProductHandler}
    />
  ))

  // 類別清單
  const categoryList = allCategoryData.map((data) => (
    <OrderCategory
      data={data}
      key={data.id}
      onClick={(id) => productsHandler(id)}
    />
  ))

  // 餐點清單
  const productList = products.map((data) => (
    <MenuItem
      data={data}
      key={data.id}
      addMenuItemHandler={addMenuItemHandler}
    />
  ))

  // 返回桌子頁面
  const returnHandler = () => {
    localStorage.setItem('render_cart_list', JSON.stringify([]))
    navigate('/order/table')
  }

  return (
    <div className='main__container'>
      <CheckoutModal />
      <LoadingModal title='資料上傳中...' />
      <div className={styles.left__side__container}>
        <div className={styles.table__name__container}>
          <p className={StyleSheet.table__name}>{tableName}</p>
        </div>
        <div className={styles.order__list}>{orderList}</div>
        <div className={styles.control__container}>
          <div className={styles.adult__container}>
            <div className={styles.subtitle}>大人</div>
            <div className={styles.count__container}>
              <div className={styles.icon__container}>
                <CustomerMinusIcon
                  className={styles.icon}
                  onClick={() => {
                    if (adultNum > 0) {
                      setAdultNum((adultNum) => adultNum - 1)
                    }
                  }}
                />
              </div>
              <p className={styles.count}>{adultNum}</p>
              <div className={styles.icon__container}>
                <CustomerPlusIcon
                  className={styles.icon}
                  onClick={() => {
                    setAdultNum((adultNum) => adultNum + 1)
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.children__container}>
            <div className={styles.subtitle}>小孩</div>
            <div className={styles.count__container}>
              <div className={styles.icon__container}>
                <CustomerMinusIcon
                  className={styles.icon}
                  onClick={() => {
                    if (childrenNum > 0) {
                      setChildrenNum((childrenNum) => childrenNum - 1)
                    }
                  }}
                />
              </div>
              <p className={styles.count}>{childrenNum}</p>
              <div className={styles.icon__container}>
                <CustomerPlusIcon
                  className={styles.icon}
                  onClick={() => {
                    setChildrenNum((childrenNum) => childrenNum + 1)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right__side__container}>
        <div className={styles.classification__container}>{categoryList}</div>
        <div className={styles.menu__container}>{productList}</div>
        <div className={styles.button__container}>
          <button className={styles.return__button} onClick={returnHandler}>
            返回
          </button>
          {total === totalPriceForRender &&
            adultCountForCompare === adultNum &&
            childrenCountForCompare === childrenNum &&
            totalPrice < minCharge * adultNum && (
              <button className={styles.unreached__button}>
                未達低消
                <br />
                <p className={styles.price}>
                  差額：${minCharge * adultNum - totalPrice}
                </p>
              </button>
            )}
          {total === totalPriceForRender &&
            adultCountForCompare === adultNum &&
            childrenCountForCompare === childrenNum &&
            totalPrice >= minCharge * adultNum && (
              <button
                className={styles.checkout__button}
                onClick={checkoutHandler}
              >
                結帳
                <br />
                <p className={styles.price}>應付金額：${totalPriceForRender}</p>
              </button>
            )}
          {(total !== totalPriceForRender ||
            adultCountForCompare !== adultNum ||
            childrenCountForCompare !== childrenNum) && (
            <button className={styles.modify__button} onClick={modifyHandler}>
              修改訂單
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderSystemPage
