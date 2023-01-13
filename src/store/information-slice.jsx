import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // 分類資訊管理
  categoryName: '',
  categoryID: '',
  // 餐點資訊管理
  product: [],
  // 桌子資訊管理
  tableName: '',
  tableID: '',
  tableInfo: [],
  headcountInfo: [],
  orderInfo: [],
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
    setTableName(state, action) {
      state.tableName = action.payload
    },
    setTableID(state, action) {
      state.tableID = action.payload
    },
    setTableInfo(state, action) {
      state.tableInfo = action.payload
    },
    setHeadcountInfo(state, action) {
      state.headcountInfo = action.payload
    },
    setOrderInfo(state, action) {
      state.orderInfo = action.payload
    },
  },
})

export const informationActions = informationSlice.actions

export default informationSlice.reducer
