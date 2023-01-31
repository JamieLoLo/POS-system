import React from 'react'
import webSocket from 'socket.io-client'
// hook
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// UI
import { PosMainGridSystem } from '../POSLayout/GridSystem'
import { OrderTableItem } from '../POSComponents'
// api
import { getTablesApi } from '../api/posApi'
import { categoryGetAllApi } from '../api/categoryApi'
// icon
import { ReactComponent as LoadingIcon } from '../POSComponents/assets/icon/loading_ball.svg'
// SCSS
import styles from './OrderTablePage.module.scss'

// 這邊之後改用條件式判斷，有桌號的進到/order/system，沒有桌號的進入/order/customer
const OrderTablePage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  // useState
  const [allTablesData, setAllTablesData] = useState([])
  const [ws, setWs] = useState(null)
  const [message, setMessage] = useState('')
  // useSelector
  const isTableUpdate = useSelector((state) => state.update.isTableUpdate)

  const connectWebSocket = () => {
    setWs(webSocket('https://pacific-woodland-57366.herokuapp.com/'))
  }

  useEffect(() => {
    connectWebSocket()
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
    const getTables = async () => {
      try {
        const res = await getTablesApi()
        setAllTablesData(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    getTables()
  }, [isTableUpdate, message.orderId, message.tableId])

  // 取得所有分類
  useEffect(() => {
    const categoryGetAll = async () => {
      try {
        const res = await categoryGetAllApi()
        localStorage.setItem('default_category_id', res.data[0].id)
        localStorage.setItem('default_category_name', res.data[0].name)
      } catch (error) {
        console.error(error)
      }
    }
    categoryGetAll()
  }, [])

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
