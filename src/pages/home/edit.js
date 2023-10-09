import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import {fetchCourseList} from "../../store/features/courses/coursesSlice";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Autocomplete} from "@mui/lab";
import {styled} from "@mui/material/styles";

function CloudUploadIcon() {
    return null;
}

const Edit = () => {

  const [courseName, setCourseName] = useState("")
  const [courseId, setId] = useState("")
  const [programId, setProgramId] = useState("")
  const [tutorId, setTutorId] = useState("")
  const [courseDescription, setDescription] = useState("")
  const [imgCover, setImgCover] = useState("")
  const [add, setAdd] = useState(false)

  const [ProgramList, setProgramList] = useState([]);
  const router = useRouter()
  const [nameToIdMap, setNameToIdMap] = useState({});



    useEffect(() => {
        const fetchData = async () => {
            if (router.isReady) {
                try {

                        setId(router.query.id)
                        setTutorId(router.query.tutorid)
                        setCourseName(router.query.courseName)
                        setDescription(router.query.description)
                        setProgramId(router.query.programId)
                        setImgCover(router.query.imgcover)
                        setAdd(router.query.add);


                    // 获取 ProgramList 数据
                    const response = await axios.get('http://api.airobotoedu.com/api/program/get_program_list');
                    const programListData = response.data.data.map(item => item.name);

                    const map = {};
                    response.data.data.forEach(item => {
                        map[item.name] = item.id;
                    });

                    // 设置 ProgramList 数据
                    setProgramList(programListData);

                    // 在控制台中打印 ProgramList 数据
                    console.log(programListData);
                } catch (error) {
                    console.error('获取 ProgramList 数据时出错：', error);
                }
            }
        };

        fetchData();
    }, [router]);

  const handleSave=()=>{
    if(add){
      axios.post('http://api.airobotoedu.com/api/course/admin/add_course',
        {
          "course":
            {
              "id": courseId,
              "name": courseName,
              "programId": nameToIdMap[value],
              "tutorId": tutorId,
              "description": courseDescription,
              "cover": imgCover
            }
        }

      )
        .then((response) => {
          alert('Success')
          setId("")
          setTutorId("")
          setCourseName("")
          setDescription("")
          setProgramId("")
          setImgCover("")
          setOpen(false);
          dispatch(fetchCourseList())


        })
        .catch((error) => {
          alert('Failed')
        });
    }
    else{
      axios.post('http://api.airobotoedu.com/api/course/admin/update_course',
        {
          "course":
            {
              "id": courseId,
              "name": courseName,
              "programId": programId,
              "tutorId": tutorId,
              "description": courseDescription,
              "cover": imgCover
            }
        }
      )
        .then((response) => {
          console.log(response)
          alert("Success")
          setId("")
          setTutorId("")
          setCourseName("")
          setDescription("")
          setProgramId("")
          setImgCover("")
          setOpen(false);
          dispatch(fetchCourseList())


        })
        .catch((error) => {
          console.log(error)
          alert('Failed', error)
        });
    }
  };


  const handleClose=()=>{
    router.push("/home")
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
        width: 1,
    });


    const [value, setValue] = useState(ProgramList[0]);

  const [inputValue, setInputValue] = useState('');

  return (
    <Box>
      <Box display={"flex"}>
        <TextField id="outlined-basic" label="Please enter ID" variant="outlined" sx={{my: 2, mx:4}} value={courseId}
                   onChange={(event) => {
                     setId(event.target.value);
                   }}/>
        <TextField id="outlined-basic" label="Please enter Name" variant="outlined" sx={{my: 2, mx:4}} value={courseName}
                   onChange={(event) => {
                     setCourseName(event.target.value);
                   }}/>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={value}
          onChange={(event, newValue) => {
              setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
          }}
          options={ProgramList}
          sx={{ width: 300, my: 2, mx:4 }}
          renderInput={(params) => <TextField {...params} label={ProgramList[0]} />}
        />
      </Box>
      <Box>
        <TextField id="outlined-basic" label="Please enter Tutor ID" variant="outlined" sx={{my: 2, mx:4}} value={tutorId}
                   onChange={(event) => {
                     setTutorId(event.target.value);
                   }}/>
        <TextField id="outlined-basic" label="Please enter Description" variant="outlined" sx={{my: 2, mx:4}}
                   value={courseDescription}
                   onChange={(event) => {
                     setDescription(event.target.value);
                   }}/>

      </Box>
        <Box sx={{my: 2, mx:4}} display={"flex"} flexDirection={"column"} justifyContent={"start"} alignItems={"start"}>
            <img   height='250' alt='error-illustration' src= {imgCover}/>
            <Button sx={{my:2}} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput type="file" />
            </Button>
        </Box>

      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleSave}>Save</Button>

    </Box>
  )
}

export default Edit
