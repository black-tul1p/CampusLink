import React from "react";
import "./HomepageStudent";
import { getAllCourses, createCourse } from "../Backend/course";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { CircularProgress } from "@mui/material";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
  Dialog,
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle
} from '@mui/material';

function HomepageInstructor() {
   
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = React.useState(false);
  const [newCourseTitle,setNewCourseTitle] = React.useState("");
  const [newCourseId, setNewCourseId] = React.useState("");
  const [newCourseDept, setNewCourseDept] = React.useState("");
  const [newCourseDesc, setNewCourseDesc] = React.useState("");
  const openCourseDialogue = () => {
    setOpen(true);
  };
  const closeCourseDialogue = () => {
    setOpen(false);
  };

  const submitCourseDialogue = () => {
    createCourse(newCourseTitle, newCourseId, 3, newCourseDept, 150, 0, newCourseDesc);
    closeCourseDialogue();
  }

  useEffect(() => {
    getAllCourses()
      .then((res) => {
        setCourses(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="homepage-student">
      <Dialog class="create-course-dialogue" open={open} onClose={closeCourseDialogue} sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "500px",  // Set your width here
          },
        },
      }}>
        <DialogTitle>Create New Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
              required
              label="Course Title"
              sx={{ margin : '5px', width: "50%", 
                    "& .MuiInputBase-input": { color: 'black !important' },
                    "& .MuiInputLabel-root": { color: '#000A !important' } }}
              variant="standard"
              onChange={e => {setNewCourseTitle(e.target.value);}}
          />
          <TextField
              required
              label="Course ID"
              sx={{ margin : '5px', width: "25%",
                    "& .MuiInputBase-input": { color: 'black !important' },
                    "& .MuiInputLabel-root": { color: '#000A !important' } }}
              variant="standard"
              onChange={e => {setNewCourseId(e.target.value);}}
          />
          <TextField
              required
              label="Department"
              sx={{ margin : '5px',
                    "& .MuiInputBase-input": { color: 'black !important' },
                    "& .MuiInputLabel-root": { color: '#000A !important' } }}
              variant="standard"
              fullWidth
              onChange={e => {setNewCourseDept(e.target.value);}}
          />
          <TextField
              required
              label="Description"
              sx={{ margin : '5px',
                    "& .MuiInputBase-input": { color: 'black !important' },
                    "& .MuiInputLabel-root": { color: '#000A !important' } }}
              variant="standard"
              minRows="2"
              fullWidth
              multiline
              onChange={e => {setNewCourseDesc(e.target.value);}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCourseDialogue}>Cancel</Button>
          <Button onClick={submitCourseDialogue}>Create</Button>
        </DialogActions>
      </Dialog>

      <div className="header-container">
        <p>My Courses</p>
        <div className="divider"></div>
      </div>
      {loading ? (
        <div
          style={{
            flexGrow: 1,
            marginTop: "30vh",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div className="homepage-student-container">
          {courses.length > 0 ? (
            courses
              .filter(
                (course) =>
                  course.description && course.courseId && course.courseTitle
              )
              .map((course) => (
                <div className="course-container">
                  <div className="course-container-top">
                    <h3>
                      {course.courseTitle} {course.courseId} :
                    </h3>
                    <h3>{course.description}</h3>
                  </div>
                  <div className="course-container-bottom"></div>
                </div>
              ))
          ) : (
            <h1>Username is not teaching any courses!</h1>
          )}
          <div onClick={openCourseDialogue} className="add-course-container">
            <AddCircleIcon fontSize="large" />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomepageInstructor;
