import { Box, Typography, TextField, Button, FormHelperText, Checkbox, MenuItem, Select } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { addNewStudent } from 'src/store/apps/user'
import axios from 'axios'

const CreateCourse = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const [formError, setFormError] = useState({})

  const errorCallback = () => {}

  const onSubmit = data => {
    const newUser = { user: data }
    axios
      .post('http://api.airobotoedu.com/api/user/admin/add_user', newUser)
      .then(response => {
        // Handle successful response
        console.log('response data is ', response.data)
      })
      .catch(error => {
        // Handle error
        console.error('An error occurred:', error)
      })

    console.log(data)
    router.push('/user')
  }

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Box width={'72%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Typography mb={3} mt={3}>
              Name
            </Typography>
            <TextField
              label='Please enter your first name'
              name='name'
              fullWidth={true}
              {...register('name', {
                required: 'course name is required',
                maxLength: { value: 20, message: 'Max is 20' }
              })}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              programid
            </Typography>
            <TextField
              label='Please enter your lastName'
              name='lastName'
              fullWidth={true}
              {...register('lastName', {
                required: 'Last name is required',
                maxLength: { value: 20, message: 'Max is 20' }
              })}
            />
            {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              Description
            </Typography>
            <TextField
              name='description'
              label='Please enter coure description'
              {...register('email', { required: 'description is required' })}
              fullWidth={true}
            />
            {errors.description && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
            )}

            <Box display={'flex'} width={'100%'} mb={4}></Box>
            {formError.error && <FormHelperText sx={{ color: 'error.main' }}>{codeError.error}</FormHelperText>}

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

export default CreateCourse