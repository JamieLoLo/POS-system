import React from 'react'
import webSocket from 'socket.io-client'
// hook
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// UI
import { PosMainGridSystem } from '../POSLayout/GridSystem'
import { OrderTableItem } from '../POSComponents'
// slice
import { getTablesApi, getMinimumApi } from '../store/pos-slice'
import { categoryGetAllApi } from '../store/category-slice'
// icon
import { ReactComponent as LoadingIcon } from '../POSComponents/assets/icon/loading_ball.svg'
// SCSS
import styles from './OrderTablePage.module.scss'

// 這邊之後改用條件式判斷，有桌號的進到/order/system，沒有桌號的進入/order/customer
const OrderTablePage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // useState
  const [ws, setWs] = useState(null)
  const [message, setMessage] = useState('')
  // useSelector
  const isTableUpdate = useSelector((state) => state.pos.isTableUpdate)
  const allTablesData = useSelector((state) => state.pos.allTablesData)
  const minCharge = useSelector((state) => state.pos.minimum).minCharge

  // 進入頁面後，連接 socket.io，並且取得低消金額。
  // socket.io 的部分，用來即時轉換桌子顏色（當顧客送出訂單時）。
  useEffect(() => {
    setWs(webSocket('https://pacific-woodland-57366.herokuapp.com/'))
    dispatch(getMinimumApi())
    localStorage.setItem('min_charge', minCharge)
  }, [])

  useEffect(() => {
    if (ws) {
      initWebSocket()
    }
  }, [ws])

  const initWebSocket = () => {
    ws.on('ordered', (message) => {
      setMessage(message)
    })
  }

  // 確認登入狀態
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/admin/login')
    }
  }, [navigate])

  // 取得所有桌子
  useEffect(() => {
    dispatch(getTablesApi())
  }, [dispatch, isTableUpdate, message.orderId, message.tableId])

  // 取得所有分類
  useEffect(() => {
    dispatch(categoryGetAllApi({ page: 'admin_table_page' }))
  }, [dispatch])

  // 所有桌子
  const tableList = allTablesData.map((data) => (
    <OrderTableItem data={data} key={data.id} />
  ))
  return (
    <div className='main__container'>
      <PosMainGridSystem pathname={pathname}>
        {allTablesData.length ? (
          <div className={styles.right__side__container}>
            <div className={styles.table__container}>{tableList}</div>
          </div>
        ) : (
          <LoadingIcon />
        )}
      </PosMainGridSystem>
    </div>
  )
}

export default OrderTablePage
