import React from 'react'
// hook
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// UI
import { CartItem, MinimumModal, ReceiptModal } from '../CustomerComponents'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle.png'
// SCSS
import styles from './CartPage.module.scss'

const CartPage = () => {
  const navigate = useNavigate()
  // localStorage
  const cartList = JSON.parse(localStorage.getItem('cart_list'))
  const [renderList, setRenderList] = useState([])
  // useSelector
  const isCartUpdate = useSelector((state) => state.update.isCartUpdate)

  useEffect(() => {
    const renderList = () => {
      const cartList = JSON.parse(localStorage.getItem('cart_list'))
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
    if (isProductExit) {
      // 更新數量
      let newList = cartList.map((product) => {
        if (product.id === id) {
          product.count = product.count + 1
        }
        return product
      })
      localStorage.setItem('cart_list', JSON.stringify(newList))
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
  }

  const minusProductHandler = (id) => {
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
  }

  // 購物車清單

  const filterList = cartList.filter((product) => product.count !== 0)
  const cartItemList = filterList.map((data) => (
    <CartItem
      data={data}
      key={data.id}
      addProductHandler={addProductHandler}
      minusProductHandler={minusProductHandler}
    />
  ))
  return (
    <div className='mobile__main__container'>
      {/* <MinimumModal /> */}
      {/* <ReceiptModal /> */}
      <header>
        <div className={styles.logo__container}>
          <img className={styles.logo} src={LogoIcon} alt='' />
        </div>
        <div className={styles.restaurant__name}>咕咕義小餐館</div>
      </header>
      <main className={styles.main}>
        {/* {cartItemList} */}
        {renderList}
      </main>
      <footer className={styles.button__container}>
        <button
          className={styles.return__button}
          onClick={() => navigate('/customer/main')}
        >
          繼續點餐
        </button>
        <button className={styles.confirm__button}>確認送出</button>
      </footer>
    </div>
  )
}

export default CartPage
