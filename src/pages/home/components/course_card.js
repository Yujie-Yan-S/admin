import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material'
import { GridDeleteIcon } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import { fetchCourseBySearch } from 'src/store/apps/course'
import EditIcon from '@mui/icons-material/Edit'
import axios from 'axios'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import { useState } from 'react'

const Card = props => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { id, name, programid, tutorid, description, setPage } = props

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  //
  // const handleDeleteClick = id => {
  //   axios
  //     .get(`http://api.airobotoedu.com/api/course/admin/delete_course?id=${id}`)
  //     .then(response => {
  //       // alert('Success')
  //       dispatch(fetchCourseBySearch(`pageNum=0&pageSize=6`))
  //     })
  //     .catch(error => {
  //       alert('Failed')
  //     })
  // }

  const handleDelete = () => {
    axios
      .get(`http://api.airobotoedu.com/api/admin/course/delete_course?id=${id}`)
      .then(response => {
        alert('Success')
        dispatch(fetchCourseBySearch(`pageNum=0&pageSize=6`))
      })
      .catch(error => {
        alert('Failed')
      })
    setPage(1)
    setOpen(false)
  }

  const handleUpdateClick = id => {
    console.log('course update triggered')
    router.push(`home/edit/${id}`)
  }

  return (
    <Paper
      onClick={onclick}
      sx={{ display: 'flex', py: 4, '&:hover': { bgcolor: '#f7f7f8' } }}
      square
      variant='outlined'
    >
      <Box width={'10%'} display={'flex'} justifyContent={'center'}>
        {id}
      </Box>
      <Box width={'20%'} display={'flex'} justifyContent={'center'}>
        {name}
      </Box>
      <Box width={'20%'} display={'flex'} justifyContent={'center'}>
        {programid}
      </Box>
      <Box width={'10%'} display={'flex'} justifyContent={'center'}>
        {tutorid}
      </Box>
      <Box width={'30%'} display={'flex'} justifyContent={'center'}>
        {' '}
        {description}
      </Box>

      <Box width={'20%'} display={'flex'} justifyContent={'center'}>
        <IconButton onClick={() => handleClickOpen()}>
          <GridDeleteIcon />
        </IconButton>
        <IconButton onClick={() => handleUpdateClick(id)}>
          <EditIcon />
        </IconButton>
      </Box>

      <Dialog open={open} onClose={handleClose} aria-labelledby='draggable-dialog-title'>
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          Do you want delete course {name}
        </DialogTitle>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export default Card
