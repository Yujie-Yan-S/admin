import { Box, Typography, TextField, Button, FormHelperText, Checkbox, MenuItem, Select } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import axios from 'axios'

const CreateUser = () => {
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
      .post('http://api.airobotoedu.com/api/admin/user/add_user', newUser)
      .then(response => {
        // Handle successful response
        console.log('response data is ', response.data)
      })
      .catch(error => {
        // Handle error
        console.error('An error occurred:', error)
      })

    router.push('/user')
  }

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Box width={'72%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Typography mb={3} mt={3}>
              First Name
            </Typography>
            <TextField
              label='Please enter your first name'
              name='firstName'
              fullWidth={true}
              {...register('firstName', {
                required: 'firstName is required',
                maxLength: { value: 20, message: 'Max is 20' }
              })}
            />
            {errors.firstName && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
            )}

            <Typography mb={3} mt={3}>
              Last Name
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
              Email
            </Typography>
            <TextField
              name='email'
              label='Please enter your email'
              {...register('email', { required: 'password is required' })}
              fullWidth={true}
            />
            {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              password
            </Typography>
            <TextField
              label='Please enter your password'
              {...register('password', { required: 'password is required' })}
              fullWidth={true}
            />
            {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              Phone number{' '}
            </Typography>
            <TextField
              label='Please enter your phone number'
              name='phoneNumber'
              {...register('phoneNumber', { required: 'phone number is required' })}
              fullWidth={true}
            />
            {errors.phoneNumber && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.phoneNumber.message}</FormHelperText>
            )}

            <Typography mb={3} mt={3}>
              Role{' '}
            </Typography>
            <Select name='role' value={watch('role') || ''} {...register('role', { required: 'role is required' })}>
              <MenuItem value='Student'>Student</MenuItem>
              <MenuItem value='Admin'>Admin</MenuItem>
            </Select>

            {errors.role && <FormHelperText sx={{ color: 'error.main' }}>{errors.role.message}</FormHelperText>}

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

export default CreateUser
