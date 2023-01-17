import React from 'react'
import clsx from 'clsx'
import Swal from 'sweetalert2'
// hook
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
// store
import { informationActions } from '../store/information-slice'
import { updateActions } from '../store/update-slice'
// api
import { getOrderApi } from '../api/orderApi'
import { getMinimumApi, finishOrderApi } from '../api/posApi'
// SCSS
import styles from './OrderTableItem.module.scss'

const OrderTableItem = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 取得低消金額
  useEffect(() => {
    const getDescription = async () => {
      try {
        const res = await getMinimumApi()
        localStorage.setItem('min_charge', res.data.minCharge)
      } catch (error) {
        console.error(error)
      }
    }
    getDescription()
  }, [])

  // 點擊桌子後將桌子資訊存入store，判斷目前狀態，導入對應頁面。
  const orderHandler = async () => {
    // 排除沒有的桌子
    if (data.name === '0') {
      return
    }
    dispatch(informationActions.setTableInfo(data))
    localStorage.setItem('table_id', data.id)
    if (data.Orders.id === null && data.Orders.isPaid === null) {
      navigate('/order/headcount')
    } else if (data.Orders.id !== null && data.Orders.isPaid === 0) {
      try {
        const res = await getOrderApi(data.id)
        // 這邊取出已點餐點的資訊，取出的部分為更新訂單時需要的資料格式。
        const cartList = res.data.soldProducts.map((product) => ({
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
        localStorage.setItem('order_info', JSON.stringify(res.data))
        localStorage.setItem('cart_list', JSON.stringify(cartList))
        localStorage.setItem('render_cart_list', JSON.stringify(renderCartList))
        navigate('/order/system')
      } catch (error) {
        console.error(error)
      }
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
          const res = await finishOrderApi(data.Orders.id)
          if (res.status !== 200) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '發生錯誤，請重新操作。',
              showConfirmButton: false,
              timer: 2000,
            })
            return
          }
          dispatch(updateActions.setIsTableUpdate())
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '設定成功',
            showConfirmButton: false,
            timer: 2000,
          })
          console.log(res)
        }
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
