import { Pagination, Slide } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { forwardRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProjectCard from './component/ProjectCard'
import { getAllProject } from 'src/store/apps/project'
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";

const Project = () => {
  const [page, setPage] = useState(1)
  const { projectList, totalPage } = useSelector(state => state.projects)
  const dispatch = useDispatch()


  const router = useRouter()

  useEffect(() => {
    const currentQuery = `pageNum=${page - 1}&pageSize=6`

    dispatch(getAllProject(currentQuery))
  }, [page])

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
  })

  console.log('projectList is ', projectList)

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const handleButtonClick = () => {
    router.push({
      pathname: `/project/create`
    })
  }


  return (
    <Box height={'100%'} width={'100%'} display={'flex'} flexDirection={'column'}>

      <Button variant="contained" onClick={handleButtonClick}    sx={{fontSize:'12px',fontWeight:'500',justifySelf: 'start', height: 'auto', width: '160px' ,mb:4}}>Create Project</Button>

      <Paper sx={{ display: 'flex', py: 4, width: '100%'  }} square>
        <Box width={'15%'} display={'flex'} justifyContent={'center'}>
          Name
        </Box>
        <Box width={'30%'} display={'flex'} justifyContent={'center'}>
          Descrition
        </Box>
        <Box width={'20%'} display={'flex'} justifyContent={'center'}>
          Cover
        </Box>
        <Box width={'35%'} display={'flex'} justifyContent={'center'}>
          {' '}
          Action
        </Box>
      </Paper>
      {projectList.map((item, key) => {
        return (
          <>
            <ProjectCard
              key={key}
              id={item.id}
              name={item.name}
              description={item.description}
              cover={item.cover}
              setPage={setPage}
            />
          </>
        )
      })}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2, pt: 5 }}>
        <Pagination count={totalPage} page={page} onChange={handlePageChange} />
      </Box>
    </Box>
  )
}

export default Project
