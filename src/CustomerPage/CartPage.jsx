import React from 'react'
// hook
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// UI
import {
  CartItem,
  MinimumModal,
  OrderConfirmModal,
} from '../CustomerComponents'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle.png'
// slice
import { getOrderApi } from '../store/order-slice'
// SCSS
import styles from './CartPage.module.scss'

const CartPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // sessionStorage
  const cartList = JSON.parse(sessionStorage.getItem('cart_list'))
  const checkoutList = JSON.parse(sessionStorage.getItem('checkout_list'))
  const table_id = sessionStorage.getItem('table_name')
  // useState
  const [renderList, setRenderList] = useState([])
  // useSelector
  const isCartUpdate = useSelector((state) => state.order.isCartUpdate)

  // 因為這一頁沒有打 api 的動作，資料都是從 sessionStorage 取得，當餐點數量為 0 的時候，沒有事件可以觸發重新渲染，讓它從畫面上消失，因此使用 useEffect 來打印 sessionStorage 裡的清單，在 CartItem 裡的減號 icon 設定判斷式，當數量歸零時觸發 isCartUpdate。
  useEffect(() => {
    const renderList = () => {
      const cartList = JSON.parse(sessionStorage.getItem('cart_list')) || []
      const filterList = cartList.filter((product) => product.count !== 0)
      const cartItemList = filterList.map((data) => (
        <CartItem
          data={data}
          key={data.id}
          addProductHandler={addProductHandler}
          minusProductHandler={minusProductHandler}
        />
      ))
      setRenderList(cartItemList)
    }
    renderList()
  }, [isCartUpdate])

  const addProductHandler = (id) => {
    let isProductExit = cartList.find((product) => product.id === id)

    // 用來打印畫面
    if (isProductExit) {
      // 更新數量
      let newList = cartList.map((product) => {
        if (product.id === id) {
          product.count = product.count + 1
        }
        return product
      })
      sessionStorage.setItem('cart_list', JSON.stringify(newList))
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
  }

  // 點選餐點數量減少時
  const minusProductHandler = (id) => {
    // 用來渲染畫面的資料
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
  }

  // 提交訂單
  const submitHandler = () => {
    // 再次確認後台是否更新人數
    dispatch(getOrderApi({ table_id, page: 'customer_submit' }))
  }

  return (
    <div className='mobile__main__container'>
      <MinimumModal />
      <OrderConfirmModal />
      <header>
        <div className={styles.logo__container}>
          <img className={styles.logo} src={LogoIcon} alt='' />
        </div>
        <div className={styles.restaurant__name}>咕咕義小餐館</div>
      </header>
      <main className={styles.main}>{renderList}</main>
      <footer className={styles.button__container}>
        <button
          className={styles.return__button}
          onClick={() => navigate('/customer/main')}
        >
          繼續點餐
        </button>
        <button className={styles.confirm__button} onClick={submitHandler}>
          確認送出
        </button>
      </footer>
    </div>
  )
}

export default CartPage
