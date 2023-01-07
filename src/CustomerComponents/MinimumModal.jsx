import React from 'react'
import { Link } from 'react-router-dom'
// SCSS
import styles from './MinimumModal.module.scss'

const MinimumModal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.backdrop}></div>
      <div className={styles.modal__container}>
        <div className={styles.text__container}>
          <div className={styles.title}>未達低消</div>
          <div className={styles.subtitle}>
            提醒您：距離最低消費金額還差
            <span className={styles.difference}> $100 </span>元
          </div>
        </div>
        <div className={styles.button__container}>
          <Link to='/customer/main'>
            <button className={styles.order__button}>繼續點餐</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MinimumModal
