import React from "react";
import "../App.css";
import { getAllCourses } from "../Backend/course";
import { useState, useEffect } from "react";

function HomepageStudent(props) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div>
      <div className="header-container">
        <p>My Courses</p>
        <div className="divider"></div>
      </div>
      <div className="homepage-student-container">
        {loading ? null : courses.length > 0 ? (
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
          <h1>Username is not registered for any courses!</h1>
        )}
      </div>
    </div>
  );
}

export default HomepageStudent;
