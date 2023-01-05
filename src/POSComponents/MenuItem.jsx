import React from 'react'
// SCSS
import styles from './MenuItem.module.scss'

const MenuItem = ({ dish, price }) => {
  return (
    <div className={styles.menu__item}>
      <div className={styles.title}>{dish}</div>
      <div className={styles.price}>{price}</div>
    </div>
  )
}

export default MenuItem
