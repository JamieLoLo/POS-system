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
