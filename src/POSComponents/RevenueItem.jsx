import React from 'react'
// SCSS
import styles from './RevenueItem.module.scss'

const RevenueItem = ({ data }) => {
  return (
    <div className={styles.list__container}>
      <div className={styles.list__item}>{data.postingDate}</div>
      <div className={styles.list__item}>{data.revenue}</div>
      <div className={styles.list__item}>{data.customerNum}</div>
      <div className={styles.list__item}>{data.revenuePerCustomer}</div>
    </div>
  )
}

export default RevenueItem
