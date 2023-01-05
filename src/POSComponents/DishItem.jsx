import React from 'react'
// SCSS
import styles from './DishItem.module.scss'

const DishItem = ({ dish, classification }) => {
  return (
    <div className={styles.list__container}>
      <div className={styles.list__item}>{dish}</div>
      <div className={styles.list__item}>{classification}</div>
      <div className={styles.button__container}>
        <button className={styles.modify__button}>修改</button>
        <button className={styles.delete__button}>刪除</button>
      </div>
    </div>
  )
}

export default DishItem
