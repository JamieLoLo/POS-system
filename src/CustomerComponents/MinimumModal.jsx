import React from 'react'
// hook
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// store
import { modalActions } from '../store/modal-slice'
// SCSS
import styles from './MinimumModal.module.scss'

const MinimumModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // sessionStorage
  const minCharge = sessionStorage.getItem('min_charge')
  const adultNum = sessionStorage.getItem('adult_count')
  const totalPrice = sessionStorage.getItem('total_price')
  // useSelector
  const isMinimumModalOpen = useSelector(
    (state) => state.modal.isMinimumModalOpen
  )

  // 未達低消，繼續點餐。
  const orderHandler = () => {
    dispatch(modalActions.setIsMinimumModalOpen(false))
    navigate('/customer/main')
  }

  return isMinimumModalOpen ? (
    <div className={styles.modal}>
      <div className={styles.backdrop}></div>
      <div className={styles.modal__container}>
        <div className={styles.text__container}>
          <div className={styles.title}>未達低消</div>
          <div className={styles.subtitle}>
            提醒您：距離最低消費金額還差
            <span className={styles.difference}>
              ${adultNum * minCharge - totalPrice}
            </span>
            元
          </div>
        </div>
        <div className={styles.button__container}>
          <button className={styles.order__button} onClick={orderHandler}>
            繼續點餐
          </button>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default MinimumModal
