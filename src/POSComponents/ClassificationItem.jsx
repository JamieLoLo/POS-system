import React from 'react'
// SCSS
import styles from './ClassificationItem.module.scss'

const ClassificationItem = ({ name }) => {
  return (
    <div className={styles.list__container}>
      <div className={styles.list__item}>{name}</div>
      <div className={styles.button__container}>
        <button className={styles.modify__button}>修改</button>
        <button className={styles.delete__button}>刪除</button>
      </div>
    </div>
  )
}

export default ClassificationItem
