import { configureStore } from '@reduxjs/toolkit'
import courseSlice from './apps/course/'

export const store = configureStore({
  reducer: {
    course: courseSlice
  }
})
