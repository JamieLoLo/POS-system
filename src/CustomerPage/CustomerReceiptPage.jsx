import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useNavigate } from 'react-router-dom'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle.png'
// api
import { getOrderApi } from '../api/orderApi'
// SCSS
import styles from './CustomerReceiptPage.module.scss'

export const CustomerReceiptPage = () => {
  const navigate = useNavigate()
  // localStorage
  const orderId = localStorage.getItem('order_id')
  const adultCount = localStorage.getItem('adult_count')
  const childrenCount = localStorage.getItem('children_count')
  const totalPrice = localStorage.getItem('total_price')
  const tableName = localStorage.getItem('table_name')

  // 確認是否已結帳，未結帳可繼續點餐。
  const continueOrderHandler = async () => {
    try {
      // 再次確認後台是否已結帳
      const res = await getOrderApi(tableName)
      console.log(res)
      if (res) {
        navigate('/customer/main')
      } else if (!res) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '您已結帳',
          text: '加點請洽櫃檯',
          showConfirmButton: false,
          timer: 2000,
        })
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.page__container}>
      <div className={styles.logo__container}>
        <img className={styles.logo} src={LogoIcon} alt='' />
      </div>

      <div className={styles.title__container}>
        <div className={styles.title}>點餐成功</div>
        <br />
        <div className={styles.subtitle__container}>
          <div className={styles.subtitle__one}>請先至櫃檯結帳</div>
          <div className={styles.subtitle__two}>結帳後立即為您製作餐點</div>
        </div>
      </div>
      <div className={styles.detail}>
        <div className={styles.item__container}>
          <div className={styles.detail__title}>單號：</div>
          <div className={styles.detail__number}>{orderId}</div>
        </div>
        <div className={styles.item__container}>
          <div className={styles.detail__title}>桌號：</div>
          <div className={styles.detail__number}>{tableName}</div>
        </div>
        <div className={styles.item__container}>
          <div className={styles.detail__title}>人數：</div>
          <div className={styles.detail__number}>
            {adultCount}大{childrenCount}小
          </div>
        </div>
        <div className={styles.item__container}>
          <div className={styles.detail__title}>金額：</div>
          <div className={styles.detail__number}>$ {totalPrice}</div>
        </div>
      </div>
      <div className={styles.button__container}>
        <button
          className={styles.continue__button}
          onClick={continueOrderHandler}
        >
          繼續點餐
        </button>
      </div>
    </div>
  )
}
