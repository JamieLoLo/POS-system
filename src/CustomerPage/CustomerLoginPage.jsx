import React from 'react'
// hook
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle.png'
// slice
import { getOrderApi } from '../store/order-slice'
import { categoryGetAllApi } from '../store/category-slice'
// SCSS
import styles from './CustomerLoginPage.module.scss'

const CustomerLoginPage = () => {
  const dispatch = useDispatch()
  // useState
  const [table_id, setTableId] = useState()

  // 取得訂單內容 (餐點、人數)
  const getOrderHandler = () => {
    dispatch(getOrderApi({ table_id, page: 'customer_login_page' }))
  }

  // 取得所有分類
  useEffect(() => {
    dispatch(categoryGetAllApi({ page: 'customer_login_page' }))
  }, [dispatch])

  return (
    <div className={styles.page__container}>
      <div className={styles.logo__container}>
        <img className={styles.logo} src={LogoIcon} alt='' />
      </div>
      <div className={styles.content__container}>
        <div className={styles.input__container}>
          <input
            type='text'
            id='account'
            onChange={(e) => setTableId(e.target.value)}
            autoComplete='off'
            className={styles.input}
            placeholder='請輸入點餐代號'
          />
        </div>

        <button className={styles.login__button} onClick={getOrderHandler}>
          開始點餐
        </button>
      </div>
    </div>
  )
}

export default CustomerLoginPage
