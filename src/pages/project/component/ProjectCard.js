import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import { GridDeleteIcon } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import { deleteUser } from 'src/store/apps/user'
import EditIcon from '@mui/icons-material/Edit'
import { useRouter } from 'next/router'
import { deleteProject } from 'src/store/apps/project'

const ProjectCard = props => {
  const { id, name, description, cover, setPage } = props
  const dispatch = useDispatch()
  const router = useRouter()

  const handleDeleteClick = id => {
    setPage(1)
    dispatch(deleteProject(id))
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
        <IconButton onClick={() => handleDeleteClick(id)}>
          <GridDeleteIcon />
        </IconButton>
        <IconButton onClick={() => handleUpdateClick(id)}>
          <EditIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default ProjectCard
