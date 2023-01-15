import React from 'react'
// hook
import { useState } from 'react'
// icon
import { ReactComponent as PlusIcon } from './assets/icon/plus.svg'
import { ReactComponent as MinusIcon } from './assets/icon/minus.svg'
// SCSS
import styles from './OrderItem.module.scss'

const OrderItem = ({ data, addProductHandler, minusProductHandler }) => {
  // localStorage
  const cartList = JSON.parse(localStorage.getItem('cart_list'))
  // useState
  let [count, setCount] = useState(data.count)

  return data.count !== 0 ? (
    <div className={styles.order__item__container}>
      <div className={styles.title}>{data.name}</div>
      <div className={styles.control__container}>
        <div
          className={styles.icon__container}
          onClick={() => {
            minusProductHandler?.(data.productId)
            if (count === 1) {
              let filterData = cartList.filter(
                (product) => product.productId === data.productId
              )
              setCount(filterData[0].count - 1)
            } else if (count > 0 && count !== 1) {
              let filterData = cartList.filter(
                (product) => product.productId === data.productId
              )
              setCount(filterData[0].count - 1)
            }
          }}
        >
          <MinusIcon className={styles.icon} />
        </div>
        <div className={styles.count__container}>
          <p className={styles.count}>{count}</p>
          <p className={styles.price}>${data.sellingPrice}</p>
        </div>
        <div
          className={styles.icon__container}
          onClick={() => {
            addProductHandler?.(data.productId, data.count, data.price)
            setCount((count) => count + 1)
          }}
        >
          <PlusIcon className={styles.icon} />
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default OrderItem
