import React from 'react'
// hook
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// default img
import DefaultFoodImg from '../POSComponents/assets/logo/logo.png'
// icon
import { ReactComponent as PlusIcon } from '../POSComponents/assets/icon/plus.svg'
import { ReactComponent as MinusIcon } from '../POSComponents/assets/icon/minus.svg'
import LoadingIcon from '../POSComponents/assets/icon/loading_circle.gif'
// store
import { modalActions } from '../store/modal-slice'
import { informationActions } from '../store/information-slice'
// SCSS
import styles from './CustomerMenuItem.module.scss'

const CustomerMenuItem = ({ data, addProductHandler, minusProductHandler }) => {
  const dispatch = useDispatch()
  // useState
  let [count, setCount] = useState(0)
  const [img, setImg] = useState(LoadingIcon)
  // sessionStorage
  const cartList = JSON.parse(sessionStorage.getItem('cart_list')) || null

  // 進入頁面時取得數量
  useEffect(() => {
    if (cartList !== null) {
      let filterData = cartList.filter((product) => product.id === data.id)
      if (filterData.length === 1) {
        setCount(filterData[0].count)
      }
    }
  }, [cartList, data.id])

  const imgLoadHandler = () => {
    if (data.image) {
      setImg(data.image)
    } else {
      setImg(DefaultFoodImg)
    }
  }

  return (
    <div className={styles.menu__item__container}>
      <div
        className={styles.image__container}
        onClick={() => {
          dispatch(informationActions.setCustomerMenuInfo(data))
          dispatch(modalActions.setIsProductDetailModalOpen(true))
        }}
      >
        <img
          className={styles.default__img}
          src={img}
          alt='food_image'
          onLoad={imgLoadHandler}
        />
      </div>
      <div className={styles.right__side__container}>
        <div className={styles.title__container}>
          <div
            className={styles.title}
            onClick={() => {
              dispatch(informationActions.setCustomerMenuInfo(data))
              dispatch(modalActions.setIsProductDetailModalOpen(true))
            }}
          >
            {data.name}
          </div>
          <div
            className={styles.name__en}
            onClick={() => {
              dispatch(informationActions.setCustomerMenuInfo(data))
              dispatch(modalActions.setIsProductDetailModalOpen(true))
            }}
          >
            {data.nameEn}
          </div>
        </div>
        <div className={styles.price}>${data.price}</div>
        <div className={styles.count__control}>
          <div
            className={styles.icon__container}
            onClick={() => {
              minusProductHandler?.(
                data.id,
                data.name,
                data.nameEn,
                data.description,
                data.price,
                data.image
              )
              if (count > 0) {
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
              addProductHandler?.(
                data.id,
                data.name,
                data.nameEn,
                data.description,
                data.price,
                data.image
              )
              if (cartList !== null) {
                let filterData = cartList.filter(
                  (product) => product.id === data.id
                )
                if (filterData.length === 1) {
                  setCount(filterData[0].count + 1)
                } else {
                  setCount((count) => count + 1)
                }
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

export default CustomerMenuItem
