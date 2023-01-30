import axios from 'axios'

const posURL = 'https://pacific-woodland-57366.herokuapp.com/api/pos'

const axiosInstance = axios.create({ baseURL: posURL })

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken')
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`
  }
  return config
})

// login
export const posLoginApi = async (payload) => {
  const { account, password } = payload
  try {
    const res = await axios.post(`${posURL}/login`, {
      account,
      password,
    })
    return res
  } catch (error) {
    console.error('[POS Login Failed]: ', error)
    return error
  }
}

// 取得低消與描述資訊
export const getMinimumApi = async () => {
  try {
    const res = await axiosInstance.get(`${posURL}/settings`)
    return res
  } catch (error) {
    console.error('[Get Minimum Failed]: ', error)
  }
}

// 編輯低消與描述資訊
export const minimumModifyApi = async (minCharge, description) => {
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

// 取得所有桌子
export const getTablesApi = async () => {
  try {
    const res = await axiosInstance.get(`${posURL}/tables`)
    return res
  } catch (error) {
    console.error('[Get Tables Failed]: ', error)
  }
}

// 修改桌號
export const modifyTableApi = async (id, name, isValid) => {
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

// 新增餐點
export const AddProductApi = async (formData) => {
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

// 修改餐點
export const modifyProductApi = async (formData, id) => {
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

// 店家設人數開桌
export const addHeadcountApi = async (table_id, adultNum, childrenNum) => {
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

// 店家修改人數
export const modifyHeadcountApi = async (table_id, adultNum, childrenNum) => {
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

// 結帳
export const checkoutApi = async (order_id) => {
  try {
    const res = await axiosInstance.patch(`${posURL}/orders/${order_id}`)
    return res
  } catch (error) {
    console.error('[Checkout Failed]: ', error)
  }
}

// 完成訂單
export const finishOrderApi = async (order_id) => {
  try {
    const res = await axiosInstance.patch(`${posURL}/finishorder/${order_id}`)
    return res
  } catch (error) {
    console.error('[Finish Order Failed]: ', error)
  }
}

// 取得未結算營收
export const getUnsettledRevenueApi = async () => {
  try {
    const res = await axiosInstance.get(`${posURL}/revenues/unsettledrevenue`)
    return res
  } catch (error) {
    console.error('[Get Unsettled Revenue Failed]: ', error)
  }
}

// 關帳
export const closeDailyRevenueApi = async (postingDate, revenue) => {
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

// 取得營收報表
export const getRevenuesApi = async (startDate, endDate) => {
  try {
    const res = await axiosInstance.get(`${posURL}/revenues`, {
      params: { startDate, endDate },
    })
    return res
  } catch (error) {
    console.error('[Get Revenues Failed]: ', error)
  }
}

// 取得銷售排行
export const getRankApi = async (startDate, endDate) => {
  try {
    const res = await axiosInstance.get(`${posURL}/sales_ranking`, {
      params: { startDate, endDate },
    })
    return res
  } catch (error) {
    console.error('[Get Rank Failed]: ', error)
  }
}

// 查看所有訂單
export const getAllOrdersApi = async (date, page) => {
  try {
    const res = await axiosInstance.get(`${posURL}/orders/${date}`, {
      params: { page },
    })
    return res
  } catch (error) {
    console.error('[Get All Orders Failed]: ', error)
  }
}

// 商家取得一張訂單
export const getSingleOrderApi = async (id) => {
  try {
    const res = await axiosInstance.get(`${posURL}/order/${id}`, {
      params: { id },
    })
    return res
  } catch (error) {
    console.error('[Get Single Order Failed]: ', error)
  }
}
