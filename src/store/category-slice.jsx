import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

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
const initialState = {
  // data
  allCategoryData: [],
  products: [],
  categoryName: '',
  categoryID: '',

  // update
  isAllCategoryUpdate: false,
  loadingStatus: true,
  // modal
  isCategoryModifyModalOpen: false,
  isProductDetailModalOpen: false,
}

// 取得所有分類
export const categoryGetAllApi = createAsyncThunk(
  'category/categoryGetAllApi',
  async () => {
    try {
      const res = await axios.get(categoryURL)
      return res
    } catch (error) {
      console.error(['[Category Get All Failed]: ', error])
      return error
    }
  }
)

// 新增分類
export const categoryPostApi = createAsyncThunk(
  'category/categoryPostApi',
  async (name) => {
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
)

// 刪除分類
export const deleteCategoryApi = createAsyncThunk(
  'category/deleteCategoryApi',
  async (id) => {
    try {
      const res = await axiosInstance.delete(`${categoryURL}/${id}`)
      return res
    } catch (error) {
      console.error('[Delete Category Failed]: ', error)
    }
  }
)

// 編輯分類
export const categoryModifyApi = createAsyncThunk(
  'category/categoryModifyApi',
  async (payload) => {
    const { id, name } = payload
    try {
      const res = await axiosInstance.put(`${categoryURL}/${id}`, {
        name,
      })
      return res
    } catch (error) {
      console.error('[Modify Category Failed]: ', error)
      return error
    }
  }
)

// 取得單一類別內的所有餐點
export const getProductsApi = createAsyncThunk(
  'category/getProductsApi',
  async (payload) => {
    const { id } = payload
    try {
      const res = await axios.get(`${categoryURL}/${id}`)
      return res
    } catch (error) {
      console.error(['[Category Get All Failed]: ', error])
      return error
    }
  }
)

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  extraReducers: (builder) => {
    // 取得所有分類
    builder.addCase(categoryGetAllApi.fulfilled, (state, action) => {
      if (action.meta.arg.page === 'customer_login_page') {
        sessionStorage.setItem('default_category_id', action.payload.data[0].id)
        sessionStorage.setItem(
          'default_category_name',
          action.payload.data[0].name
        )
      }
      if (action.meta.arg.page === 'customer_order_page') {
        state.allCategoryData = action.payload.data
        sessionStorage.setItem('default_category_id', action.payload.data[0].id)
        sessionStorage.setItem(
          'default_category_name',
          action.payload.data[0].name
        )
      }
      if (action.meta.arg.page === 'admin_table_page') {
        localStorage.setItem('default_category_id', action.payload.data[0].id)
        localStorage.setItem(
          'default_category_name',
          action.payload.data[0].name
        )
      }
      if (action.meta.arg.page === 'admin_order_page') {
        state.allCategoryData = action.payload.data
      }
      if (action.meta.arg.page === 'category_setting') {
        state.allCategoryData = action.payload.data
        localStorage.setItem('default_category_id', action.payload.data[0].id)
        localStorage.setItem(
          'default_category_name',
          action.payload.data[0].name
        )
      }
      if (action.meta.arg.page === 'product_setting') {
        state.allCategoryData = action.payload.data
        localStorage.setItem('default_category_id', action.payload.data[0].id)
      }
      if (action.meta.arg.page === 'add_product') {
        state.allCategoryData = action.payload.data
      }
      if (action.meta.arg.page === 'modify_product') {
        state.allCategoryData = action.payload.data
      }
    })
    // 新增分類
    builder.addCase(categoryPostApi.fulfilled, (state, action) => {
      if (!action.payload) {
        Swal.fire({
          position: 'center',
          icon: 'false',
          title: '新增失敗，請重新操作。',
          showConfirmButton: false,
          timer: 2000,
        })
        return
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '新增成功',
          showConfirmButton: false,
          timer: 2000,
        })
        state.isAllCategoryUpdate = !state.isAllCategoryUpdate
      }
    })
    // 刪除分類
    builder.addCase(deleteCategoryApi.fulfilled, (state, action) => {
      if (!action.payload) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '刪除失敗，請重新操作。',
          showConfirmButton: false,
          timer: 2000,
        })
        return
      } else {
        state.isAllCategoryUpdate = !state.isAllCategoryUpdate
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '刪除成功',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    })
    // 編輯分類
    builder.addCase(categoryModifyApi.fulfilled, (state, action) => {
      if (!action.payload) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '修改失敗，請重新操作。',
          showConfirmButton: false,
          timer: 2000,
        })
        return
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '修改成功',
          showConfirmButton: false,
          timer: 2000,
        })
        state.isAllCategoryUpdate = !state.isAllCategoryUpdate
        state.isCategoryModifyModalOpen = false
      }
    })
    // 取得單一類別內的所有餐點
    builder.addCase(getProductsApi.fulfilled, (state, action) => {
      if (action.meta.arg.page === 'setting_first') {
        state.products = action.payload.data
        state.loadingStatus = false
      }
      if (action.meta.arg.page === 'setting_select') {
        localStorage.setItem('default_category_id', action.meta.arg.id)
        state.products = action.payload.data
      }
      if (
        action.meta.arg.page === 'admin_order_first' ||
        action.meta.arg.page === 'admin_order_select' ||
        action.meta.arg.page === 'customer_order_first' ||
        action.meta.arg.page === 'customer_order_select'
      ) {
        state.products = action.payload.data
      }
    })
  },
  reducers: {
    setIsCategoryModifyModalOpen(state, action) {
      state.isCategoryModifyModalOpen = action.payload
    },
    setIsProductDetailModalOpen(state, action) {
      state.isProductDetailModalOpen = action.payload
    },
    setCategoryName(state, action) {
      state.categoryName = action.payload
    },
    setCategoryId(state, action) {
      state.categoryID = action.payload
    },
  },
})

export const categoryActions = categorySlice.actions

export default categorySlice.reducer
