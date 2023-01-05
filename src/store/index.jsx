import { configureStore } from '@reduxjs/toolkit'

import modalSlice from './modal-slice'

const store = configureStore({
  reducer: {
    modal: modalSlice,
  },
})

export default store
