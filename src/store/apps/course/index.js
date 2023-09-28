import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

//get
export const getAllCourse = createAsyncThunk('getAllCourse', async params => {
  const response = await axios.get('/apps/invoice/invoices', {
    params
  })

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
  const response = await axios.delete('/apps/invoice/delete', {
    data: id
  })
  await dispatch(fetchData(getState().invoice.params))

  return response.data
})

export const courseSlice = createSlice({
  name: 'courseList',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.invoices
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.total
    })
  }
})

export default courseSlice.reducer
