import axios from 'axios'

const categoryURL =
  'https://pacific-woodland-57366.herokuapp.com/api/categories'

const axiosInstance = axios.create({ baseURL: categoryURL })

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken')
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`
  }
  return config
})

// 取得所有分類
export const categoryGetAllApi = async () => {
  try {
    const res = await axios.get(categoryURL)
    return res
  } catch (error) {
    console.error(['[Category Get All Failed]: ', error])
    return error
  }
}

// 新增分類
export const categoryPostApi = async (name) => {
  try {
    const res = await axiosInstance.post(categoryURL, {
      name,
    })
    return res
  } catch (error) {
    console.error('[Add Category Failed]: ', error)
    return error
  }
}

// 刪除分類
export const deleteCategoryApi = async (id) => {
  try {
    const res = await axiosInstance.delete(`${categoryURL}/${id}`)
    return res
  } catch (error) {
    console.error('[Delete Category Failed]: ', error)
  }
}
