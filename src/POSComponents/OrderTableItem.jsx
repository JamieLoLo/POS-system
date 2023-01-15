import React from 'react'
import clsx from 'clsx'
// hook
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// store
import { informationActions } from '../store/information-slice'
// api
import { getOrderApi } from '../api/orderApi'
// SCSS
import styles from './OrderTableItem.module.scss'

const OrderTableItem = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 點擊桌子後將桌子資訊存入store，判斷目前狀態，導入對應頁面。
  const orderHandler = async () => {
    if (data.name === '0') {
      return
    }
    dispatch(informationActions.setTableInfo(data))
    localStorage.setItem('table_id', data.id)
    if (data.Orders.id === null && data.Orders.isPaid === 0) {
      navigate('/order/headcount')
    } else if (data.Orders.id !== null && data.Orders.isPaid === 0) {
      try {
        const res = await getOrderApi(data.id)
        // 這邊取出已點餐點的資訊，取出的部分為更新訂單時需要的資料格式。
        const cartList = res.data.soldProducts.map((product) => ({
          orderId: res.data.id,
          productId: product.productId,
          count: product.count,
          sellingPrice: product.Product.price,
        }))
        // 這個是用來即時渲染購物車清單用的，因為需要產品名稱，與上面api格式不符，額外多存一個。
        const renderCartList = res.data.soldProducts.map((product) => ({
          productId: product.productId,
          name: product.Product.name,
          count: product.count,
          sellingPrice: product.Product.price,
        }))
        localStorage.setItem('cart_list', JSON.stringify(cartList))
        localStorage.setItem('render_cart_list', JSON.stringify(renderCartList))
        localStorage.setItem('total_price', res.data.totalPrice)
        localStorage.setItem('table_name', res.data.Table.name)
        navigate('/order/system')
      } catch (error) {
        console.error(error)
      }
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
