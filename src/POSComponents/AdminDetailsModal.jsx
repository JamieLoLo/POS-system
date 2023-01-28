import React from 'react'
// hook
import { useSelector, useDispatch } from 'react-redux'
// icon
import { ReactComponent as DeleteIcon } from './assets/icon/delete.svg'
// UI
import { AdminDetailsItem } from './index'
// store
import { modalActions } from '../store/modal-slice'
// SCSS
import styles from './AdminDetailsModal.module.scss'

const AdminDetailsModal = () => {
  const dispatch = useDispatch()
  // useSelector
  const isAdminDetailsModalOpen = useSelector(
    (state) => state.modal.isAdminDetailsModalOpen
  )
  return isAdminDetailsModalOpen ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() => dispatch(modalActions.setIsAdminDetailsModalOpen(false))}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.delete__button__container}>
          <DeleteIcon
            className={styles.delete__button}
            onClick={() =>
              dispatch(modalActions.setIsAdminDetailsModalOpen(false))
            }
          />
        </div>
        <div className={styles.title}>交易明細</div>
        <div className={styles.information__container}>
          <p className={styles.information}>日期：2023/01/26</p>
          <p className={styles.information}>時間：11:34</p>
          <p className={styles.information}>人數：2大0小</p>
        </div>
        <div className={styles.subtitle__container}>
          <p className={styles.name}>品名 (數量)</p>
          <p className={styles.price}>小計</p>
        </div>
        <div className={styles.products__container}>
          <AdminDetailsItem name='奶油明太子義大利麵' count='1' price='270' />
          <AdminDetailsItem name='奶油野菇義大利麵' count='1' price='250' />
        </div>
        <div className={styles.total__container}>
          <div className={styles.total}>
            合計 <span className={styles.total__number}>$520</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default AdminDetailsModal