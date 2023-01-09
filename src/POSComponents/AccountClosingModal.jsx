import React from 'react'
// hook
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// store
import { modalActions } from '../store/modal-slice'
// SCSS
import styles from './AccountClosingModal.module.scss'

const AccountClosingModal = () => {
  // for default input
  let date = new Date()
  const formatDate = (date) => {
    let formatted_date =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    return formatted_date
  }
  const [confirmDate, setConfirmDate] = useState(formatDate(date))
  const dispatch = useDispatch()
  const isAccountClosingModalOpen = useSelector(
    (state) => state.modal.isAccountClosingModalOpen
  )
  return isAccountClosingModalOpen ? (
    <div className={styles.modal}>
      <div className={styles.backdrop}></div>
      <div className={styles.modal__container}>
        <div className={styles.list__container}>
          <div className={styles.input__container}>
            <p>系統金額</p>
            <p>$1200</p>
          </div>
          <div className={styles.input__container}>
            <p>實收金額</p>
            <p>$1200</p>
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
            />
          </div>
          <div className={styles.input__container}>
            <p>入帳金額</p>
            <input
              className={styles.input}
              type='text'
              placeholder='請輸入金額'
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
          <button className={styles.confirm__button}>確認入帳</button>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default AccountClosingModal
