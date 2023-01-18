import React from 'react'
import moment from 'moment'
import Swal from 'sweetalert2'
// hook
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
// UI
import { PosMainGridSystem } from '../POSLayout/GridSystem'
import { FormSwitchButton, RevenueItem } from '../POSComponents/index'
// calendar package
import DatePicker from 'react-datepicker'
// api
import { getRevenuesApi } from '../api/posApi'
// CSS
import 'react-datepicker/dist/react-datepicker.css'
import styles from './MonthlyRevenuePage.module.scss'

const MonthlyRevenuePage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  // useState
  const [startDate, setStartDate] = useState(
    moment(new Date()).format('yyyy-MM-DD')
  )
  const [endDate, setEndDate] = useState(
    moment(new Date()).format('yyyy-MM-DD')
  )
  const [revenueData, setRevenueData] = useState([])
  // 給套件用的資訊
  const startDateSelected = moment(startDate).toDate()
  const endDateSelected = moment(endDate).toDate()

  // 確認登入狀態
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/admin/login')
    }
  }, [navigate])

  // 查詢
  const searchHandler = async () => {
    const res = await getRevenuesApi('2022-01-01', '2024-01-18')
    console.log(res.data)
    // if (res.data.length === 0) {
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     title: '查無此區間資訊',
    //     showConfirmButton: false,
    //     timer: 2000,
    //   })
    //   return
    // } else {
    //   setRevenueData(res.data)
    // }
  }
  // console.log(revenueData)
  // console.log(0, startDate)
  // console.log(1, endDate)

  return (
    <div className='main__container'>
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <button className={styles.export__button}>匯出 Excel</button>
          <FormSwitchButton page='revenue' />
          <div className={styles.input__container}>
            <DatePicker
              className={styles.inner__container}
              wrapperClassName={styles.datePicker}
              selected={startDateSelected}
              onChange={(date) =>
                setStartDate(moment(date).format('yyyy-MM-DD'))
              }
              dateFormat='yyyy/MM/dd'
            />
            至
            <DatePicker
              className={styles.inner__container}
              wrapperClassName={styles.datePicker}
              selected={endDateSelected}
              onChange={(date) => setEndDate(moment(date).format('yyyy-MM-DD'))}
              dateFormat='yyyy/MM/dd'
            />
            <button className={styles.search} onClick={searchHandler}>
              查詢
            </button>
          </div>
          <div className={styles.list__container}>
            <div className={styles.title__container}>
              <div className={styles.title}>日期</div>
              <div className={styles.title}>營業額</div>
              <div className={styles.title}>來客數</div>
              <div className={styles.title}>客單價</div>
            </div>
            <div className={styles.classification__list}>
              <RevenueItem date='12/01' revenue='$12,000' tc='50' aov='$251' />
              <RevenueItem date='12/01' revenue='$12,000' tc='50' aov='$251' />
              <RevenueItem date='12/01' revenue='$12,000' tc='50' aov='$251' />
              <RevenueItem
                date='12/01'
                revenue='$12,000'
                tc='50'
                aov='$251'
              />{' '}
              <RevenueItem date='12/01' revenue='$12,000' tc='50' aov='$251' />
              <RevenueItem date='12/01' revenue='$12,000' tc='50' aov='$251' />
              <RevenueItem date='12/01' revenue='$12,000' tc='50' aov='$251' />
              <RevenueItem
                date='12/01'
                revenue='$12,000'
                tc='50'
                aov='$251'
              />{' '}
              <RevenueItem date='12/01' revenue='$12,000' tc='50' aov='$251' />
              <RevenueItem date='12/01' revenue='$12,000' tc='50' aov='$251' />
              <RevenueItem date='12/01' revenue='$12,000' tc='50' aov='$251' />
              <RevenueItem
                date='12/01'
                revenue='$12,000'
                tc='50'
                aov='$251'
              />{' '}
              <RevenueItem date='12/01' revenue='$12,000' tc='50' aov='$251' />
              <RevenueItem date='12/01' revenue='$12,000' tc='50' aov='$251' />
              <RevenueItem date='12/01' revenue='$12,000' tc='50' aov='$251' />
              <RevenueItem date='12/01' revenue='$12,000' tc='50' aov='$251' />
            </div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default MonthlyRevenuePage
