import { Pagination, Slide } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { forwardRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from 'src/store/apps/user'
import UserCard from './component/UserCard'
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";

const User = () => {
  const [page, setPage] = useState(1)
  const userData = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    const currentQuery = `pageNum=${page - 1}&pageSize=6`

    dispatch(getAllUser(currentQuery))
  }, [page])

  console.log('page is', page)

  const router = useRouter()
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


      <Button variant="contained" onClick={handleButtonClick}    sx={{fontSize:'12px',fontWeight:'500',justifySelf: 'start', height: 'auto', width: '150px' ,mb:4}}>Create User</Button>

      <Paper sx={{ display: 'flex', py: 4, width: '100%'  }} square>

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
