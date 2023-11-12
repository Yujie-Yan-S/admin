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

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const [filePreview, setFilePreview] = useState(null);


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
    console.log('this is data' , data)
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('cover', selectedFile);
    dispatch(updateProject(formData))
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

            <Box sx={{ my: 4 }} display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'start'}>
              <img height='250' alt='error-illustration' src={filePreview==null?project.cover:filePreview} />
              <Button sx={{ my: 2 }} component='label' variant='contained' startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput type='file' onChange={handleFileChange}/>
              </Button>
            </Box>

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

export default ProjectById
