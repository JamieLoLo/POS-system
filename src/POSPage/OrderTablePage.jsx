import React from 'react'
// hook
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
// UI
import { PosMainGridSystem } from '../POSLayout/GridSystem'
// api
import { getTablesApi } from '../api/posApi'
// SCSS
import styles from './OrderTablePage.module.scss'

// 這邊之後改用條件式判斷，有桌號的進到/order/system，沒有桌號的進入/order/customer
const OrderTablePage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const orderHandler = () => {
    navigate('/order/system')
  }
  let tableList = []

  for (let i = 1; i <= 25; i++) {
    tableList.push(
      <div key={`${i}`} className={`table__${i}`}>
        1
      </div>
    )
  }
  useEffect(() => {
    const getTables = async () => {
      try {
        const res = await getTablesApi()
        console.log(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    getTables()
  }, [])

  return (
    <div className='main__container'>
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.right__side__container}>
          <div className={styles.table__container}>
            {/* <div className={styles.table_1} onClick={orderHandler}>
              A3
            </div>
            <div className={styles.table_2}></div>
            <div className={styles.table_3}></div>
            <div className={styles.table_4}></div>
            <div className={styles.table_5}></div>
            <div className={styles.table_6}></div>
            <div className={styles.table_7}></div>
            <div className={styles.table_8}></div>
            <div className={styles.table_9}></div>
            <div className={styles.table_10}></div>
            <div className={styles.table_11}></div>
            <div className={styles.table_12}></div>
            <div className={styles.table_13}></div>
            <div className={styles.table_14}></div>
            <div className={styles.table_15}></div>
            <div className={styles.table_16}></div>
            <div className={styles.table_17}></div>
            <div className={styles.table_18}></div>
            <div className={styles.table_19}></div>
            <div className={styles.table_20}></div>
            <div className={styles.table_21}></div>
            <div className={styles.table_22}></div>
            <div className={styles.table_23}></div>
            <div className={styles.table_24}></div>
            <div className={styles.table_25}></div> */}
            {tableList}
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default OrderTablePage
