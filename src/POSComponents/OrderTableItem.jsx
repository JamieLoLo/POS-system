import React from 'react'
import clsx from 'clsx'
import Swal from 'sweetalert2'
// hook
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// slice
import { finishOrderApi, posActions } from '../store/pos-slice'
import { getOrderApi } from '../store/order-slice'
// SCSS
import styles from './OrderTableItem.module.scss'

const OrderTableItem = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const table_id = data.name
  // 點擊桌子後將桌子資訊存入store，判斷目前狀態，導入對應頁面。
  const orderHandler = async () => {
    // 排除沒有的桌子
    if (data.isValid === 0) {
      return
    }
    dispatch(posActions.setTableInfo(data))
    localStorage.setItem('table_id', data.id)
    if (data.Orders.id === null && data.Orders.isPaid === null) {
      navigate('/order/headcount')
    } else if (data.Orders.id !== null && data.Orders.isPaid === 0) {
      dispatch(getOrderApi({ table_id, page: 'pos_go_order' }))
    }
    // 客人離場
    if (data.Orders.isPaid === 1) {
      try {
        let result = await Swal.fire({
          title: '客人離場了嗎？',
          text: '確定後將無法恢復！',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '確定',
        })
        if (result.isConfirmed) {
          dispatch(finishOrderApi(data.Orders.id))
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div
      className={clsx('', {
        [styles.table]: data.isValid !== 0 && data.Orders.id === null,
        [styles.table__d__none]: data.isValid === 0,
        [styles.table__not__order]:
          data.isValid !== 0 &&
          data.Orders.id !== null &&
          data.Orders.isPaid === 0 &&
          data.Orders.totalPrice === 0,
        [styles.table__not__paid]:
          data.isValid !== 0 &&
          data.Orders.isPaid === 0 &&
          data.Orders.totalPrice !== 0,
        [styles.table__paid]: data.Orders.isPaid === 1,
      })}
      onClick={orderHandler}
    >
      {data.name}
    </div>
  )
}

export default OrderTableItem
