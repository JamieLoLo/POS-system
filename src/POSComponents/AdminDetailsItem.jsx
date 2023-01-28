import React from 'react'
// SCSS
import styles from './AdminDetailsItem.module.scss'

const AdminDetailsItem = ({ name, count, price }) => {
  return (
    <div className={styles.item__container}>
      <div className={styles.name}>
        {name} ({count})
      </div>
      <div className={styles.price}>{price}</div>
    </div>
  )
}

export default AdminDetailsItem
