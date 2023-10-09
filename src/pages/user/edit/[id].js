import { Box, Typography, TextField, Button, FormHelperText, Checkbox } from '@mui/material'
import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateStudent, updateUser } from 'src/store/apps/user'
import { useRouter } from 'next/router'

const UserById = () => {
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

  const { userList } = useSelector(state => state.users)

  const user = userList.find(item => {
    return item.id === parseInt(id, 10)
  })
  const errorCallback = () => {}

  const onSubmit = data => {
    console.log('onSubmit triggered')
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
              defaultValue={id}
              {...register('id', {
                required: 'id is required',
                maxLength: { value: 20, message: 'Max is 20' }
              })}
            />
            {errors.id && <FormHelperText sx={{ color: 'error.main' }}>{errors.id.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              First Name
            </Typography>
            <TextField
              label='Please enter your first name'
              name='firstName'
              defaultValue={user.firstName}
              fullWidth={true}
              {...register('firstName', {
                required: 'firstName is required',
                maxLength: { value: 20, message: 'Max is 20' }
              })}
            />
            {errors.firstName && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              Last Name
            </Typography>
            <TextField
              label='Please enter your lastName'
              name='lastName'
              fullWidth={true}
              defaultValue={user.lastName}
              {...register('lastName', {
                required: 'Last name is required',
                maxLength: { value: 20, message: 'Max is 20' }
              })}
            />
            {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              Email
            </Typography>
            <TextField
              label='Please enter your email'
              defaultValue={user.email}
              {...register('email', { required: 'email is required' })}
              fullWidth={true}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              password
            </Typography>
            <TextField label='Please enter your password' {...register('password')} fullWidth={true} />
            {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              Phone number{' '}
            </Typography>
            <TextField
              label='Please enter your phone number'
              {...register('phoneNumber', { required: 'phone number is required' })}
              fullWidth={true}
              defaultValue={user.phoneNumber}
            />
            {errors.phoneNumber && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.phoneNumber.message}</FormHelperText>
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

export default UserById
