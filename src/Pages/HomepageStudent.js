import React from 'react'
import './HomepageStudent.css'
import { getAllCourses } from '../Backend/course'
import { useState, useEffect } from 'react'

function HomepageStudent() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect (() => {
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
    <div className='homepage-student'>
      <div className='homepage-student-container'>
        {loading ? null : courses.length > 0 ? (
          courses.filter((course) => course.description && course.courseId && course.courseTitle)
          .map((course) => (
            <div className='course-container'>
              <div className='course-container-top'>
                <p style={{ color: "rgb(239, 231, 231)" }}>{course.courseTitle} {course.courseId} :</p>
                <p style={{ color: "rgb(239, 231, 231)" }}>{course.description}</p>
              </div>
              <div className='course-container-bottom'></div>
            </div>
          ))
        ) : (<h1>Username is not registered for any courses!</h1>
        )}
      </div>
    </div>
  )
}

export default HomepageStudent
