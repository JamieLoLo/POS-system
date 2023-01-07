import React from 'react'
// hook
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// UI
import { SettingSwitchButton, TableSettingModal } from '../POSComponents/index'
import { PosMainGridSystem } from '../POSLayout/GridSystem'
// store
import { modalActions } from '../store/modal-slice'
// SCSS
import styles from './TableSettingPage.module.scss'

const TableSettingPage = () => {
  const pathname = useLocation().pathname
  const dispatch = useDispatch()
  return (
    <div className='main__container'>
      <TableSettingModal />
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <button className={styles.logout__button}>登出</button>
          <SettingSwitchButton page='table' />
          <div className={styles.table__container}>
            <div
              className={styles.table__1}
              onClick={() => {
                dispatch(modalActions.setIsSettingTableModalOpen(true))
              }}
            ></div>
            <div className={styles.table__2}></div>
            <div className={styles.table__3}></div>
            <div className={styles.table__4}></div>
            <div className={styles.table__5}></div>
            <div className={styles.table__6}></div>
            <div className={styles.table__7}></div>
            <div className={styles.table__8}></div>
            <div className={styles.table__9}></div>
            <div className={styles.table__10}></div>
            <div className={styles.table__11}></div>
            <div className={styles.table__12}></div>
            <div className={styles.table__13}></div>
            <div className={styles.table__14}></div>
            <div className={styles.table__15}></div>
            <div className={styles.table__16}></div>
            <div className={styles.table__17}></div>
            <div className={styles.table__18}></div>
            <div className={styles.table__19}></div>
            <div className={styles.table__20}></div>
            <div className={styles.table__21}></div>
            <div className={styles.table__22}></div>
            <div className={styles.table__23}></div>
            <div className={styles.table__24}></div>
            <div className={styles.table__25}></div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default TableSettingPage
