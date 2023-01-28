import React, { useState } from 'react'
import moment from 'moment'
// hook
import { useLocation, useNavigate } from 'react-router-dom'
// UI
import { PosMainGridSystem } from '../POSLayout/GridSystem'
import {
  FormSwitchButton,
  ReceiptDetailsItem,
  AdminDetailsModal,
} from '../POSComponents'
// calendar package
import DatePicker from 'react-datepicker'
// CSS
import 'react-datepicker/dist/react-datepicker.css'
import styles from './SingleDayRevenue.module.scss'

const SingleDayRevenue = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  // useState
  const [startDate, setStartDate] = useState(
    moment(new Date()).format('yyyy-MM-DD')
  )
  // 給套件用的資訊
  const startDateSelected = moment(startDate).toDate()

  return (
    <div className='main__container'>
      <AdminDetailsModal />
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <FormSwitchButton page='details' />
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
            <button className={styles.search}>查詢</button>
          </div>
          <div className={styles.list__container}>
            <div className={styles.title__container}>
              <div className={styles.title}>時間</div>
              <div className={styles.title}>金額</div>
              <div className={styles.title}>人數</div>
            </div>
            <div className={styles.classification__list}>
              <ReceiptDetailsItem time='11:11' total='800' headcount='3' />
              <ReceiptDetailsItem time='11:18' total='280' headcount='1' />
              <ReceiptDetailsItem time='11:34' total='520' headcount='2' />
              <ReceiptDetailsItem time='12:01' total='760' headcount='3' />
              <ReceiptDetailsItem time='12:05' total='800' headcount='3' />
              <ReceiptDetailsItem time='12:30' total='560' headcount='2' />
              <ReceiptDetailsItem time='12:32' total='320' headcount='1' />
              <ReceiptDetailsItem time='12:36' total='620' headcount='2' />
            </div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default SingleDayRevenue
