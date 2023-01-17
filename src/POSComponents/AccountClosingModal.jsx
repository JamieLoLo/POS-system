import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// store
import { modalActions } from '../store/modal-slice'
// api
import { closeDailyRevenueApi } from '../api/posApi'
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
  const [confirmDate, setConfirmDate] = useState(formatDate(date))
  const [actualRevenue, setActualRevenue] = useState()
  // useSelector
  const isAccountClosingModalOpen = useSelector(
    (state) => state.modal.isAccountClosingModalOpen
  )
  const unSettledRevenue = useSelector(
    (state) => state.information.unSettledRevenue
  )
  const accountClosingCalculate = useSelector(
    (state) => state.information.accountClosingCalculate
  )

  // 確認入帳
  const submitHandler = async () => {
    const res = await closeDailyRevenueApi(confirmDate, actualRevenue)
    if (res) {
      console.log(res.data)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '已成功關帳',
        showConfirmButton: false,
        timer: 2000,
      })
      navigate('/forms/revenue')
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '關帳失敗',
        text: '請重新操作',
        showConfirmButton: false,
        timer: 2000,
      })
      return
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
              defaultValue={confirmDate}
              onChange={(e) => setConfirmDate(e.target.value)}
            />
          </div>
          <div className={styles.input__container}>
            <p>入帳金額</p>
            <input
              className={styles.input}
              type='text'
              placeholder='請輸入金額'
              onChange={(e) => setActualRevenue(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.button__container}>
          <button
            className={styles.return__button}
            onClick={() => {
              dispatch(modalActions.setIsAccountClosingModalOpen(false))
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
