import { Box, Paper, Button, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material'
import { GridDeleteIcon } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import { useRouter } from 'next/router'
import { deleteProject } from 'src/store/apps/project'
import { useState } from 'react'

const ProjectCard = props => {
  const { id, name, description, cover, setPage } = props
  const dispatch = useDispatch()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleDeleteClick = id => {
    dispatch(deleteProject(id))
    setOpen(false)
  }
  const handleUpdateClick = id => {
    router.push(`project/edit/${id}`)
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
      <Box width={'5%'} display={'flex'} justifyContent={'center'}>
        {name}
      </Box>
      <Box width={'30%'} display={'flex'} justifyContent={'center'}>
        {description}
      </Box>
      <Box width={'20%'} display={'flex'} justifyContent={'center'}>
        {cover}
      </Box>

      <Box width={'10%'} display={'flex'} justifyContent={'center'}>
        <IconButton onClick={handleClickOpen}>
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
          <Button onClick={() => handleDeleteClick(id)}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export default ProjectCard
