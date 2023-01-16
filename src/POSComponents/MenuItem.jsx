import React from 'react'
// SCSS
import styles from './MenuItem.module.scss'

const MenuItem = ({ data, addMenuItemHandler }) => {
  return (
    <div
      className={styles.menu__item}
      onClick={() => {
        addMenuItemHandler?.(data.id, data.price, data.name)
      }}
    >
      <div className={styles.title}>{data.name}</div>
      <div className={styles.price}>${data.price}</div>
    </div>
  )
}

export default MenuItem
