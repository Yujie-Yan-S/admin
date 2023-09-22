import Paper from "@mui/material/Paper";
import {display} from "@mui/system";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import {useDispatch} from "react-redux";
import {fetchCourseList} from "../../../store/features/courses/coursesSlice";

const Card = (props)=>{

  const dispatch = useDispatch()
    const {onclick, id, name, programid, tutorid, description, imgCoverUrl} = props

    const handleDelete= ()=>{
      axios.get(`http://api.airobotoedu.com/api/course/admin/delete_course?id=${id}`)
        .then((response) => {
          alert("Success")
          dispatch(fetchCourseList())
        })
        .catch((error) => {
          alert('Failed')
        });
    }

return(
        <Paper   sx={{display:"flex",  py:4,
          '&:hover':{bgcolor:'#f7f7f8'}
        }} square variant="outlined">
            <Box onClick={onclick} width={"10%"} display={"flex"} justifyContent={"center"}>{id}</Box>
            <Box onClick={onclick}  width={"20%"}display={"flex"} justifyContent={"center"}>{name}</Box>
            <Box onClick={onclick}  width={"20%"}display={"flex"} justifyContent={"center"}>{programid}</Box>
            <Box onClick={onclick}  width={"10%"}display={"flex"} justifyContent={"center"}>{tutorid}</Box>
            <Box onClick={onclick}  width={"10%"}display={"flex"} justifyContent={"center"}> {description}</Box>
            <Box onClick={onclick}  width={"25%"}display={"flex"} justifyContent={"center"}>{imgCoverUrl}</Box>
          <Box width={"5%"} display={"flex"} justifyContent={"center"}>
            <IconButton
              onClick={handleDelete}
            >
              <DeleteIcon/>
            </IconButton>
          </Box>
        </Paper>
    )

}

export default Card
