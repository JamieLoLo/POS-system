import React from 'react'
// hook
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// default img
import DefaultFoodImg from './assets/img/default_food.jpeg'
// icon
import { ReactComponent as PlusIcon } from '../POSComponents/assets/icon/plus.svg'
import { ReactComponent as MinusIcon } from '../POSComponents/assets/icon/minus.svg'
// slice
import { orderActions } from '../store/order-slice'
// SCSS
import styles from './CartItem.module.scss'

const CartItem = ({ data, addProductHandler, minusProductHandler }) => {
  const dispatch = useDispatch()
  // sessionStorage
  const cartList = JSON.parse(sessionStorage.getItem('cart_list'))
  //  useState
  let [count, setCount] = useState(0)

  // 進入頁面時取得數量
  useEffect(() => {
    let filterData = cartList.filter((product) => product.id === data.id)
    if (filterData.length === 1) {
      setCount(filterData[0].count)
    }
  }, [cartList, data.id])

  return (
    <div className={styles.menu__item__container}>
      <div className={styles.image__container}>
        <img
          className={styles.default__img}
          src={data.image ? data.image : DefaultFoodImg}
          alt=''
        />
      </div>
      <div className={styles.right__side__container}>
        <div className={styles.title__container}>
          <div className={styles.title}>{data.name}</div>
          <div className={styles.name__en}>{data.nameEn}</div>
        </div>
        <div className={styles.price}>{data.price}</div>
        <div className={styles.count__control}>
          <div
            className={styles.icon__container}
            onClick={() => {
              minusProductHandler?.(data.id)
              if (count === 1) {
                let filterData = cartList.filter(
                  (product) => product.id === data.id
                )
                setCount(filterData[0].count - 1)
                dispatch(orderActions.setIsCartUpdate())
              } else if (count > 0 && count !== 1) {
                let filterData = cartList.filter(
                  (product) => product.id === data.id
                )
                setCount(filterData[0].count - 1)
              }
            }}
          >
            <MinusIcon className={styles.icon} />
          </div>
          <div className={styles.count}>{count}</div>
          <div
            className={styles.icon__container}
            onClick={() => {
              addProductHandler?.(data.id)
              let filterData = cartList.filter(
                (product) => product.id === data.id
              )
              if (filterData.length === 1) {
                setCount(filterData[0].count + 1)
              } else {
                setCount((count) => count + 1)
              }
            }}
          >
            <PlusIcon className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
