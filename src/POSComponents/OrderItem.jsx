import React from 'react'
// icon
import { ReactComponent as PlusIcon } from './assets/icon/plus.svg'
import { ReactComponent as MinusIcon } from './assets/icon/minus.svg'
// SCSS
import styles from './OrderItem.module.scss'

const OrderItem = ({ data }) => {
  return (
    <div className={styles.order__item__container}>
      <div className={styles.title}>{data.Product.name}</div>
      <div className={styles.control__container}>
        <div className={styles.icon__container}>
          <MinusIcon className={styles.icon} />
        </div>
        <div className={styles.count__container}>
          <p className={styles.count}>{data.count}</p>
          <p className={styles.price}>${data.Product.price}</p>
        </div>
        <div className={styles.icon__container}>
          <PlusIcon className={styles.icon} />
        </div>
      </div>
    </div>
  )
}

export default OrderItem
