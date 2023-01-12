import React from 'react'
// hook
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
// UI
import {
  SettingSwitchButton,
  TableItem,
  TableSettingModal,
} from '../POSComponents/index'
import { PosMainGridSystem } from '../POSLayout/GridSystem'
// store
import { modalActions } from '../store/modal-slice'
import { updateActions } from '../store/update-slice'
// api
import { getTablesApi } from '../api/posApi'
// SCSS
import styles from './TableSettingPage.module.scss'

const TableSettingPage = () => {
  const pathname = useLocation().pathname
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // useState
  const [allTablesData, setAllTablesData] = useState([])
  // useSelector
  const isTableSettingModalOpen = useSelector(
    (state) => state.modal.isTableSettingModalOpen
  )

  const isTableUpdate = useSelector((state) => state.update.isTableUpdate)

  // 確認登入狀態
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/admin/login')
    }
  }, [navigate])

  // 登出
  const logoutHandler = () => {
    localStorage.clear()
    navigate('/admin/login')
  }

  // 取得所有桌子
  useEffect(() => {
    const getTables = async () => {
      try {
        const res = await getTablesApi()
        setAllTablesData(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    getTables()
  }, [isTableUpdate])

  // 所有桌子
  const tableList = allTablesData.map((data) => (
    <TableItem data={data} key={data.id} />
  ))
  return (
    <div className='main__container'>
      <TableSettingModal trigger={isTableSettingModalOpen} />
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <button className={styles.logout__button} onClick={logoutHandler}>
            登出
          </button>
          <SettingSwitchButton page='table' />
          <div className={styles.right__bottom__container}>
            <div className={styles.table__container}>{tableList}</div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default TableSettingPage
