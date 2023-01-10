import { configureStore } from '@reduxjs/toolkit'

import modalSlice from './modal-slice'
import updateSlice from './update-slice'
import informationSlice from './information-slice'

const store = configureStore({
  reducer: {
    modal: modalSlice,
    update: updateSlice,
    information: informationSlice,
  },
})

export default store
