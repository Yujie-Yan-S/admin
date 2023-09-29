// ** MUI Imports

import { Dialog, DialogActions, DialogContent, DialogTitle, Pagination, PaginationItem, Slide } from '@mui/material'
import Card from './components/course_card'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { forwardRef, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { fetchCourseBySearch } from 'src/store/apps/course'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const [page, setPage] = useState(1)
  const courseData = useSelector(state => state.course)
  const dispatch = useDispatch()

  useEffect(() => {
    const currentQuery = `pageNum=${page - 1}&pageSize=6`

    dispatch(fetchCourseBySearch(currentQuery))
  }, [page])

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
  })

  const handleChange = (event, value) => {
    setPage(value)
  }

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    console.log('dialog is opened')
    setOpen(true)
  }

  const handleClose = () => {
    console.log('dialog is closed')
    setOpen(false)
  }

  return (
    <Box height={'100%'} width={'100%'} display={'flex'} flexDirection={'column'}>
      <Paper sx={{ display: 'flex', py: 4, width: '100%' }}>
        <Box width={'10%'} display={'flex'} justifyContent={'center'}>
          id
        </Box>
        <Box width={'20%'} display={'flex'} justifyContent={'center'}>
          name
        </Box>
        <Box width={'20%'} display={'flex'} justifyContent={'center'}>
          programid
        </Box>
        <Box width={'10%'} display={'flex'} justifyContent={'center'}>
          tutorid
        </Box>
        <Box width={'10%'} display={'flex'} justifyContent={'center'}>
          {' '}
          description
        </Box>
        <Box width={'30%'} display={'flex'} justifyContent={'center'}>
          imgCoverUrl
        </Box>
      </Paper>
      {courseData.courseListFromSearch.map((item, key) => {
        return (
          <Card
            onclick={handleClickOpen}
            key={key}
            id={item.id}
            name={item.name}
            programid={item.programid}
            tutorid={item.tutorid}
            description={item.description}
            imgCoverUrl={item.imgCoverUrl}
          ></Card>
        )
      })}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'Course detail information'}</DialogTitle>

        <DialogContent sx={{ display: 'flex' }}>
          <Box>
            <TextField id='outlined-basic' label='Please enter ID' variant='outlined' sx={{ py: 2 }} />
            <TextField id='outlined-basic' label='Please enter Name' variant='outlined' sx={{ py: 2 }} />
            <TextField id='outlined-basic' label='Please enter Program ID' variant='outlined' sx={{ py: 2 }} />
          </Box>
          <Box>
            <TextField id='outlined-basic' label='Please enter Tutor ID' variant='outlined' sx={{ py: 2 }} />
            <TextField id='outlined-basic' label='Please enter Description' variant='outlined' sx={{ py: 2 }} />
            <TextField id='outlined-basic' label='Please enter ImgCoverUrl' variant='outlined' sx={{ py: 2 }} />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2, pt: 5 }}>
        <Pagination count={courseData.totalPage} page={page} onChange={handleChange} />
      </Box>
    </Box>
  )
}

export default Home
