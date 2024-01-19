import { Box, Typography, TextField, Button, FormHelperText, Checkbox } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from 'src/store/apps/user'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import {updateLesson} from "../../../store/apps/lesson";
import {updateProject} from "../../../store/apps/project";

const LessonById = () => {
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

  const { lessonList } = useSelector(state => state.lessons)

  const lesson = lessonList.find(item => {
    return item.id === parseInt(id, 10)
  })
  const errorCallback = () => {}

  const handleClose = () => {
    router.push('/lesson')
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
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('videoURL', data.videoURL);
    dispatch(updateLesson(formData))
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
              defaultValue={lesson.name}
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
              defaultValue={lesson.courseId}
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
              defaultValue={lesson.description}
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
              name='videoURL'
              label='Please upload lesson video'
              defaultValue={lesson.videoURL}
              fullWidth={true}
              {...register('videoURL', { required: false})}

            />
            {errors.video && <FormHelperText sx={{ color: 'error.main' }}>{errors.video.message}</FormHelperText>}


            <Box display={'flex'} justifyContent={'start'} mt={8}>
              <Button variant='contained' type='submit' sx={{ width: '40%', mt: '3' }}>
                Submit{' '}
              </Button>
            </Box>

          </form>
        </Box>
      </Box>
    </>
  )
}

export default LessonById
