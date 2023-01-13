import axios from 'axios'

const orderURL = 'https://pacific-woodland-57366.herokuapp.com/api/order'

const axiosInstance = axios.create({ baseURL: orderURL })

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken')
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`
  }
  return config
})

// 取得單一桌號未結帳訂單
export const getOrderApi = async (table_id) => {
  try {
    const res = await axiosInstance.get(`${orderURL}/${table_id}`)
    return res
  } catch (error) {
    console.error('[Get Order Failed]: ', error)
  }
}
