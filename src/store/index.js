import { configureStore } from '@reduxjs/toolkit'
import courseSlice from './apps/course/'
import userSlice from './apps/user'
import projectSlice from './apps/project'

export const store = configureStore({
  reducer: {
    course: courseSlice,
    users: userSlice,
    projects: projectSlice
  }
})
