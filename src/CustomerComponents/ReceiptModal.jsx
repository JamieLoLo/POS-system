import React from 'react'
import { Link } from 'react-router-dom'
// SCSS
import styles from './ReceiptModal.module.scss'

const ReceiptModal = () => {
  return (
    <div className='mobile__main__container'>
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
              <div className={styles.detail__number}>015</div>
            </div>
            <div className={styles.item__container}>
              <div className={styles.detail__title}>桌號</div>
              <div className={styles.detail__number}>22</div>
            </div>
            <div className={styles.item__container}>
              <div className={styles.detail__title}>人數</div>
              <div className={styles.detail__number}>1大1小</div>
            </div>
            <div className={styles.item__container}>
              <div className={styles.detail__title}>金額</div>
              <div className={styles.detail__number}>$320</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReceiptModal
