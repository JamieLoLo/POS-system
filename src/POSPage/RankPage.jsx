import React from 'react'
import Swal from 'sweetalert2'
import moment from 'moment'
import ExcelJs from 'exceljs'
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

  // 給匯出 excel 的檔案格式
  const excelList = rankData.map((data) => [
    data.Product.name,
    Number(data.counts),
  ])

  // 匯出 excel
  const excelHandler = async () => {
    if (rankData.length === 0) {
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
    const sheet = workbook.addWorksheet('銷售排行')
    // 設置欄寬
    sheet.getColumn(1).width = 45
    sheet.getColumn(2).width = 20
    // 列表文字置中
    sheet.getColumn(1).alignment = {
      vertical: 'center',
      horizontal: 'center',
    }
    sheet.getColumn(2).alignment = { vertical: 'center', horizontal: 'center' }

    sheet.addTable({
      // 在工作表裡面指定位置、格式並用columns與rows屬性填寫內容
      name: '銷售排行', // 表格內看不到的，讓你之後想要針對這個table去做額外設定的時候，可以指定到這個table
      ref: 'A1', // 從A1開始
      columns: [{ name: '品項' }, { name: '數量' }],
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
      link.download = '銷售排行.xlsx'
      link.href = URL.createObjectURL(blobData)
      link.click()
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
          <button className={styles.export__button} onClick={excelHandler}>
            匯出 Excel
          </button>
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
            {rankData.length !== 0 ? (
              <>
                <div className={styles.title__container}>
                  <div className={styles.title}>品項</div>
                  <div className={styles.title}>數量</div>
                </div>
                <div className={styles.rank__list}>{rankList}</div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default RankPage
