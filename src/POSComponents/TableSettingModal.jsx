import React from 'react'
// icon
import { ReactComponent as DeleteIcon } from './assets/icon/delete.svg'
// hook
import { useSelector, useDispatch } from 'react-redux'
// store
import { modalActions } from '../store/modal-slice'
// SCSS
import styles from './TableSettingModal.module.scss'

const TableSettingModal = () => {
  const dispatch = useDispatch()
  // useSelector
  const isSettingTableModalOpen = useSelector(
    (state) => state.modal.isSettingTableModalOpen
  )
  return isSettingTableModalOpen ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() => {
          dispatch(modalActions.setIsSettingTableModalOpen(false))
        }}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.delete__button__container}>
          <DeleteIcon
            className={styles.delete__button}
            onClick={() => {
              dispatch(modalActions.setIsSettingTableModalOpen(false))
            }}
          />
        </div>
        <div className={styles.list__container}>
          <div className={styles.input__container}>
            <label htmlFor='chinese__name'>桌號</label>
            <input type='text' id='chinese__name' />
          </div>
        </div>
        <div className={styles.button__container}>
          <button className={styles.table__delete__button}>刪除</button>
          <button className={styles.table__confirm__button}>確認</button>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default TableSettingModal
