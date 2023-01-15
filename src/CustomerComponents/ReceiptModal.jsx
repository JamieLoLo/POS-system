import React from 'react'
// hook
import { useSelector } from 'react-redux'
// SCSS
import styles from './ReceiptModal.module.scss'

const ReceiptModal = () => {
  // localStorage
  const orderId = localStorage.getItem('order_id')
  const adultCount = localStorage.getItem('adult_count')
  const childrenCount = localStorage.getItem('children_count')
  const totalPrice = localStorage.getItem('total_price')
  const tableName = localStorage.getItem('table_name')
  // useSelector
  const isReceiptModalOpen = useSelector(
    (state) => state.modal.isReceiptModalOpen
  )

  return isReceiptModalOpen ? (
    <div className={styles.modal}>
      <div className={styles.backdrop}></div>
      <div className={styles.modal__container}>
        <div className={styles.title__container}>
          <div className={styles.title}>已送單</div>
          <div className={styles.subtitle__container}>
            <div className={styles.subtitle__one}>請先至櫃檯點餐</div>
            <div className={styles.subtitle__two}>結帳後立即為您製作餐點</div>
          </div>
        </div>
        <div className={styles.detail}>
          <div className={styles.item__container}>
            <div className={styles.detail__title}>單號</div>
            <div className={styles.detail__number}>{orderId}</div>
          </div>
          <div className={styles.item__container}>
            <div className={styles.detail__title}>桌號</div>
            <div className={styles.detail__number}>{tableName}</div>
          </div>
          <div className={styles.item__container}>
            <div className={styles.detail__title}>人數</div>
            <div className={styles.detail__number}>
              {adultCount}大{childrenCount}小
            </div>
          </div>
          <div className={styles.item__container}>
            <div className={styles.detail__title}>金額</div>
            <div className={styles.detail__number}>${totalPrice}</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default ReceiptModal
