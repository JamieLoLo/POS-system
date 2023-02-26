import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// slice

import { posActions } from '../store/pos-slice'
import { closeDailyRevenueApi } from '../store/pos-slice'

// SCSS
import styles from './AccountClosingModal.module.scss'

const AccountClosingModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // for default input
  let date = new Date()
  const formatDate = (date) => {
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let formatted_date = date.getFullYear() + '-' + month + '-' + date.getDate()
    return formatted_date
  }
  // useState
  const [postingDate, setPostingDate] = useState(formatDate(date))
  const [revenue, setRevenue] = useState()

  // useSelector
  const isAccountClosingModalOpen = useSelector(
    (state) => state.pos.isAccountClosingModalOpen
  )
  const unSettledRevenue = useSelector((state) => state.pos.unSettledRevenue)
  const accountClosingCalculate = useSelector(
    (state) => state.pos.accountClosingCalculate
  )

  // 確認入帳
  const submitHandler = async () => {
    if (!revenue) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '請輸入入帳金額',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    }
    try {
      await dispatch(closeDailyRevenueApi({ postingDate, revenue }))
      navigate('/forms/revenue')
    } catch (error) {
      console.error(error)
    }
  }

  return isAccountClosingModalOpen ? (
    <div className={styles.modal}>
      <div className={styles.backdrop}></div>
      <div className={styles.modal__container}>
        <div className={styles.list__container}>
          <div className={styles.input__container}>
            <p>系統金額</p>
            <p>$ {unSettledRevenue.UnsettledRevenue}</p>
          </div>
          <div className={styles.input__container}>
            <p>實收金額</p>
            <p>$ {accountClosingCalculate}</p>
          </div>
          <div className={styles.input__container}>
            <p>差額</p>
            <p>$0</p>
          </div>
          <div className={styles.input__container}>
            <p>入帳日期</p>
            <input
              className={styles.input}
              type='text'
              placeholder='請輸入日期'
              defaultValue={postingDate}
              onChange={(e) => setPostingDate(e.target.value)}
            />
          </div>
          <div className={styles.input__container}>
            <p>入帳金額</p>
            <input
              className={styles.input}
              type='text'
              placeholder='請輸入金額'
              onChange={(e) => setRevenue(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.button__container}>
          <button
            className={styles.return__button}
            onClick={() => {
              dispatch(posActions.setIsAccountClosingModalOpen(false))
            }}
          >
            返回重算
          </button>
          <button className={styles.confirm__button} onClick={submitHandler}>
            確認入帳
          </button>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default AccountClosingModal
