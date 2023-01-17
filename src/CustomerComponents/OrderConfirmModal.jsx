import React from 'react'
// hook
import { useSelector, useDispatch } from 'react-redux'
// store
import { modalActions } from '../store/modal-slice'
// api
import { customerOrderApi } from '../api/orderApi'
// SCSS
import styles from './OrderConfirmModal.module.scss'

const OrderConfirmModal = () => {
  const dispatch = useDispatch()
  // localStorage
  const cartList = JSON.parse(localStorage.getItem('cart_list'))
  const checkoutList = JSON.parse(localStorage.getItem('checkout_list'))
  const orderId = Number(localStorage.getItem('order_id'))
  const tableId = localStorage.getItem('table_id')
  const minCharge = localStorage.getItem('min_charge')
  const adultNum = localStorage.getItem('adult_count')
  const totalPrice = localStorage.getItem('total_price')
  // useSelector
  const isOrderConfirmModalOpen = useSelector(
    (state) => state.modal.isOrderConfirmModalOpen
  )

  // 返回購物車
  const returnHandler = () => {
    dispatch(modalActions.setIsOrderConfirmModalOpen(false))
  }

  // 送出訂單
  const confirmHandler = async () => {
    dispatch(modalActions.setIsOrderConfirmModalOpen(false))
    try {
      // 未達低消 return
      if (totalPrice < adultNum * minCharge) {
        dispatch(modalActions.setIsMinimumModalOpen(true))
        return
      }
      const res = await customerOrderApi(orderId, checkoutList)
      if (res.status === 200) {
        dispatch(modalActions.setIsReceiptModalOpen(true))
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
          <button className={styles.return__button} onClick={returnHandler}>
            返回
          </button>
          <button className={styles.confirm__button} onClick={confirmHandler}>
            確定
          </button>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default OrderConfirmModal
