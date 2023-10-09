import { Box, Typography, TextField, Button, FormHelperText, Checkbox } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from 'src/store/apps/user'

const CourseById = ({ id }) => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.users)
  console.log('user data is', userData)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm()

  const [formError, setFormError] = useState({})

  const errorCallback = () => {}

  const onSubmit = data => {
    // console.log(data)
    dispatch(updateUser({ user: data }))
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
              defaultValue='8'
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
              label='Please enter your first name'
              name='name'
              fullWidth={true}
              {...register('name', {
                required: 'name is required',
                maxLength: { value: 20, message: 'Max is 20' }
              })}
            />
            {errors.firstName && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              programid
            </Typography>
            <TextField
              label='Please enter your lastName'
              name='programid'
              fullWidth={true}
              {...register('programid', {
                required: 'programid is required',
                maxLength: { value: 20, message: 'Max is 20' }
              })}
            />
            {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              tutorid
            </Typography>
            <TextField
              label='Please enter course tutorid'
              defaultValue='hello'
              {...register('tutorid', { required: 'email is required' })}
              fullWidth={true}
            />
            {errors.tutorid && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              description
            </Typography>
            <TextField
              label='Please enter course description'
              defaultValue='hello1'
              {...register('description')}
              fullWidth={true}
            />
            {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}

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

export default CourseById
