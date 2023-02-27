import React from 'react'
import './Homepage_Student.css'
import {getAllCourses} from '../Backend/course';

function Homepage_Student() {
  return (
    <div className='Homepage_Student'>
      
      <div className='Homepage-student-container'>
        <div className='course-container'>
          <div className='course-container-top'>
            <h1 style={{ color: "white" }}>course 1</h1>
          </div>
          <div className='course-container-bottom'>
          </div>
        </div>
        <div className='course-container'>
          <div className='course-container-top'>
            <h1 style={{ color: "white" }}>course 2</h1>
          </div>
          <div className='course-container-bottom'>
          </div>
        </div>
        <div className='course-container'>
          <div className='course-container-top'>
            <h1 style={{ color: "white" }}>course 3</h1>
          </div>
          <div className='course-container-bottom'>
          </div>
        </div>
        <div className='course-container'>
          <div className='course-container-top'>
            <h1 style={{ color: "white" }}>course 4</h1>
          </div>
          <div className='course-container-bottom'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage_Student
