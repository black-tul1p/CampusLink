import React from "react";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { CircularProgress, Typography } from "@mui/material";
import { getInstructorCourses } from "../Backend/instructor";
import { getUserRole } from "../Backend/user";

function Homepage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  const showAlert = () => {
    alert("Add new Course!");
  };

  useEffect(() => {
    // Get user role
    getUserRole()
      .then((res) => {
        setRole(res);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(role);

    // if (role === "instructor") {
    //   getInstructorCourses()
    //     .then((res) => {
    //       setCourses(res);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //       setLoading(false);
    //     });
    //   } else if (role === "student") {
    //     getStudentCourses()
    //     .then((res) => {
    //       setCourses(res);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //       setLoading(false);
    //     });
    //   } else {
    //     console.error("Could not resolve user role");
    //   }
    // REMOVE WHEN DONE
    setLoading(false);
  }, [courses]);

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
    </div>
  );
}

export default Homepage;
