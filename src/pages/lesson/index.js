import { Pagination, Slide } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { forwardRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import LessonCard from "../lesson/component/LessonCard";
import {getAllLesson} from "../../store/apps/lesson";

const Lesson = () => {
  const [page, setPage] = useState(1)
  const lessonData = useSelector(state => state.lessons)
  const dispatch = useDispatch()

  const router = useRouter()

  useEffect(() => {
    const currentQuery = `pageNum=${page - 1}&pageSize=6`

    dispatch(getAllLesson(currentQuery))
  }, [page])



  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const handleButtonClick = () => {
    router.push({
      pathname: `/lesson/create`
    })
  }

  return (
    <Box height={'100%'} width={'100%'} display={'flex'} flexDirection={'column'}>

      <Button variant="contained" onClick={handleButtonClick}  sx={{fontSize:'12px',fontWeight:'500',justifySelf: 'start', height: 'auto', width: '160px' ,mb:4}}>Create Lesson</Button>

      <Paper sx={{ display: 'flex', py: 4, width: '100%'  }} square>
        <Box width={'15%'} display={'flex'} justifyContent={'center'}>
          Name
        </Box>
        <Box width={'30%'} display={'flex'} justifyContent={'center'}>
          Description
        </Box>
        <Box width={'20%'} display={'flex'} justifyContent={'center'}>
          Video URL
        </Box>
        <Box width={'35%'} display={'flex'} justifyContent={'center'}>
          {' '}
          Action
        </Box>
      </Paper>

      {lessonData?.lessonList.map((item, key) => {
        return (
          <>
            <LessonCard
              key={key}
              id={item.id}
              name={item.name}
              description={item.description}
              videoURL={item.videoURL}
              setPage={setPage}
            />
          </>
        )
      })}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2, pt: 5 }}>
        <Pagination count={lessonData?.totalPage} page={page} onChange={handlePageChange} />
      </Box>
    </Box>
  )
}

export default Lesson
