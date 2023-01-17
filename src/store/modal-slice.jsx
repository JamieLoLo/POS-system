import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAddProductModalOpen: false,
  isCheckoutModalOpen: false,
  isTableSettingModalOpen: false,
  isAccountClosingModalOpen: false,
  isCategoryModifyModalOpen: false,
  isLoadingModalOpen: false,
  isModifyProductModalOpen: false,
  isMinimumModalOpen: false,
  isProductDetailModalOpen: false,
  isOrderConfirmModalOpen: false,
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
    setIsTableSettingModalOpen(state, action) {
      state.isTableSettingModalOpen = action.payload
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
    setIsMinimumModalOpen(state, action) {
      state.isMinimumModalOpen = action.payload
    },
    setIsProductDetailModalOpen(state, action) {
      state.isProductDetailModalOpen = action.payload
    },
    setIsOrderConfirmModalOpen(state, action) {
      state.isOrderConfirmModalOpen = action.payload
    },
  },
})

export const modalActions = modalSlice.actions

export default modalSlice.reducer
