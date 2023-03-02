import React from "react";
import "./HomepageStudent";
import { getAllCourses } from "../Backend/course";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getInstructorCourses } from "../Backend/instructor";

function HomepageInstructor() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const showAlert = () => {
    alert("Add new Course!");
  };

  useEffect(() => {
    getInstructorCourses()
      .then((res) => {
        setCourses(res);
        setLoading(false);
        //console.log(res.length)
        
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="homepage-student">

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
        
          {courses.length > -1 ? (
            courses
              .filter(
                (course) =>
                  course.description && course.courseId && course.courseTitle
              )
              .map((course) => (
                <div className="course-container"
                  onClick={() => {
                    navigate("/Announcements");
                  }}
                >
                  <div className="course-container-top">
                    <div className="title-container">
                      <h3>{course.courseTitle} {course.courseId} :</h3>
                      <Button variant="outlined" style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
                            <MoreVertIcon />
                      </Button>
                    </div>
                    <h3>{course.description}</h3>
                  </div>
                  <div className="course-container-bottom"></div>
                </div>
              ))
          ) : (
            <h1>Username is not teaching any courses!</h1>
          )}
          <div onClick={showAlert} className="add-course-container">
            <AddCircleIcon fontSize="large" />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomepageInstructor;