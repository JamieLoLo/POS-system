import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle.png'
// api
import { getOrderApi } from '../api/orderApi'
// store
import { informationActions } from '../store/information-slice'
// SCSS
import styles from './CustomerLoginPage.module.scss'

const CustomerLoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // useState
  const [tableId, setTableID] = useState()
  // 初始化購物車
  let cartList = []
  localStorage.setItem('cart_list', JSON.stringify(cartList))
  localStorage.setItem('total_count', 0)
  localStorage.setItem('total_price', 0)

  // 取得訂單內容 (餐點、人數)
  const getOrderHandler = async () => {
    try {
      const res = await getOrderApi(tableId)
      if (!res) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '未開桌，請洽櫃檯。',
          showConfirmButton: false,
          timer: 2000,
        })
      }
      localStorage.setItem('customer_table_id', tableId)
      localStorage.setItem('order_id', res.data.id)
      await dispatch(informationActions.setOrderInfo(res.data))
      navigate('/customer/main')
    } catch (error) {
      console.error(error)
    }
  }

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
            onChange={(e) => setTableID(e.target.value)}
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
