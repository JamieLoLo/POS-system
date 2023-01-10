import React from 'react'
// SCSS
import styles from './MenuItem.module.scss'

const MenuItem = ({ data }) => {
  return (
    <div className={styles.menu__item}>
      <div className={styles.title}>{data.name}</div>
      <div className={styles.price}>${data.price}</div>
    </div>
  )
}

export default MenuItem
