import { Box, Typography, TextField, Button, FormHelperText, Checkbox, MenuItem, Select } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import axios from 'axios'
import {addNewLesson, updateLesson} from "../../../store/apps/lesson";

const CreateLesson = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const [formError, setFormError] = useState({})

  const onSubmit = data => {
    //TODO: video
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    dispatch(addNewLesson(formData))
    router.push('/lesson')
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
              label='Please enter lesson name'
              name='name'
              fullWidth={true}
              {...register('name', {
                required: 'Name is required',
                maxLength: { value: 100, message: 'Max is 100' }
              })}
            />
            {errors.name && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>
            )}

            <Typography mb={3} mt={3}>
              CourseId
            </Typography>
            <TextField
              label='Please enter lesson CourseId'
              name='courseId'
              fullWidth={true}
              type='number'
              {...register('courseId', {
                required: false,
                maxLength: { value: 100, message: 'Max is 100' }
              })}
            />
            {errors.courseId && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.courseId.message}</FormHelperText>
            )}

            <Typography mb={3} mt={3}>
              Description
            </Typography>
            <TextField
              label='Please enter lesson description'
              name='description'
              fullWidth={true}
              {...register('description', {
                required: 'Lesson description is required',
                maxLength: { value: 500, message: 'Max is 500' }
              })}
            />
            {errors.description && <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              video
            </Typography>
            <TextField
              name='video'
              label='Please upload lesson video'
              {...register('video', { required: false})}
              fullWidth={true}
            />
            {errors.video && <FormHelperText sx={{ color: 'error.main' }}>{errors.video.message}</FormHelperText>}


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

export default CreateLesson
