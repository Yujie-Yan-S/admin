// ** MUI Imports

import { Pagination, Slide } from '@mui/material'
import Card from './components/course_card'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { forwardRef, useEffect, useState } from 'react'
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
        <Box width={'30%'} display={'flex'} justifyContent={'center'}>
          {' '}
          description
        </Box>
        <Box width={'20%'} display={'flex'} justifyContent={'center'}>
          Action
        </Box>
      </Paper>
      {courseData.courseList.map((item, key) => {
        return (
          <Card
            key={key}
            id={item.id}
            name={item.name}
            programid={item.programId}
            tutorid={item.tutorId}
            description={item.description}
            imgCoverUrl={item.imgCoverUrl}
          ></Card>
        )
      })}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2, pt: 5 }}>
        <Pagination count={courseData.totalPage} page={page} onChange={handleChange} />
      </Box>
    </Box>
  )
}

export default Home
