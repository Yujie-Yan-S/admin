import { Box, Typography, TextField, Button, FormHelperText, Checkbox } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { updateProject } from 'src/store/apps/project'
import styled from '@emotion/styled'

const ProjectById = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm()

  const [formError, setFormError] = useState({})
  const router = useRouter()
  const { id } = router.query

  const { projectList } = useSelector(state => state.projects)

  const project = projectList.find(item => {
    return item.id === parseInt(id, 10)
  })
  const errorCallback = () => {}

  const handleClose = () => {
    router.push('/project')
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })

  function CloudUploadIcon() {
    return null
  }

  const onSubmit = data => {
    dispatch(updateProject({ project: { ...data, id: id } }))
    router.push('/project')
  }

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Box width={'72%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            {/* <Typography mb={3} mt={3}>
              id
            </Typography>
            <TextField
              label='Please enter your first name'
              name='id'
              fullWidth={true}
              defaultValue={id}
              {...register('id', {
                required: 'id is required',
                maxLength: { value: 20, message: 'Max is 20' }
              })}
            />
            {errors.id && <FormHelperText sx={{ color: 'error.main' }}>{errors.id.message}</FormHelperText>} */}

            <Typography mb={3} mt={3}>
              Name
            </Typography>
            <TextField
              label='Please enter project name'
              name='name'
              fullWidth={true}
              defaultValue={project.name}
              {...register('name', {
                required: 'name is required',
                maxLength: { value: 20, message: 'Max is 20' }
              })}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              description
            </Typography>
            <TextField
              label='Please enter your description'
              name='description'
              defaultValue={project.description}
              fullWidth={true}
              {...register('description', {
                required: 'Description is required',
                maxLength: { value: 20, message: 'Max is 20' }
              })}
            />
            {errors.description && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>
            )}

            <Typography mb={3} mt={3}>
              Cover
            </Typography>
            <TextField
              label='Please upload your cover img'
              name='cover'
              defaultValue={project.cover}
              {...register('cover', { required: 'cover img is required' })}
              fullWidth={true}
            />
            {errors.cover && <FormHelperText sx={{ color: 'error.main' }}>{errors.cover.message}</FormHelperText>}

            <Box sx={{ my: 4 }} display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'start'}>
              <img height='250' alt='error-illustration' src={project.cover} />
              <Button sx={{ my: 2 }} component='label' variant='contained' startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput type='file' />
              </Button>
            </Box>

            <Box display={'flex'} justifyContent={'space-evenly'} mt={8}>
              <Button variant='contained' type='submit' sx={{ width: '40%', mt: '3' }}>
                Submit{' '}
              </Button>
              <Button variant='contained' onClick={handleClose} sx={{ width: '40%', mt: '3' }}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default ProjectById
