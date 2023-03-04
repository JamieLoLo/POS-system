import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

const posURL = 'https://pacific-woodland-57366.herokuapp.com/api/pos'

const axiosInstance = axios.create({ baseURL: posURL })

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken')
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`
  }
  return config
})

const initialState = {
  // data
  minimum: { id: '', minCharge: '', description: '' },
  allTablesData: [],
  unSettledRevenue: '',
  revenueData: [],
  rankData: [],
  allOrdersData: [],
  singlePageOrdersData: [],
  singleOrderData: [],
  product: [],
  tableName: '',
  tableID: '',
  tableInfo: [],
  accountClosingCalculate: 0,
  isHeadcountDisabled: false,
  // modal control
  isTableSettingModalOpen: false,
  isAddProductModalOpen: false,
  isModifyProductModalOpen: false,
  isLoadingModalOpen: false,
  isCheckoutModalOpen: false,
  isAccountClosingModalOpen: false,
  isAdminDetailsModalOpen: false,
  // update trigger
  isTableUpdate: false,
  isProductUpdate: false,
}

// 取得低消與描述資訊
export const getMinimumApi = createAsyncThunk('pos/getMinimumApi', async () => {
  try {
    const res = await axiosInstance.get(`${posURL}/settings`)
    return res
  } catch (error) {
    console.error('[Get Minimum Failed]: ', error)
  }
})

// 編輯低消與描述資訊
export const minimumModifyApi = createAsyncThunk(
  'pos/minimumModifyApi',
  async (payload) => {
    const { minCharge, description } = payload
    try {
      const res = await axiosInstance.put(`${posURL}/settings`, {
        minCharge,
        description,
      })
      return res
    } catch (error) {
      console.error('[Modify Minimum Failed]: ', error)
      return error
    }
  }
)

// 取得所有桌子
export const getTablesApi = createAsyncThunk('pos/getTablesApi', async () => {
  try {
    const res = await axiosInstance.get(`${posURL}/tables`)
    return res
  } catch (error) {
    console.error('[Get Tables Failed]: ', error)
  }
})

// 修改桌號 or 刪除桌子
export const modifyTableApi = createAsyncThunk(
  'pos/modifyTableApi',
  async (payload) => {
    const { id, name, isValid } = payload
    try {
      const res = await axiosInstance.put(`${posURL}/tables/${id}`, {
        name,
        isValid,
      })
      return res
    } catch (error) {
      console.error('[Modify Table Failed]: ', error)
    }
  }
)

// 新增餐點
export const addProductApi = createAsyncThunk(
  'pos/addProductApi',
  async (formData) => {
    try {
      const res = axiosInstance({
        method: 'post',
        baseURL: posURL,
        url: '/products',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return res
    } catch (error) {
      console.error('[Add Product Failed]: ', error)
      return error
    }
  }
)

// 修改餐點
export const modifyProductApi = createAsyncThunk(
  'pos/modifyProductApi',
  async (payload) => {
    const { formData, id } = payload
    try {
      const res = axiosInstance({
        method: 'put',
        baseURL: posURL,
        url: '/products/' + id,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return res
    } catch (error) {
      console.error('[Modify Product Failed]: ', error)
      return error
    }
  }
)

// 店家設人數開桌
export const addHeadcountApi = createAsyncThunk(
  '/pos/addHeadcountApi',
  async (payload) => {
    const { table_id, adultNum, childrenNum } = payload
    try {
      const res = await axiosInstance.post(`${posURL}/orders/${table_id}`, {
        adultNum,
        childrenNum,
      })
      return res
    } catch (error) {
      console.error('[Add Headcount Failed]: ', error)
      return error
    }
  }
)

// 店家修改人數
export const modifyHeadcountApi = createAsyncThunk(
  '/pos/modifyHeadcountApi',
  async (payload) => {
    const { table_id, adultNum, childrenNum } = payload
    try {
      const res = await axiosInstance.put(`${posURL}/orders/${table_id}`, {
        adultNum,
        childrenNum,
      })
      return res
    } catch (error) {
      console.error('[Modify Headcount Failed]: ', error)
    }
  }
)

// 結帳
export const checkoutApi = createAsyncThunk(
  'pos/checkoutApi',
  async (order_id) => {
    try {
      const res = await axiosInstance.patch(`${posURL}/orders/${order_id}`)
      return res
    } catch (error) {
      console.error('[Checkout Failed]: ', error)
    }
  }
)

// 完成訂單
export const finishOrderApi = createAsyncThunk(
  'pos/finishOrderApi',
  async (order_id) => {
    try {
      const res = await axiosInstance.patch(`${posURL}/finishorder/${order_id}`)
      return res
    } catch (error) {
      console.error('[Finish Order Failed]: ', error)
    }
  }
)

// 取得未結算營收
export const getUnsettledRevenueApi = createAsyncThunk(
  'pos/getUnsettledRevenueApi',
  async () => {
    try {
      const res = await axiosInstance.get(`${posURL}/revenues/unsettledrevenue`)
      return res
    } catch (error) {
      console.error('[Get Unsettled Revenue Failed]: ', error)
    }
  }
)

// 關帳
export const closeDailyRevenueApi = createAsyncThunk(
  'pos/closeDailyRevenueApi',
  async (payload) => {
    const { postingDate, revenue } = payload
    try {
      const res = await axiosInstance.post(
        `${posURL}/revenues/closedailyrevenue`,
        {
          postingDate,
          revenue,
        }
      )
      return res
    } catch (error) {
      console.error('[Close Daily Revenue Failed]: ', error)
    }
  }
)

// 取得營收報表
export const getRevenuesApi = createAsyncThunk(
  'pos/getRevenuesApi',
  async (payload) => {
    const { startDate, endDate } = payload
    try {
      const res = await axiosInstance.get(`${posURL}/revenues`, {
        params: { startDate, endDate },
      })
      return res
    } catch (error) {
      console.error('[Get Revenues Failed]: ', error)
    }
  }
)

// 取得銷售排行
export const getRankApi = createAsyncThunk(
  'pos/getRankApi',
  async (payload) => {
    const { startDate, endDate } = payload
    try {
      const res = await axiosInstance.get(`${posURL}/sales_ranking`, {
        params: { startDate, endDate },
      })
      return res
    } catch (error) {
      console.error('[Get Rank Failed]: ', error)
    }
  }
)

// 查看所有訂單
export const getAllOrdersApi = createAsyncThunk(
  'pos/getAllOrdersApi',
  async (payload) => {
    const { date, page } = payload
    try {
      const res = await axiosInstance.get(`${posURL}/orders/${date}`, {
        params: { page },
      })
      return res
    } catch (error) {
      console.error('[Get All Orders Failed]: ', error)
    }
  }
)

// 商家取得一張訂單
export const getSingleOrderApi = createAsyncThunk(
  'pos/getSingleOrderApi',
  async (id) => {
    try {
      const res = await axiosInstance.get(`${posURL}/order/${id}`, {
        params: { id },
      })
      return res
    } catch (error) {
      console.error('[Get Single Order Failed]: ', error)
    }
  }
)

const posSlice = createSlice({
  name: 'pos',
  initialState: initialState,
  extraReducers: (builder) => {
    // 取得低消與描述資訊
    builder.addCase(getMinimumApi.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.minimum = action.payload.data
      }
    })
    // 編輯低消與描述資訊
    builder.addCase(minimumModifyApi.fulfilled, (state, action) => {
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
      if (action.payload.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '資訊更新成功',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    })
    // 取得所有桌子
    builder.addCase(getTablesApi.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.allTablesData = action.payload.data
      }
    })
    // 修改桌號 or 刪除桌子
    builder.addCase(modifyTableApi.fulfilled, (state, action) => {
      if (!action.payload) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '桌號不可重複 不可空白',
          showConfirmButton: false,
          timer: 2000,
        })
        return
      }
      if (action.payload.status === 200 && action.meta.arg.isValid === 'true') {
        state.isTableUpdate = !state.isTableUpdate
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '桌號修改成功',
          showConfirmButton: false,
          timer: 2000,
        })
        state.isTableSettingModalOpen = false
        return
      } else if (
        action.payload.status === 200 &&
        action.meta.arg.isValid === 'false'
      ) {
        state.isTableUpdate = !state.isTableUpdate
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '刪除成功',
          showConfirmButton: false,
          timer: 2000,
        })
        state.isTableSettingModalOpen = false
        return
      }
    })
    // 新增餐點
    builder.addCase(addProductApi.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.isLoadingModalOpen = false
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '新增成功',
          showConfirmButton: false,
          timer: 2000,
        })
        state.isProductUpdate = !state.isProductUpdate
        state.isAddProductModalOpen = false
        return
      } else {
        state.isLoadingModalOpen = false
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '發生錯誤，請重新操作。',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    })
    // 修改餐點
    builder.addCase(modifyProductApi.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.isLoadingModalOpen = false
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '修改成功',
          showConfirmButton: false,
          timer: 2000,
        })
        state.isProductUpdate = !state.isProductUpdate
        state.isModifyProductModalOpen = false
        return
      }
    })
    // 店家設人數開桌
    builder.addCase(addHeadcountApi.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '成功開桌',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    })
    // 店家修改人數
    builder.addCase(modifyHeadcountApi.fulfilled, (state, action) => {
      if (!action.payload) {
        Swal.fire({
          position: 'center',
          icon: 'false',
          title: '修改失敗，請重新操作。',
          showConfirmButton: false,
          timer: 2000,
        })
        return
      }
    })
    // 結帳
    builder.addCase(checkoutApi.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.isCheckoutModalOpen = false
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '結帳成功',
          showConfirmButton: false,
          timer: 2000,
        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'false',
          title: '發生錯誤，請重新操作。',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    })
    // 完成訂單
    builder.addCase(finishOrderApi.fulfilled, (state, action) => {
      if (!action.payload) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '發生錯誤，請重新操作。',
          showConfirmButton: false,
          timer: 2000,
        })
        return
      }
      state.isTableUpdate = !state.isTableUpdate
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '設定成功',
        showConfirmButton: false,
        timer: 2000,
      })
    })
    // 取得未結算營收
    builder.addCase(getUnsettledRevenueApi.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.unSettledRevenue = action.payload.data
      }
    })
    // 關帳
    builder.addCase(closeDailyRevenueApi.fulfilled, (state, action) => {
      if (!action.payload) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '此日期已有帳目',
          showConfirmButton: false,
          timer: 2000,
        })
        return
      }
      if (action.payload.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '已成功關帳',
          showConfirmButton: false,
          timer: 2000,
        })
        state.isAccountClosingModalOpen = false
      }
    })
    // 取得營收報表
    builder.addCase(getRevenuesApi.fulfilled, (state, action) => {
      if (action.payload.data.length === 0) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '查無此區間資訊',
          showConfirmButton: false,
          timer: 2000,
        })
        return
      } else {
        state.revenueData = action.payload.data
      }
    })
    // 取得銷售排行
    builder.addCase(getRankApi.fulfilled, (state, action) => {
      if (action.payload.data.length === 0) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '查無此區間資訊',
          showConfirmButton: false,
          timer: 2000,
        })
        return
      } else {
        state.rankData = action.payload.data
      }
    })
    // 查看所有訂單
    builder.addCase(getAllOrdersApi.fulfilled, (state, action) => {
      if (action.meta.arg.for === 'search') {
        if (action.payload.data.length === 0) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '查無此日期的訂單',
            showConfirmButton: false,
            timer: 2000,
          })
        }
        state.allOrdersData = action.payload.data
      }
      if (action.meta.arg.for === 'lazy_loading') {
        state.singlePageOrdersData = action.payload.data
        state.allOrdersData = state.allOrdersData.concat(action.payload.data)
      }
    })
    // 商家取得一張訂單
    builder.addCase(getSingleOrderApi.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.singleOrderData = action.payload.data
        state.isLoadingModalOpen = false
        state.isAdminDetailsModalOpen = true
      }
    })
  },
  reducers: {
    // data
    setMinCharge(state, action) {
      state.minimum.minCharge = action.payload
    },
    setDescription(state, action) {
      state.minimum.description = action.payload
    },
    setProductInfo(state, action) {
      state.product = action.payload
    },
    setTableName(state, action) {
      state.tableName = action.payload
    },
    setTableID(state, action) {
      state.tableID = action.payload
    },
    setTableInfo(state, action) {
      state.tableInfo = action.payload
    },
    setAccountClosingCalculate(state, action) {
      state.accountClosingCalculate = action.payload
    },
    setRevenueData(state, action) {
      state.revenueData = action.payload
    },
    setAllOrdersData(state, action) {
      state.allOrdersData = action.payload
    },
    setRankData(state, action) {
      state.rankData = action.payload
    },
    // modal
    setIsTableSettingModalOpen(state, action) {
      state.isTableSettingModalOpen = action.payload
    },
    setIsAddProductModalOpen(state, action) {
      state.isAddProductModalOpen = action.payload
    },
    setIsModifyProductModalOpen(state, action) {
      state.isModifyProductModalOpen = action.payload
    },
    setIsLoadingModalOpen(state, action) {
      state.isLoadingModalOpen = action.payload
    },
    setIsCheckoutModalOpen(state, action) {
      state.isCheckoutModalOpen = action.payload
    },
    setIsAccountClosingModalOpen(state, action) {
      state.isAccountClosingModalOpen = action.payload
    },
    setIsAdminDetailsModalOpen(state, action) {
      state.isAdminDetailsModalOpen = action.payload
    },
    setIsHeadcountDisabled(state, action) {
      state.isHeadcountDisabled = action.payload
    },
  },
})

export const posActions = posSlice.actions

export default posSlice.reducer
