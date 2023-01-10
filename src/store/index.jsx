import { configureStore } from '@reduxjs/toolkit'

import modalSlice from './modal-slice'
import updateSlice from './update-slice'

const store = configureStore({
  reducer: {
    modal: modalSlice,
    update: updateSlice,
  },
})

export default store
