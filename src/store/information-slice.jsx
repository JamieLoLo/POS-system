import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryName: '',
  categoryID: '',
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
  },
})

export const informationActions = informationSlice.actions

export default informationSlice.reducer
