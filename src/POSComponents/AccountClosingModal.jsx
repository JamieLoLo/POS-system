import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
// hook
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// store
import { modalActions } from '../store/modal-slice'
// api
import { closeDailyRevenueApi, getRevenuesApi } from '../api/posApi'
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
  const [revenueData, setRevenueData] = useState([])
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

  //取得營收報表，確認日期是否重複。
  useEffect(() => {
    const getRevenue = async () => {
      const res = await getRevenuesApi(confirmDate, confirmDate)
      setRevenueData(res.data)
    }
    getRevenue()
  }, [confirmDate])

  // 確認入帳
  const submitHandler = async () => {
    // if (revenueData.length !== 0) {
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     title: '此日期已入過帳',
    //     showConfirmButton: false,
    //     timer: 2000,
    //   })
    //   return
    // }
    if (!actualRevenue) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '請輸入入帳金額',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    }
    const res = await closeDailyRevenueApi(confirmDate, actualRevenue)
    if (!res) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '此日期已有帳目',
        showConfirmButton: false,
        timer: 2000,
      })
    }
    if (res) {
      console.log(res.data)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '已成功關帳',
        showConfirmButton: false,
        timer: 2000,
      })
      dispatch(modalActions.setIsAccountClosingModalOpen(false))
      navigate('/forms/revenue')
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
