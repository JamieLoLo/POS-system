import React from 'react'
// SCSS
import styles from './AdminDetailsItem.module.scss'

const AdminDetailsItem = () => {
  return (
    <div className={styles.item__container}>
      <div className={styles.name}>密椒小豬球 (2)</div>
      <div className={styles.price}>500</div>
    </div>
  )
}

export default AdminDetailsItem
