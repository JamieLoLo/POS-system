import React from 'react'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component'
import Swal from 'sweetalert2'
// hook
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
// UI
import { PosMainGridSystem } from '../POSLayout/GridSystem'
import {
  FormSwitchButton,
  ReceiptDetailsItem,
  AdminDetailsModal,
  LoadingModal,
} from '../POSComponents'
// api
import { getAllOrdersApi } from '../api/posApi'
// calendar package
import DatePicker from 'react-datepicker'
// CSS
import 'react-datepicker/dist/react-datepicker.css'
import styles from './SingleDayRevenue.module.scss'

const SingleDayRevenue = () => {
  const pathname = useLocation().pathname
  // useState
  const [date, setDate] = useState(moment(new Date()).format('yyyy-MM-DD'))
  const [ordersData, setOrdersData] = useState([])
  const [page, setPage] = useState(1) // lazy loading 相關
  const [hasMore, setHasMore] = useState(true) // lazy loading 相關

  // 給套件用的資訊
  const startDateSelected = moment(date).toDate()

  // 依照日期查詢
  const searchHandler = async () => {
    setHasMore(true)
    try {
      const res = await getAllOrdersApi(date, 1)
      if (res.data.length === 0) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '查無此日期的訂單',
          showConfirmButton: false,
          timer: 2000,
        })
      }
      if (res) {
        setOrdersData(res.data)
        setPage(2)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // lazy loading 換頁
  const changePage = async () => {
    try {
      const res = await getAllOrdersApi(date, page)
      if (res) {
        setHasMore(res.data.length)
        setPage((page) => page + 1)
        setOrdersData(ordersData.concat(res.data))
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 訂單列表
  const orderList = ordersData.map((data) => (
    <ReceiptDetailsItem data={data} key={data.id} />
  ))

  return (
    <div className='main__container'>
      <AdminDetailsModal />
      <LoadingModal title='資料讀取中...' />
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <FormSwitchButton page='details' />
          <div className={styles.input__container}>
            <DatePicker
              className={styles.inner__container}
              wrapperClassName={styles.datePicker}
              selected={startDateSelected}
              onChange={(date) => setDate(moment(date).format('yyyy-MM-DD'))}
              dateFormat='yyyy/MM/dd'
            />
            <button className={styles.search} onClick={searchHandler}>
              查詢
            </button>
          </div>
          <div className={styles.list__container}>
            {ordersData.length !== 0 ? (
              <div className={styles.title__container}>
                <div className={styles.title}>時間</div>
                <div className={styles.title}>金額</div>
                <div className={styles.title}>人數</div>
              </div>
            ) : (
              ''
            )}

            <div className={styles.classification__list} id='order__list'>
              {ordersData.length !== 0 && (
                <InfiniteScroll
                  dataLength={ordersData.length}
                  next={changePage}
                  hasMore={hasMore !== 0}
                  endMessage={null}
                  scrollableTarget='order__list'
                  height={500}
                >
                  {orderList}
                </InfiniteScroll>
              )}
            </div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default SingleDayRevenue
