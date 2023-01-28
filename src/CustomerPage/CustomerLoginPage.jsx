import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle.png'
// api
import { getOrderApi } from '../api/orderApi'
import { categoryGetAllApi } from '../api/categoryApi'
// store
import { informationActions } from '../store/information-slice'
// SCSS
import styles from './CustomerLoginPage.module.scss'

const CustomerLoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // useState
  const [tableName, setTableName] = useState()
  // 初始化購物車
  let cartList = []
  localStorage.setItem('cart_list', JSON.stringify(cartList))
  localStorage.setItem('total_count', 0)
  localStorage.setItem('total_price', 0)
  // 初始化訂單
  let checkoutList = []
  localStorage.setItem('checkout_list', JSON.stringify(checkoutList))
  localStorage.setItem('checkout_count', 0)
  localStorage.setItem('checkout_price', 0)
  // 取得訂單內容 (餐點、人數)
  const getOrderHandler = async () => {
    try {
      const res = await getOrderApi(tableName)
      if (!res) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '未開桌，請洽櫃檯。',
          showConfirmButton: false,
          timer: 2000,
        })
      }
      localStorage.setItem('order_id', res.data.id)
      localStorage.setItem('table_id', res.data.tableId)
      localStorage.setItem('table_name', res.data.Table.name)
      localStorage.setItem('adult_count', res.data.adultNum)
      localStorage.setItem('children_count', res.data.childrenNum)
      await dispatch(informationActions.setOrderInfo(res.data))
      navigate('/customer/main')
    } catch (error) {
      console.error(error)
    }
  }

  // 取得所有分類
  useEffect(() => {
    const categoryGetAll = async () => {
      try {
        const res = await categoryGetAllApi()
        localStorage.setItem('default_category_id', res.data[0].id)
        localStorage.setItem('default_category_name', res.data[0].name)
      } catch (error) {
        console.error(error)
      }
    }
    categoryGetAll()
  }, [])

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
            onChange={(e) => setTableName(e.target.value)}
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
