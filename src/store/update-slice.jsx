import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAllCategoryUpdate: false,
}

const updateSlice = createSlice({
  name: 'update',
  initialState: initialState,
  reducers: {
    setIsAllCategoryUpdate(state) {
      state.isAllCategoryUpdate = !state.isAllCategoryUpdate
    },
  },
})

export const updateActions = updateSlice.actions

export default updateSlice.reducer
