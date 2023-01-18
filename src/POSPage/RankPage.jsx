import React from 'react'
import moment from 'moment'
// hook
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
// UI
import { PosMainGridSystem } from '../POSLayout/GridSystem'
import { FormSwitchButton, RankItem } from '../POSComponents/index'
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

  console.log(0, startDate)
  console.log(1, endDate)
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
            <button className={styles.search}>查詢</button>
          </div>
          <div className={styles.list__container}>
            <div className={styles.title__container}>
              <div className={styles.title}>品項</div>
              <div className={styles.title}>數量</div>
              <div className={styles.title}>小計</div>
            </div>
            <div className={styles.rank__list}>
              <RankItem dish='紅燒牛腩筋飯' counts='10' total='$3200' />
              <RankItem dish='無錫排骨飯' counts='5' total='$1200' />
              <RankItem dish='蜜椒小豬球' counts='5' total='$3400' />
              <RankItem dish='紅燒牛腩筋飯' counts='10' total='$3200' />
              <RankItem dish='無錫排骨飯' counts='5' total='$1200' />
              <RankItem dish='蜜椒小豬球' counts='5' total='$3400' />{' '}
              <RankItem dish='紅燒牛腩筋飯' counts='10' total='$3200' />
              <RankItem dish='無錫排骨飯' counts='5' total='$1200' />
              <RankItem dish='蜜椒小豬球' counts='5' total='$3400' />{' '}
              <RankItem dish='紅燒牛腩筋飯' counts='10' total='$3200' />
              <RankItem dish='無錫排骨飯' counts='5' total='$1200' />
              <RankItem dish='蜜椒小豬球' counts='5' total='$3400' />{' '}
              <RankItem dish='紅燒牛腩筋飯' counts='10' total='$3200' />
              <RankItem dish='無錫排骨飯' counts='5' total='$1200' />
              <RankItem dish='蜜椒小豬球' counts='5' total='$3400' />{' '}
              <RankItem dish='紅燒牛腩筋飯' counts='10' total='$3200' />
              <RankItem dish='無錫排骨飯' counts='5' total='$1200' />
              <RankItem dish='蜜椒小豬球' counts='5' total='$3400' />
            </div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default RankPage
