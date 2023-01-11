import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAddProductModalOpen: false,
  isCheckoutModalOpen: false,
  isSettingTableModalOpen: false,
  isAccountClosingModalOpen: false,
  isCategoryModifyModalOpen: false,
  isLoadingModalOpen: false,
  isModifyProductModalOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    // modal 開啟狀態
    setIsAddProductModalOpen(state, action) {
      state.isAddProductModalOpen = action.payload
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
    setIsLoadingModalOpen(state, action) {
      state.isLoadingModalOpen = action.payload
    },
    setIsModifyProductModalOpen(state, action) {
      state.isModifyProductModalOpen = action.payload
    },
  },
})

export const modalActions = modalSlice.actions

export default modalSlice.reducer
