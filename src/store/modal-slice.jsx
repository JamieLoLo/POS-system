import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAddDishModalOpen: false,
  isCheckoutModalOpen: false,
  isSettingTableModalOpen: false,
  isAccountClosingModalOpen: false,
  isCategoryModifyModalOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    // modal 開啟狀態
    setIsAddDishModalOpen(state, action) {
      state.isAddDishModalOpen = action.payload
    },
    setIsCheckoutModalOpen(state, action) {
      state.isCheckoutModalOpen = action.payload
    },
    setIsSettingTableModalOpen(state, action) {
      state.isSettingTableModalOpen = action.payload
    },
    setIsAccountClosingModalOpen(state, action) {
      state.isAccountClosingModalOpen = action.payload
    },
    setIsCategoryModifyModalOpen(state, action) {
      state.isCategoryModifyModalOpen = action.payload
    },
  },
})

export const modalActions = modalSlice.actions

export default modalSlice.reducer
