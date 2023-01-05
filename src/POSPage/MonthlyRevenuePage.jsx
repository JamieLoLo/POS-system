import React from 'react'
import Select from 'react-select'
// hook
import { useLocation } from 'react-router-dom'
// UI
import { PosMainGridSystem } from '../POSLayout/GridSystem'
import { FormSwitchButton, RevenueItem } from '../POSComponents/index'
// SCSS
import styles from './MonthlyRevenuePage.module.scss'

const MonthlyRevenuePage = () => {
  const pathname = useLocation().pathname
  const options = [
    { value: '2022/12', label: '2022/12' },
    { value: '2023/1', label: '2023/1' },
    { value: '2023/2', label: '2023/2' },
  ]
  return (
    <div>
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <button className={styles.export__button}>匯出 Excel</button>
          <FormSwitchButton page='revenue' />
          <div className={styles.input__container}>
            <Select className={styles.select} options={options} />
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
              <RevenueItem date='12/01' revenue='$12,000' tc='50' aov='$251' />
            </div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default MonthlyRevenuePage
