// ** MUI Imports


import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination, Slide,
} from "@mui/material";
import Card from "./components/course_card";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {forwardRef, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";
import {fetchCourseList} from "../../store/features/courses/coursesSlice";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import {auto} from "@popperjs/core";

const Home = () => {
  const mock_data = [
    {id: 1, name: 'name1', programid: 1, tutorid: 1, description: 'this is description', imgCoverUrl: 'this is url'},
    {id: 2, name: 'name2', programid: 2, tutorid: 2, description: 'this is description', imgCoverUrl: 'this is url'},
    {id: 3, name: 'name3', programid: 3, tutorid: 3, description: 'this is description', imgCoverUrl: 'this is url'},
    {id: 4, name: 'name4', programid: 4, tutorid: 4, description: 'this is description', imgCoverUrl: 'this is url'},
    {id: 5, name: 'name5', programid: 5, tutorid: 5, description: 'this is description', imgCoverUrl: 'this is url'},
    {id: 6, name: 'name6', programid: 6, tutorid: 6, description: 'this is description', imgCoverUrl: 'this is url'},
    {id: 7, name: 'name7', programid: 7, tutorid: 7, description: 'this is description', imgCoverUrl: 'this is url'},
    {id: 8, name: 'name8', programid: 8, tutorid: 8, description: 'this is description', imgCoverUrl: 'this is url'},
    {id: 9, name: 'name9', programid: 9, tutorid: 9, description: 'this is description', imgCoverUrl: 'this is url'},
    {
      id: 10,
      name: 'name10',
      programid: 10,
      tutorid: 10,
      description: 'this is description',
      imgCoverUrl: 'this is url'
    },
    {
      id: 11,
      name: 'name11',
      programid: 11,
      tutorid: 11,
      description: 'this is description',
      imgCoverUrl: 'this is url'
    },
  ]


  const {courses, status, error, courseDetail} = useSelector(state => state.courses);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('dispatch called')
    dispatch(fetchCourseList());
  }, []);


  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const [open, setOpen] = useState(false);

  const [add, setAdd] = useState(false)

  const handleButtonClick = () => {
    setAdd(true)

    setOpen(true);

  };

  const handleClickOpen = async (id) => {
    setAdd(false)
    console.log('dialog is opened','and id is', id)
    const response = await axios.get(`http://api.airobotoedu.com/api/course/admin/search_course_by_id?id=${id}`)

    // console.log(response.data.data)
    setId(response.data.data.id)
    setTutorId(response.data.data.tutorId)
    setCourseName(response.data.data.name)
    setDescription(response.data.data.description)
    setProgramId(response.data.data.programId)
    setImgCover(response.data.data.cover)
    setOpen(true);

  };

  const handleClose = () => {
    // console.log('dialog is closed')
    setId("")
    setTutorId("")
    setCourseName("")
    setDescription("")
    setProgramId("")
    setImgCover("")
    setOpen(false);
  };

  const [courseName, setCourseName] = useState("")
  const [courseId, setId] = useState("")
  const [programId, setProgramId] = useState("")
  const [tutorId, setTutorId] = useState("")
  const [courseDescription, setDescription] = useState("")
  const [imgCover, setImgCover] = useState("")

  const handleSave=()=>{
    if(add){
      axios.post('http://api.airobotoedu.com/api/course/admin/add_course',
        {
          "course":
            {
              "id": courseId,
              "name": courseName,
              "programId": programId,
              "tutorId": tutorId,
              "description": courseDescription,
              "cover": imgCover
            }
        }

      )
        .then((response) => {
          alert('Success')
          setId("")
          setTutorId("")
          setCourseName("")
          setDescription("")
          setProgramId("")
          setImgCover("")
          setOpen(false);
          dispatch(fetchCourseList())


        })
        .catch((error) => {
          alert('Failed')
        });
    }
    else{
      axios.post('http://api.airobotoedu.com/api/course/admin/update_course',
        {
          "course":
            {
              "id": courseId,
              "name": courseName,
              "programId": programId,
              "tutorId": tutorId,
              "description": courseDescription,
              "cover": imgCover
            }
        }
        )
        .then((response) => {
          console.log(response)
          alert("Success")
          setId("")
          setTutorId("")
          setCourseName("")
          setDescription("")
          setProgramId("")
          setImgCover("")
          setOpen(false);
          dispatch(fetchCourseList())


        })
        .catch((error) => {
          console.log(error)
          alert('Failed', error)
        });
    }
  };

return (
    <Box height={'100%'} width={"100%"} display={"flex"} flexDirection={"column"}>
      <IconButton color="primary" aria-label="Add" onClick={handleButtonClick} sx={{justifySelf:'start', height:auto, width:'10px', pb:4}}>
        <AddIcon />
      </IconButton>
      <Paper  sx={{display: "flex", py: 4, width: "100%"}} square variant="outlined">
        <Box width={"10%"} display={"flex"} justifyContent={"center"}>id</Box>
        <Box width={"20%"} display={"flex"} justifyContent={"center"}>name</Box>
        <Box width={"20%"} display={"flex"} justifyContent={"center"}>programid</Box>
        <Box width={"10%"} display={"flex"} justifyContent={"center"}>tutorid</Box>
        <Box width={"10%"} display={"flex"} justifyContent={"center"}> description</Box>
        <Box width={"25%"} display={"flex"} justifyContent={"center"}>imgCoverUrl</Box>
      </Paper>
      {courses.map((item, key) => {

        return (
          <Card onclick={()=>handleClickOpen(item.id)} key={item.id} id={item.id} name={item.name} programid={item.programId}
                tutorid={item.tutorId} description={item.description} imgCoverUrl={item.imgCoverUrl}></Card>
        )
      })}
      <Dialog
        open={open}


        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Course detail information"}</DialogTitle>

        <DialogContent sx={{display: 'flex'}}>
          <Box>
            <TextField id="outlined-basic" label="Please enter ID" variant="outlined" sx={{my: 2}}  value={courseId}
                       onChange={(event) => {
                         setId(event.target.value);
                       }}/>
            <TextField id="outlined-basic" label="Please enter Name" variant="outlined" sx={{my: 2}}  value={courseName}
                       onChange={(event) => {
                         setCourseName(event.target.value);
                       }}/>
            <TextField id="outlined-basic" label="Please enter Program ID" variant="outlined" sx={{my: 2}}  value={programId}
                       onChange={(event) => {
                         setProgramId(event.target.value);
                       }}/>
          </Box>
          <Box>
            <TextField id="outlined-basic" label="Please enter Tutor ID" variant="outlined" sx={{my: 2}}  value={tutorId}
                       onChange={(event) => {
                         setTutorId(event.target.value);
                       }}/>
            <TextField id="outlined-basic" label="Please enter Description" variant="outlined" sx={{my: 2}}  value={courseDescription}
                       onChange={(event) => {
                         setDescription(event.target.value);
                       }}/>
            <TextField id="outlined-basic" label="Please enter ImgCoverUrl" variant="outlined" sx={{my: 2}}  value={imgCover}
                       onChange={(event) => {
                         setImgCover(event.target.value);
                       }}/>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: 2, pt: 5}}>
        <Pagination count={11} page={page} onChange={handleChange}/>
      </Box>
    </Box>
  )
}

export default Home
