import React from 'react'
// SCSS
import styles from './RevenueItem.module.scss'

const RevenueItem = ({ date, revenue, tc, aov }) => {
  return (
    <div className={styles.list__container}>
      <div className={styles.list__item}>{date}</div>
      <div className={styles.list__item}>{revenue}</div>
      <div className={styles.list__item}>{tc}</div>
      <div className={styles.list__item}>{aov}</div>
    </div>
  )
}

export default RevenueItem
