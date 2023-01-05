import React from 'react'
// icon
import { ReactComponent as PlusIcon } from './assets/icon/plus.svg'
import { ReactComponent as MinusIcon } from './assets/icon/minus.svg'
// SCSS
import styles from './OrderItem.module.scss'

const OrderItem = ({ dish, count, price }) => {
  return (
    <div className={styles.order__item__container}>
      <div className={styles.title}>{dish}</div>
      <div className={styles.control__container}>
        <div className={styles.icon__container}>
          <MinusIcon className={styles.icon} />
        </div>
        <div className={styles.count__container}>
          <p className={styles.count}>{count}</p>
          <p className={styles.price}>{price}</p>
        </div>
        <div className={styles.icon__container}>
          <PlusIcon className={styles.icon} />
        </div>
      </div>
    </div>
  )
}

export default OrderItem
