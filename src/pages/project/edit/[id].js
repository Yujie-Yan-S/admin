import { Box, Typography, TextField, Button, FormHelperText, Checkbox } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from 'src/store/apps/user'
import { useRouter } from 'next/router'
import { updateProject } from 'src/store/apps/project'

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

  const onSubmit = data => {
    console.log('onSubmit triggered')
    dispatch(updateProject({ project: data }))
  }

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Box width={'72%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Typography mb={3} mt={3}>
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
            {errors.id && <FormHelperText sx={{ color: 'error.main' }}>{errors.id.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              Name
            </Typography>
            <TextField
              label='Please enter project name'
              name='name'
              fullWidth={true}
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
              {...register('cover', { required: 'cover img is required' })}
              fullWidth={true}
            />
            {errors.cover && <FormHelperText sx={{ color: 'error.main' }}>{errors.cover.message}</FormHelperText>}

            <Box display={'flex'} justifyContent={'center'} mt={8}>
              <Button variant='contained' type='submit' sx={{ width: '70%', mt: '3' }}>
                Submit{' '}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default ProjectById
