import { Pagination, Slide } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { forwardRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from 'src/store/apps/user'
import UserCard from './component/UserCard'


const Project = () => {
  const [page, setPage] = useState(1)
  const studentsData = useSelector(state => state.student)
  const dispatch = useDispatch()

  useEffect(() => {
    const currentQuery = `pageNum=${page - 1}&pageSize=6`

    dispatch(getAllUser(currentQuery))
  }, [page])

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
  })

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  return (
    <Box height={'100%'} width={'100%'} display={'flex'} flexDirection={'column'}>
      <Paper sx={{ display: 'flex', py: 4, width: '100%' }}>
        <Box width={'10%'} display={'flex'} justifyContent={'center'}>
          id
        </Box>
        <Box width={'15%'} display={'flex'} justifyContent={'center'}>
          firstName
        </Box>
        <Box width={'15%'} display={'flex'} justifyContent={'center'}>
          lastName
        </Box>
        <Box width={'20%'} display={'flex'} justifyContent={'center'}>
          email
        </Box>
        <Box width={'20%'} display={'flex'} justifyContent={'center'}>
          {' '}
          phoneNumber
        </Box>
      </Paper>
      {studentsData?.studentList.map((item, key) => {
        return (
          <>
            <UserCard
              id={item.id}
              firstName={item.firstName}
              lastName={item.lastName}
              email={item.email}
              phoneNumber={item.phoneNumber}
              role={item.role}
            />
          </>
        )
      })}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2, pt: 5 }}>
        <Pagination count={studentsData?.totalPage} page={page} onChange={handlePageChange} />
      </Box>
    </Box>
  )
}

export default Project
