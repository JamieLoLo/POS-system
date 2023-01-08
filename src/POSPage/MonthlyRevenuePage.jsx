import React from 'react'
// hook
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
// UI
import { PosMainGridSystem } from '../POSLayout/GridSystem'
import { FormSwitchButton, RevenueItem } from '../POSComponents/index'
// calendar package
import DatePicker from 'react-datepicker'
// CSS
import 'react-datepicker/dist/react-datepicker.css'
import styles from './MonthlyRevenuePage.module.scss'

const MonthlyRevenuePage = () => {
  const pathname = useLocation().pathname
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

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
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            至
            <DatePicker
              className={styles.inner__container}
              wrapperClassName={styles.datePicker}
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
            <button className={styles.search}>查詢</button>
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
