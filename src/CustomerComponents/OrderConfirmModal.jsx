import React from 'react'
// hook
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// slice
import { orderActions, customerOrderApi } from '../store/order-slice'
// SCSS
import styles from './OrderConfirmModal.module.scss'

const OrderConfirmModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // sessionStorage
  const checkoutList = JSON.parse(sessionStorage.getItem('checkout_list'))
  const order_id = Number(sessionStorage.getItem('order_id'))
  const minCharge = sessionStorage.getItem('min_charge')
  const adultNum = sessionStorage.getItem('adult_count')
  const totalPrice = sessionStorage.getItem('total_price')
  // useSelector
  const isOrderConfirmModalOpen = useSelector(
    (state) => state.order.isOrderConfirmModalOpen
  )

  // 返回購物車
  const returnHandler = () => {
    dispatch(orderActions.setIsOrderConfirmModalOpen(false))
  }

  // 送出訂單
  const confirmHandler = async () => {
    let data = checkoutList

    dispatch(orderActions.setIsOrderConfirmModalOpen(false))

    // 未達低消 return
    if (totalPrice < adultNum * minCharge) {
      dispatch(orderActions.setIsMinimumModalOpen(true))
      return
    }
    // 達到低消，送出訂單。
    try {
      let res = await dispatch(
        customerOrderApi({ order_id, data, page: 'customer_order' })
      )
      if (res.payload !== undefined) {
        navigate('/customer/receipt')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return isOrderConfirmModalOpen ? (
    <div className={styles.modal}>
      <div className={styles.backdrop}></div>
      <div className={styles.modal__container}>
        <div className={styles.title__container}>
          <div className={styles.title}>要送出訂單了嗎？</div>
        </div>
        <div className={styles.button__container}>
          <button className={styles.confirm__button} onClick={confirmHandler}>
            確定
          </button>
          <button className={styles.return__button} onClick={returnHandler}>
            返回
          </button>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default OrderConfirmModal
