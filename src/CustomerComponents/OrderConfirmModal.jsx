import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// store
import { modalActions } from '../store/modal-slice'
// api
import { customerOrderApi } from '../api/orderApi'
// SCSS
import styles from './OrderConfirmModal.module.scss'

const OrderConfirmModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // localStorage
  const checkoutList = JSON.parse(localStorage.getItem('checkout_list'))
  const orderId = Number(localStorage.getItem('order_id'))
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
        navigate('/customer/receipt')
      }
      if (res.status !== 200) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '點餐失敗，請洽櫃檯。',
          showConfirmButton: false,
          timer: 2000,
        })
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
