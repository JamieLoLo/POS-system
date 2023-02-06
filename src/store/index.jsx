import { configureStore } from '@reduxjs/toolkit'

import posSlice from './pos-slice'
import categorySlice from './category-slice'
import orderSlice from './order-slice'

const store = configureStore({
  reducer: {
    pos: posSlice,
    category: categorySlice,
    order: orderSlice,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false }),
  ],
})

export default store
