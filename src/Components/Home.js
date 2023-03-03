import React, { useContext } from "react";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  CircularProgress,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import { getUserCourses, createCourse, removeCourse } from "../Backend/course";
import { getLoggedInUserId, getUserRole } from "../Backend/user";
import { AuthContext } from "../Contexts/AuthContext";
import { TagFaces } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
  Dialog,
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle
} from '@mui/material';


function Homepage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [role, setRole] = useState("");
  const { user } = useContext(AuthContext);

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
    createCourse(newCourseTitle, newCourseId, 3, newCourseDept, 150, 0, newCourseDesc, getLoggedInUserId())
      .then(() => {fetchData();});
    closeCourseDialogue();
  }

  const showAlert = () => {
    alert("Add new Course!");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  async function fetchData() {
      try {
        // Get user role
        const role = await getUserRole();
        setRole(role);
        setSnackbarMessage(`Hello, ${user.displayName}`);
        setOpenSnackbar(true);

        // Get courses
        if (role === "instructor") {
          const courses = await getUserCourses(role);
          setCourses(courses);
          setLoading(false);
        }
        // else if (role === "student") {
        //   const courses = await getStudentCourses();
        //   setCourses(courses);
        //   setLoading(false);
        // } else {
        //   console.error("Could not resolve user role");
        // }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

  useEffect(() => {
    fetchData();
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
        <div className="header-titles">
          <p>My Courses</p>
          {role === "instructor" ? (
            <p style={{ fontStyle: "italic" }}>Instructor View</p>
          ) : (
            <p style={{ fontStyle: "italic" }}>Student View</p>
          )}
        </div>
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
            role === "instructor" ? (
              courses
                .filter(
                  (course) =>
                    course.description && course.courseId && course.courseTitle
                )
                .map((course) => (
                  <div className="course-container">
                    <div className="delete-course-container" onClick={(event) => {
                        const id = event.currentTarget.parentElement.getAttribute('forCourse');
                        removeCourse(id).then(() => {fetchData();});
                     }}>
                       <DeleteIcon fontSize="large" />
                    </div>

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
            )
          ) : (
            <Typography
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {role === "instructor" ? (
                <h2>
                  There are no courses here
                  <br />
                  :)
                </h2>
              ) : (
                <h2>
                  You haven't been added to any courses yet
                  <br />
                  :)
                </h2>
              )}
            </Typography>
          )}
          {role === "instructor" && (
            <div onClick={openCourseDialogue} className="add-course-container">
              <AddCircleIcon fontSize="large" />
            </div>
          )}
        </div>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          style={{
            backgroundColor: "green",
            display: "flex",
            alignItems: "center",
          }}
          message={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TagFaces />
              <span
                style={{
                  marginLeft: "1em",
                  alignSelf: "center",
                }}
              >
                {snackbarMessage}
              </span>
            </div>
          }
        />
      </Snackbar>
    </div>
  );
}

export default Homepage;
