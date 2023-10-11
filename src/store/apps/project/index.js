import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

const initialState = {
  projectList: [],
  totalPage: 16,
  status: 'loading',
  error: null
}

//get all
export const getAllProject = createAsyncThunk('courses/fetchCourseBySearch', async query => {
  const response = await axios.get(`http://api.airobotoedu.com/api/admin/project/search_project_by_name?${query}`)

  return response.data
})

//post
export const addNewProject = createAsyncThunk('appInvoice/fetchData', async params => {
  const response = await axios.post('http://api.airobotoedu.com/api/user/admin/add_user', { user: params })
})

//update
export const updateProject = createAsyncThunk('updateProject', async params => {
  const response = await axios.post('http://api.airobotoedu.com/api/admin/project/update_project', params)
})

// delete
export const deleteProject = createAsyncThunk('appInvoice/deleteData', async (id, { dispatch }) => {
  const response = await axios.get(`http://api.airobotoedu.com/api/admin/project/delete_project?id=${id}`)
  // console.log('delete project thunk triggered')
  dispatch(getAllProject(`pageNum=0&pageSize=6`))
})

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllProject.pending, state => {
        state.status = 'loading'
      })
      .addCase(getAllProject.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.projectList = action.payload.data.content
        state.totalPage = action.payload.data.totalPages
      })
      .addCase(getAllProject.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default projectSlice.reducer
