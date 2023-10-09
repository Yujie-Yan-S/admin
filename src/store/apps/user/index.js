import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

const initialState = {
  userList: [],
  totalPage: 16,
  status: 'loading',
  error: null
}

//get all
export const getAllUser = createAsyncThunk('courses/fetchCourseBySearch', async query => {
  const response = await axios.get(`http://api.airobotoedu.com/api/user/admin/get_user_list?${query}`)
  console.log('getall query is', query)

  return response.data
})

//post
export const addNewUser = createAsyncThunk('fetchUser', async params => {
  console.log(params)
  const response = await axios.post('http://api.airobotoedu.com/api/user/admin/add_user', { user: params })
})

//update
export const updateUser = createAsyncThunk('updateUser', async params => {
  const response = await axios.post('http://api.airobotoedu.com/api/user/admin/update_user', params)
})

// delete
export const deleteUser = createAsyncThunk('deleteUser', async id => {
  const response = await axios.get(`http://api.airobotoedu.com/api/user/admin/delete_user?id=${id}`, {
    data: id
  })
})

const studentSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllUser.pending, state => {
        state.status = 'loading'
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.userList = action.payload.data.content
        state.totalPage = action.payload.data.totalPages
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default studentSlice.reducer
