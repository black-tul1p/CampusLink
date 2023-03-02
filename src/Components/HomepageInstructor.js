import React from "react";
import "./HomepageStudent";
import { getAllCourses } from "../Backend/course";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { CircularProgress, Snackbar, SnackbarContent } from "@mui/material";
import { auth } from "../Backend/firebase";
import { CheckCircle } from "@mui/icons-material";

function HomepageInstructor() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const showAlert = () => {
    alert("Add new Course!");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    getAllCourses()
      .then((res) => {
        setCourses(res);
        setLoading(false);
        setSnackbarMessage(`Welcome, ${auth.currentUser.displayName}`);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      })
      .finally(() => {
        setOpenSnackbar(true);
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
          <div onClick={showAlert} className="add-course-container">
            <AddCircleIcon fontSize="large" />
          </div>
        </div>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
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
              <CheckCircle />
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

export default HomepageInstructor;
