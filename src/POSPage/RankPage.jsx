import React from 'react'
import Swal from 'sweetalert2'
import moment from 'moment'
// hook
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
// UI
import { PosMainGridSystem } from '../POSLayout/GridSystem'
import { FormSwitchButton, RankItem } from '../POSComponents/index'
// api
import { getRankApi } from '../api/posApi'
// calendar package
import DatePicker from 'react-datepicker'
// CSS
import 'react-datepicker/dist/react-datepicker.css'
import styles from './RankPage.module.scss'

const RankPage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  // useState
  const [startDate, setStartDate] = useState(
    moment(new Date()).format('yyyy-MM-DD')
  )
  const [endDate, setEndDate] = useState(
    moment(new Date()).format('yyyy-MM-DD')
  )
  const [rankData, setRankData] = useState([])
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

  // 搜尋
  const searchHandler = async () => {
    const res = await getRankApi(startDate, endDate)
    if (res.data.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '查無此區間資訊',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    } else {
      setRankData(res.data)
    }
  }

  // 排行清單
  const rankList = rankData.map((data) => (
    <RankItem data={data} key={data.product_id} />
  ))

  return (
    <div className='main__container'>
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <button className={styles.export__button}>匯出 Excel</button>
          <FormSwitchButton page='rank' />
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
              <div className={styles.title}>品項</div>
              <div className={styles.title}>數量</div>
            </div>
            <div className={styles.rank__list}>{rankList}</div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default RankPage
