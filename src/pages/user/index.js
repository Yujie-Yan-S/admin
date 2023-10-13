import { Pagination, Slide } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { forwardRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from 'src/store/apps/user'
import UserCard from './component/UserCard'
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

const User = () => {
  const [page, setPage] = useState(1)
  const userData = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    const currentQuery = `pageNum=${page - 1}&pageSize=6`

    dispatch(getAllUser(currentQuery))
  }, [page])

  console.log('page is', page)
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
  })

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const handleButtonClick = () => {
    router.push({
      pathname: `/user/create`
    })
  }


  return (
    <Box height={'100%'} width={'100%'} display={'flex'} flexDirection={'column'}>
      <IconButton
          color='primary'
          aria-label='Add'
          onClick={handleButtonClick}
          sx={{ justifySelf: 'start', height: 'auto', width: '10px', pb: 4 }}
      >
        <AddIcon />
      </IconButton>
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
        <Box width={'20%'} display={'flex'} justifyContent={'center'}>
          {' '}
          Action
        </Box>
      </Paper>
      {userData?.userList.map((item, key) => {
        return (
          <>
            <UserCard
              key={key}
              id={item.id}
              firstName={item.firstName}
              lastName={item.lastName}
              email={item.email}
              phoneNumber={item.phoneNumber}
              role={item.role}
              setPage={setPage}
            />
          </>
        )
      })}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2, pt: 5 }}>
        <Pagination count={userData?.totalPage} page={page} onChange={handlePageChange} />
      </Box>
    </Box>
  )
}

export default User
