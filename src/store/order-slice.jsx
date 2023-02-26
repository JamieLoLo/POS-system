import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

const orderURL = 'https://pacific-woodland-57366.herokuapp.com/api/order'

const axiosInstance = axios.create({ baseURL: orderURL })

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken')
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`
  }
  return config
})
const initialState = {
  isOrderConfirmModalOpen: false,
  isMinimumModalOpen: false,
  isCartUpdate: false,
  customerMenuInfo: [],
}

// 取得單一桌號未結帳訂單
export const getOrderApi = createAsyncThunk(
  'order/getOrderApi',
  async (payload) => {
    const { table_id } = payload
    try {
      const res = await axiosInstance.get(`${orderURL}/${table_id}`)
      return res
    } catch (error) {
      console.error('[Get Order Failed]: ', error)
    }
  }
)

// 顧客 & ＰOS 送出訂單
export const customerOrderApi = createAsyncThunk(
  'order/customerOrderApi',
  async (payload) => {
    const { order_id, data } = payload
    try {
      const res = await axios.put(`${orderURL}/${order_id}`, data)
      return res
    } catch (error) {
      console.error('[Order Failed]: ', error)
      return error
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  extraReducers: (builder) => {
    // 取得單一桌號未結帳訂單
    builder.addCase(getOrderApi.fulfilled, (state, action) => {
      // POS 進入點餐系統頁面的地方
      if (action.meta.arg.page === 'pos_go_order') {
        // 這邊取出已點餐點的資訊，取出的部分為更新訂單時需要的資料格式。
        const cartList = action.payload.data.soldProducts.map((product) => ({
          productId: product.productId,
          count: product.count,
          sellingPrice: product.Product.price,
        }))
        // 這個是用來即時渲染購物車清單用的，因為需要產品名稱，與上面api格式不符，額外多存一個。
        const renderCartList = action.payload.data.soldProducts.map(
          (product) => ({
            productId: product.productId,
            name: product.Product.name,
            count: product.count,
            sellingPrice: product.Product.price,
          })
        )
        localStorage.setItem('order_info', JSON.stringify(action.payload.data))
        localStorage.setItem('cart_list', JSON.stringify(cartList))
        localStorage.setItem('render_cart_list', JSON.stringify(renderCartList))
      }
      // 顧客登入頁面
      if (action.meta.arg.page === 'customer_login_page') {
        if (!action.payload) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '未開桌，請洽櫃檯。',
            showConfirmButton: false,
            timer: 2000,
          })
        }
        sessionStorage.setItem(
          'order_info',
          JSON.stringify(action.payload.data)
        )
        sessionStorage.setItem('order_id', action.payload.data.id)
        sessionStorage.setItem('table_id', action.payload.data.tableId)
        sessionStorage.setItem('table_name', action.payload.data.Table.name)
        sessionStorage.setItem('adult_count', action.payload.data.adultNum)
        sessionStorage.setItem(
          'children_count',
          action.payload.data.childrenNum
        )
      }
      // 顧客進入購物車前再度確認人數，避免臨時 pos 方更動人數的情況發生錯誤。
      if (action.meta.arg.page === 'customer_go_cart') {
        sessionStorage.setItem(
          'order_info',
          JSON.stringify(action.payload.data)
        )
        sessionStorage.setItem('adult_count', action.payload.data.adultNum)
        sessionStorage.setItem(
          'children_count',
          action.payload.data.childrenNum
        )
      }
      // 顧客提交訂單時，再度確認人數。
      if (action.meta.arg.page === 'customer_submit') {
        sessionStorage.setItem(
          'order_info',
          JSON.stringify(action.payload.data)
        )
        sessionStorage.setItem('adult_count', action.payload.data.adultNum)
        sessionStorage.setItem(
          'children_count',
          action.payload.data.childrenNum
        )
        state.isOrderConfirmModalOpen = true
      }
      // 提交訂單後，如想繼續點餐，需要先確認是否已結帳，未結帳才可以繼續點餐，只有未結帳的單才可以成功連上這條 api。
      if (action.meta.arg.page === 'customer_receipt_page') {
        if (!action.payload) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '您已結帳',
            text: '加點請洽櫃檯',
            showConfirmButton: false,
            timer: 2000,
          })
          return
        }
      }
    })
    // 顧客 & ＰOS 送出訂單
    builder.addCase(customerOrderApi.fulfilled, (state, action) => {
      // 顧客點餐
      if (action.meta.arg.page === 'customer_order') {
        if (!action.payload) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '點餐失敗，請洽櫃檯。',
            showConfirmButton: false,
            timer: 2000,
          })
          return
        }
      }
      // POS 點餐
      if (action.meta.arg.page === 'admin_order') {
        if (!action.payload) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '更新失敗，請重新操作。',
            showConfirmButton: false,
            timer: 2000,
          })
          return
        }
      }
    })
  },
  reducers: {
    setIsOrderConfirmModalOpen(state, action) {
      state.isOrderConfirmModalOpen = action.payload
    },
    setIsMinimumModalOpen(state, action) {
      state.isMinimumModalOpen = action.payload
    },
    setIsCartUpdate(state) {
      state.isCartUpdate = !state.isCartUpdate
    },
    setCustomerMenuInfo(state, action) {
      state.customerMenuInfo = action.payload
    },
  },
})

export const orderActions = orderSlice.actions

export default orderSlice.reducer
