import { Box, Typography, TextField, Button, FormHelperText, Checkbox } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Autocomplete } from '@mui/lab'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import { updateCourse } from '../../../store/apps/course'

const CourseById = () => {
  const dispatch = useDispatch()
  const { courseList } = useSelector(state => state.course)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm()
  const router = useRouter()
  const { id } = router.query
  const [formError, setFormError] = useState({})

  console.log('course data is', courseList)

  const course = courseList.find(item => {
    return item.id === parseInt(id, 10)
  })

  function CloudUploadIcon() {
    return null
  }

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

  const errorCallback = () => {}

  const onSubmit = data => {
    console.log('data is ', data)


    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', data.name);
    formData.append('programId', nameToIdMap[value1]);
    formData.append('tutorId', data.tutorid);
    formData.append('description', data.description);
    formData.append('cover', selectedFile);


    dispatch(updateCourse(formData))
    router.push('/home')
  }

  const [ProgramList, setProgramList] = useState([])

  const [inputValue, setInputValue] = useState('')

  const [nameToIdMap, setNameToIdMap] = useState({})

  const [value1, setValue1] = useState(ProgramList[0])

  const handleClose = () => {
    router.push('/home')
  }

  const [filePreview, setFilePreview] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        try {
          // 获取 ProgramList 数据
          const response = await axios.get('http://api.airobotoedu.com/api/program/get_program_list')
          const programListData = response.data.data.map(item => item.name)

          const map = {}
          response.data.data.forEach(item => {
            map[item.name] = item.id
          })

          setNameToIdMap(map)

          // 设置 ProgramList 数据
          setProgramList(programListData)

          // 在控制台中打印 ProgramList 数据
          console.log(programListData)
        } catch (error) {
          console.error('获取 ProgramList 数据时出错：', error)
        }
      }
    }

    fetchData()
  }, [router])

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
              defaultValue={course.name}
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
            {/*<TextField*/}
            {/*  label='Please enter your lastName'*/}
            {/*  name='programid'*/}
            {/*  fullWidth={true}*/}
            {/*  defaultValue={course.programId}*/}
            {/*  {...register('programid', {*/}
            {/*    required: 'programid is required',*/}
            {/*    maxLength: { value: 20, message: 'Max is 20' }*/}
            {/*  })}*/}
            {/*/>*/}
            {/*{errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}*/}

            <Autocomplete
              disablePortal
              id='combo-box-demo'
              value={value1}
              onChange={(event, newValue) => {
                setValue1(newValue)
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
              }}
              options={ProgramList}
              sx={{}}
              renderInput={params => <TextField {...params} label={ProgramList[0]} />}
            />

            <Typography mb={3} mt={3}>
              tutorid
            </Typography>
            <TextField
              label='Please enter course tutorid'
              defaultValue={course.tutorId}
              {...register('tutorid', { required: 'email is required' })}
              fullWidth={true}
            />
            {errors.tutorid && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}

            <Typography mb={3} mt={3}>
              description
            </Typography>
            <TextField
              label='Please enter course description'
              defaultValue={course.description}
              {...register('description')}
              fullWidth={true}
            />
            {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}

            <Box sx={{ my: 4 }} display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'start'}>
              <img height='250' alt='error-illustration' src={filePreview==null?course.cover:filePreview} />
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

export default CourseById
