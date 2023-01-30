import React from 'react'
// SCSS
import styles from './AdminDetailsItem.module.scss'

const AdminDetailsItem = ({ data }) => {
  return (
    <div className={styles.item__container}>
      <div className={styles.name}>
        {data.Product.name} ({data.count})
      </div>
      <div className={styles.price}>{data.sellingPrice}</div>
    </div>
  )
}

export default AdminDetailsItem
