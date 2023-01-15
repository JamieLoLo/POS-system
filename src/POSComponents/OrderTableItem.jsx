import React from 'react'
import clsx from 'clsx'
// hook
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// store
import { informationActions } from '../store/information-slice'
// SCSS
import styles from './OrderTableItem.module.scss'

const OrderTableItem = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 點擊桌子後將桌子資訊存入store，判斷目前狀態，導入對應頁面。
  const orderHandler = () => {
    if (data.name === '0') {
      return
    }
    dispatch(informationActions.setTableInfo(data))
    localStorage.setItem('table_id', data.id)
    if (data.Orders.id === null && data.Orders.isPaid === 0) {
      navigate('/order/headcount')
    } else if (data.Orders.id !== null && data.Orders.isPaid === 0) {
      navigate('/order/system')
    }
  }
  return (
    <div
      className={clsx('', {
        [styles.table]: data.name !== '0' && data.Orders.id === null,
        [styles.table__d__none]: data.name === '0',
        [styles.table__not__order]:
          data.name !== '0' && data.Orders.id !== null,
        [styles.table__not__paid]:
          data.name !== '0' &&
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
