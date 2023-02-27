import React from 'react'
// hook
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle_dark.png'
import backgroundImage from '../POSComponents/assets/background_image/login_background.jpg'
import { ReactComponent as LoadingIcon } from '../POSComponents/assets/icon/loading_ball.svg'
// slice
import { getOrderApi } from '../store/order-slice'
import { categoryGetAllApi } from '../store/category-slice'
// SCSS
import styles from './CustomerLoginPage.module.scss'

const CustomerLoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // useState
  const [table_id, setTableId] = useState()
  const [loadStatus, setLoadStatus] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = backgroundImage
    img.onload = () => setLoadStatus(true)
  }, [])

  // 取得訂單內容 (餐點、人數)
  const getOrderHandler = async () => {
    try {
      await dispatch(getOrderApi({ table_id, page: 'customer_login_page' }))
      navigate('/customer/main')
    } catch (error) {
      console.error(error)
    }
  }

  // 取得所有分類
  useEffect(() => {
    dispatch(categoryGetAllApi({ page: 'customer_login_page' }))
  }, [dispatch])

  return loadStatus === true ? (
    <div
      className={styles.page__container}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.login__container}>
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
    </div>
  ) : (
    <div className={styles.loading__icon__container}>
      <LoadingIcon className={styles.loading__icon} />
    </div>
  )
}

export default CustomerLoginPage
