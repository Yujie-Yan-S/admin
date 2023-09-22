import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
  courses:[],
  status:'loading',
  error:null,
}


export const fetchCourseList =createAsyncThunk('courses/fetchCourseList',async ()=>{
  try{
    // console.log('try entered')
    const response = await axios.get('http://api.airobotoedu.com/api/course/admin/get_course_list');

    // console.log('this is reponse data',response.data)

return response.data;
  }
  catch (error){
    throw error.response.data;
  }
});




const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourseList.fulfilled, (state, action) => {
        state.message = action.payload.msg;
        state.courses = action.payload.data;
      })
      .addCase(fetchCourseList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

  },
});

export default coursesSlice.reducer;
