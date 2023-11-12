import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { Button, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material'
import { GridDeleteIcon } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import { deleteUser } from 'src/store/apps/user'
import EditIcon from '@mui/icons-material/Edit'
import { useRouter } from 'next/router'
import { useState } from 'react'

const UserCard = props => {
  const { id, firstName, lastName, email, phoneNumber, role, setPage } = props
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
    dispatch(deleteUser(id))
    setOpen(false)
  }

  const handleUpdateClick = id => {
    console.log('update triggered')
    router.push(`user/edit/${id}`)
  }

  return (
    <Paper
      onClick={onclick}
      sx={{ display: 'flex', py: 4, '&:hover': { bgcolor: '#f7f7f8' } }}
      square
      variant='outlined'
    >

      <Box width={'15%'} display={'flex'} justifyContent={'center'}>
        {firstName}
      </Box>
      <Box width={'15%'} display={'flex'} justifyContent={'center'}>
        {lastName}
      </Box>
      <Box width={'20%'} display={'flex'} justifyContent={'center'}>
        {email}
      </Box>
      <Box width={'20%'} display={'flex'} justifyContent={'center'}>
        {phoneNumber}
      </Box>

      <Box width={'20%'} display={'flex'} justifyContent={'center'}>
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

export default UserCard
