import React from 'react'
// hook
import { useLocation, useNavigate } from 'react-router-dom'
// UI
import { PosMainGridSystem } from '../POSLayout/GridSystem'
// SCSS
import styles from './OrderTablePage.module.scss'

// 這邊之後改用條件式判斷，有桌號的進到/order/system，沒有桌號的進入/order/customer
const OrderTablePage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const orderHandler = () => {
    navigate('/order/system')
  }
  return (
    <div>
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.right__side__container}>
          <div className={styles.table__container}>
            <div className={styles.table_1} onClick={orderHandler}>
              <p className={styles.table__name}>A3</p>{' '}
            </div>
            <div className={styles.table_2}></div>
            <div className={styles.table_3}></div>
            <div className={styles.table_4}></div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default OrderTablePage
