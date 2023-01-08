import React from 'react'
import { Link } from 'react-router-dom'
// icon
import { ReactComponent as CustomerPlusIcon } from '../POSComponents/assets/icon/customer_plus.svg'
import { ReactComponent as CustomerMinusIcon } from '../POSComponents/assets/icon/customer_minus.svg'
// SCSS
import styles from './OrderHeadcountPage.module.scss'

const OrderCustomerPage = () => {
  return (
    <div className={styles.page__container}>
      <div className={styles.content__container}>
        <div className={styles.title}>請先選擇用餐人數再進行點餐！</div>
        <div className={styles.control__container}>
          <div className={styles.adult__container}>
            <div className={styles.subtitle}>大人</div>
            <div className={styles.count__container}>
              <div className={styles.icon__container}>
                <CustomerPlusIcon className={styles.icon} />
              </div>
              <p className={styles.count}>3</p>
              <div className={styles.icon__container}>
                <CustomerMinusIcon className={styles.icon} />
              </div>
            </div>
          </div>
          <div className={styles.children__container}>
            <div className={styles.subtitle}>小孩</div>
            <div className={styles.count__container}>
              <div className={styles.icon__container}>
                <CustomerPlusIcon className={styles.icon} />
              </div>
              <p className={styles.count}>2</p>
              <div className={styles.icon__container}>
                <CustomerMinusIcon className={styles.icon} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.button__container}>
          <button className={styles.open__button}>開桌</button>
          <Link to='/order/table'>
            <button className={styles.return__button}>返回</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderCustomerPage
