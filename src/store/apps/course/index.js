import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

const initialState = {
  courseListFromSearch: [],
  totalPage: 16,
  status: 'loading',
  error: null
}

//get all
export const fetchCourseBySearch = createAsyncThunk('courses/fetchCourseBySearch', async query => {
  const response = await axios.get(`http://api.airobotoedu.com/api/course/get_course_list_by_search?${query}`)

  return response.data
})

//post
export const addNewCourse = createAsyncThunk('appInvoice/fetchData', async params => {
  const response = await axios.get('/apps/invoice/invoices', {
    params
  })

  return response.data
})

//update
export const updateCourse = createAsyncThunk('appInvoice/fetchData', async params => {
  const response = await axios.get('/apps/invoice/invoices', {
    params
  })

  return response.data
})

// delete
export const deleteCourse = createAsyncThunk('appInvoice/deleteData', async (id, { getState, dispatch }) => {
  const response = await axios.get(`http://api.airobotoedu.com/api/course/admin/delete_course?id=${id}`, {
    data: id
  })
  console.log()
  dispatch(fetchCourseBySearch())
})

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCourseBySearch.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCourseBySearch.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.courseListFromSearch = action.payload.data.content
        state.totalPage = action.payload.data.totalPages
      })
      .addCase(fetchCourseBySearch.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewCourse.pending, state => {
        state.status = 'loading'
      })
      .addCase(addNewCourse.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.courseListFromSearch = action.payload.data.content
        state.totalPage = action.payload.data.totalPages
      })
      .addCase(addNewCourse.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteCourse.pending, state => {
        state.status = 'loading'
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.courseListFromSearch = action.payload.data.content
        state.totalPage = action.payload.data.totalPages
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default courseSlice.reducer
