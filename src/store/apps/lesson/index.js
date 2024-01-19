import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

const initialState = {
  lessonList: [],
  totalPage: 16,
  status: 'loading',
  error: null
}

//get all
export const getAllLesson = createAsyncThunk('getAllLesson', async query => {
  const response = await axios.get(`http://api.airobotoedu.com/api/admin/lesson/get_lesson_list_by_search?${query}`)

  return response.data
})

//post
export const addNewLesson = createAsyncThunk('lessons/addNewLesson', async params => {
  const response = await axios.post('//api.airobotoedu.com/api/admin/lesson/add_lesson', params)

  return response.data
})

//post
export const updateLesson = createAsyncThunk('lessons/update', async params => {
  const response = await axios.post('//api.airobotoedu.com/api/admin/lesson/update_lesson', params)

  return response.data
});

// delete
export const deleteLesson = createAsyncThunk('lessons/delete', async (id, { dispatch }) => {
  const response = await axios.get(`http://api.airobotoedu.com/api/admin/lesson/delete_lesson?id=${id}`)
  dispatch(getAllLesson(`pageNum=0&pageSize=6`))
})

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllLesson.pending, state => {
        state.status = 'loading'
      })
      .addCase(getAllLesson.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.lessonList = action.payload.data.content
        state.totalPage = action.payload.data.totalPages
      })
      .addCase(getAllLesson.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default lessonSlice.reducer
