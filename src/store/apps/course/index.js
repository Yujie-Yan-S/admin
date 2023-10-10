import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

const initialState = {
  courseList: [],
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
export const addNewCourse = createAsyncThunk('courses/addNewCourse', async params => {
  const response = await axios.post('http://api.airobotoedu.com/api/course/admin/add_course', params)

  return response.data
})

//post
export const updateCourse = createAsyncThunk('course/update', async params => {
  const response = await axios.get('http://api.airobotoedu.com/api/course/admin/update_course', params)

  return response.data
})

// delete
export const deleteCourse = createAsyncThunk('course/delete', async (id, dispatch) => {
  const response = await axios.get(`http://api.airobotoedu.com/api/course/admin/delete_course?id=${id}`, {
    data: id
  })
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

        state.courseList = action.payload.data.content
        state.totalPage = action.payload.data.totalPages
      })
      .addCase(fetchCourseBySearch.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default courseSlice.reducer
