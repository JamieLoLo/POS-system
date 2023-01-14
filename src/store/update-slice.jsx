import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAllCategoryUpdate: false,
  isTableUpdate: false,
  isProductUpdate: false,
  isCartUpdate: false,
}

const updateSlice = createSlice({
  name: 'update',
  initialState: initialState,
  reducers: {
    setIsAllCategoryUpdate(state) {
      state.isAllCategoryUpdate = !state.isAllCategoryUpdate
    },
    setIsTableUpdate(state) {
      state.isTableUpdate = !state.isTableUpdate
    },
    setIsProductUpdate(state) {
      state.isProductUpdate = !state.isProductUpdate
    },
    setIsCartUpdate(state) {
      state.isCartUpdate = !state.isCartUpdate
    },
  },
})

export const updateActions = updateSlice.actions

export default updateSlice.reducer
