import React from 'react'
// hook
import { useDispatch } from 'react-redux'
// store
import { modalActions } from '../store/modal-slice'
// SCSS
import styles from './ReceiptDetailsItem.module.scss'

const ReceiptDetailsItem = () => {
  const dispatch = useDispatch()
  return (
    <div className={styles.list__container}>
      <div className={styles.list__item}>09:11</div>
      <div className={styles.list__item}>$ 2345</div>
      <div className={styles.list__item}>4</div>
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
