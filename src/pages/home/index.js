// ** MUI Imports

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination, Slide
} from "@mui/material";
import Card from "./components/course_card";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {forwardRef, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Home = () => {
   const mock_data = [
       {id:1, name:'name1', programid:1, tutorid:1, description:'this is description', imgCoverUrl:'this is url'},
       {id:2, name:'name2', programid:2, tutorid:2, description:'this is description', imgCoverUrl:'this is url'},
       {id:3, name:'name3', programid:3, tutorid:3, description:'this is description', imgCoverUrl:'this is url'},
       {id:4, name:'name4', programid:4, tutorid:4, description:'this is description', imgCoverUrl:'this is url'},
       {id:5, name:'name5', programid:5, tutorid:5, description:'this is description', imgCoverUrl:'this is url'},
       {id:6, name:'name6', programid:6, tutorid:6, description:'this is description', imgCoverUrl:'this is url'},
       {id:7, name:'name7', programid:7, tutorid:7, description:'this is description', imgCoverUrl:'this is url'},
       {id:8, name:'name8', programid:8, tutorid:8, description:'this is description', imgCoverUrl:'this is url'},
       {id:9, name:'name9', programid:9, tutorid:9, description:'this is description', imgCoverUrl:'this is url'},
       {id:10, name:'name10', programid:10, tutorid:10, description:'this is description', imgCoverUrl:'this is url'},
       {id:11, name:'name11', programid:11, tutorid:11, description:'this is description', imgCoverUrl:'this is url'},
   ]


  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    console.log('dialog is opened')
    setOpen(true);
  };

  const handleClose = () => {
    console.log('dialog is closed')
    setOpen(false);
  };

return (
    <Box height={'100%'} width={"100%"} display={"flex"} flexDirection={"column"} >
        <Paper elevation={3} sx={{display:"flex", py:4, width:"100%"}} square variant="outlined">
            <Box width={"10%"} display={"flex"} justifyContent={"center"}>id</Box>
            <Box  width={"20%"}display={"flex"} justifyContent={"center"}>name</Box>
            <Box  width={"20%"}display={"flex"} justifyContent={"center"}>programid</Box>
            <Box  width={"10%"}display={"flex"} justifyContent={"center"}>tutorid</Box>
            <Box  width={"10%"}display={"flex"} justifyContent={"center"}> description</Box>
            <Box  width={"30%"}display={"flex"} justifyContent={"center"}>imgCoverUrl</Box>
        </Paper>
        {mock_data.map((item,key)=>{

            return(
                <Card onclick={handleClickOpen} key={key} id={item.id} name={item.name} programid={item.programid} tutorid={item.tutorid} description={item.description} imgCoverUrl={item.imgCoverUrl}></Card>
            )
        })}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Course detail information"}</DialogTitle>

        <DialogContent sx={{display:'flex'}}>
          <Box>
            <TextField id="outlined-basic" label="Please enter ID" variant="outlined" sx={{py:2}}/>
            <TextField id="outlined-basic" label="Please enter Name" variant="outlined" sx={{py:2}}/>
            <TextField id="outlined-basic" label="Please enter Program ID" variant="outlined" sx={{py:2}}/>
          </Box>
          <Box>
            <TextField id="outlined-basic" label="Please enter Tutor ID" variant="outlined" sx={{py:2}} />
            <TextField id="outlined-basic" label="Please enter Description" variant="outlined" sx={{py:2}}/>
            <TextField id="outlined-basic" label="Please enter ImgCoverUrl" variant="outlined" sx={{py:2}}/>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: 2, pt:5}} >
            <Pagination count={11} page={page} onChange={handleChange} />
        </Box>
    </Box>
  )
}

export default Home
