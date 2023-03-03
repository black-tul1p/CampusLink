import React, { useContext } from "react";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  CircularProgress,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import { getUserCourses } from "../Backend/course";
import { getUserRole } from "../Backend/user";
import { AuthContext } from "../Contexts/AuthContext";
import { TagFaces } from "@mui/icons-material";

function Homepage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [role, setRole] = useState("");
  const { user } = useContext(AuthContext);

  const showAlert = () => {
    alert("Add new Course!");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Get user role
        const role = await getUserRole();
        setRole(role);
        setSnackbarMessage(`Hello, ${user.displayName}`);
        setOpenSnackbar(true);

        // Get courses
        const courses = await getUserCourses(role);
        if (courses.length === 0) {
          setCourses([]);
        } else {
          setCourses(courses);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="homepage-student">
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
            <div onClick={showAlert} className="add-course-container">
              <AddCircleIcon fontSize="large" />
            </div>
          )}
        </div>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        style={{ marginLeft: "4em" }}
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

export default Homepage;