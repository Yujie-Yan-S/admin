import { Box, Paper, Button, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material'
import { GridDeleteIcon } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import { useRouter } from 'next/router'
//TODO:
import { deleteProject } from 'src/store/apps/project'
import { useState } from 'react'
import {deleteLesson} from "../../../store/apps/lesson";

const LessonCard = props => {
  const { id, name, description, videoURL, setPage } = props
  const dispatch = useDispatch()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  //TODO:
  const handleDeleteClick = id => {
    dispatch(deleteLesson(id))
    setOpen(false)
  }


  const handleUpdateClick = id => {
    router.push(`lesson/edit/${id}`)
  }

  return (
    <Paper
      onClick={onclick}
      sx={{ display: 'flex', py: 4, '&:hover': { bgcolor: '#f7f7f8' } }}
      square
      variant='outlined'
    >
      <Box width={'15%'} display={'flex'} justifyContent={'center'}>
        {name}
      </Box>
      <Box width={'30%'} display={'flex'} justifyContent={'center'}>
        {description}
      </Box>
      <Box width={'20%'} height={'50px'} display={'flex'} justifyContent={'center'}>
        {videoURL}
      </Box>

      <Box width={'35%'} display={'flex'} justifyContent={'center'}>
        <IconButton onClick={handleClickOpen}>
          <GridDeleteIcon />
        </IconButton>
        <IconButton onClick={() => handleUpdateClick(id)}>
          <EditIcon />
        </IconButton>
      </Box>

      <Dialog open={open} onClose={handleClose} aria-labelledby='draggable-dialog-title'>
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          Do you want delete lesson {name}
        </DialogTitle>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={() => handleDeleteClick(id)}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export default LessonCard
