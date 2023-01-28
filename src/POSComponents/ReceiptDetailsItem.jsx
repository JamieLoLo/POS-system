import React from 'react'
// hook
import { useDispatch } from 'react-redux'
// store
import { modalActions } from '../store/modal-slice'
// SCSS
import styles from './ReceiptDetailsItem.module.scss'

const ReceiptDetailsItem = ({ time, total, headcount }) => {
  const dispatch = useDispatch()
  return (
    <div className={styles.list__container}>
      <div className={styles.list__item}>{time}</div>
      <div className={styles.list__item}>$ {total}</div>
      <div className={styles.list__item}>{headcount}</div>
      <div className={styles.list__item}>
        <button
          className={styles.detail__button}
          onClick={() =>
            dispatch(modalActions.setIsAdminDetailsModalOpen(true))
          }
        >
          詳細內容
        </button>
      </div>
    </div>
  )
}

export default ReceiptDetailsItem
