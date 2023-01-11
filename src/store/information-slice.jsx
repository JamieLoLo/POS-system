import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // 分類資訊管理
  categoryName: '',
  categoryID: '',
  // 餐點資訊管理
  product: [],
}

const informationSlice = createSlice({
  name: 'information',
  initialState: initialState,
  reducers: {
    // 餐點類別資訊
    setCategoryName(state, action) {
      state.categoryName = action.payload
    },
    setCategoryId(state, action) {
      state.categoryID = action.payload
    },
    setProductInfo(state, action) {
      state.product = action.payload
    },
  },
})

export const informationActions = informationSlice.actions

export default informationSlice.reducer
