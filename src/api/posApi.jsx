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
export const modifyTableApi = async (id, name) => {
  try {
    const res = await axiosInstance.put(`${posURL}/tables/${id}`, { name })
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
