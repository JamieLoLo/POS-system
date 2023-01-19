import React from 'react'
import moment from 'moment'
import Swal from 'sweetalert2'
import ExcelJs from 'exceljs'
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
    const res = await getRevenuesApi(startDate, endDate)
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
      setRevenueData(res.data)
    }
  }

  // 給匯出 excel 的檔案格式
  const excelList = revenueData.map((data) => [
    data.postingDate,
    Number(data.revenue),
    Number(data.customerNum),
    Number(data.revenuePerCustomer),
  ])

  // 匯出 excel
  const excelHandler = async () => {
    if (revenueData.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '尚未選取日期',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    }
    const workbook = new ExcelJs.Workbook()
    const sheet = workbook.addWorksheet('營收報表')
    // 設置欄寬
    sheet.getColumn(1).width = 20
    sheet.getColumn(2).width = 20
    sheet.getColumn(3).width = 20
    sheet.getColumn(4).width = 15
    // 列表名稱置中
    sheet.getColumn(1).alignment = {
      vertical: 'center',
      horizontal: 'center',
    }
    sheet.getCell('B1').alignment = { vertical: 'center', horizontal: 'center' }
    sheet.getCell('C1').alignment = { vertical: 'center', horizontal: 'center' }
    sheet.getCell('D1').alignment = { vertical: 'center', horizontal: 'center' }

    sheet.addTable({
      // 在工作表裡面指定位置、格式並用columns與rows屬性填寫內容
      name: '營收報表', // 表格內看不到的，讓你之後想要針對這個table去做額外設定的時候，可以指定到這個table
      ref: 'A1', // 從A1開始
      columns: [
        { name: '日期' },
        { name: '營業額' },
        { name: '來客數' },
        { name: '客單價' },
      ],
      rows: excelList,
    })

    // 表格裡面的資料都填寫完成之後，訂出下載的callback function
    // 異步的等待他處理完之後，創建url與連結，觸發下載
    const res = await workbook.xlsx.writeBuffer()
    if (res) {
      const link = document.createElement('a')
      const blobData = new Blob([res], {
        type: 'application/vnd.ms-excel;charset=utf-8;',
      })
      link.download = '營收報表.xlsx'
      link.href = URL.createObjectURL(blobData)
      link.click()
    }
  }

  const revenueList = revenueData.map((data) => (
    <RevenueItem data={data} key={data.postingDate} />
  ))

  return (
    <div className='main__container'>
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <button className={styles.export__button} onClick={excelHandler}>
            匯出 Excel
          </button>
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
            <div className={styles.classification__list}>{revenueList}</div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default MonthlyRevenuePage
