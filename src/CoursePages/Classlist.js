import "./Classlist.css";
import {doc, getDoc} from "@firebase/firestore";
import { firestore } from "../Backend/firebase";
import ProfilePic from '../images/default_profile_picture.png'
//import LogoBanner from '../Components/LogoBanner.js'
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom'

function Classlist() {
  const [students, setStudents] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [searchParams] = useSearchParams();

  //Initialize data which comes from the database
  useEffect(() => {
    // Get course title and description
    const courseID = searchParams.get('course_id')
    if (courseID === null) {
      console.log("Course not specified!");
    } else {
      const course = doc(firestore, 'courses', courseID)
      getDoc(course).then((courseDoc) => {
        if (courseDoc.exists()) {
          setCourseData(courseDoc.data());

          //Add enrolled students to classlist
          const enrolled = courseDoc.data().enrolledStudents;
          Promise.all(enrolled.map(getDoc)).then(
            stdnts => setStudents(stdnts.map(s => s.data()))
          ); 
        } else {
          console.log("Course not found!");
        }
      });
    }
  }, [searchParams]);

  return (
    <div className="Registration-page">
      <h1 className="course-name" >{courseData.courseTitle} {courseData.courseId}</h1>
      <h2 className="course-name" >{courseData.description}</h2>
      <div className="classlist-wrapper">
        <h1 className="title" >Course Classlist</h1>

        <button className="add-button" onClick={() => {
          //Append placeholder student
          /*
          setStudents([
            ...students, {
             firstName: "Firstname",
             lastName: "Lastname",
             email: "example@gmail.com"
            }
          ]);*/
        }}>Add Students</button>

        <table className="classlist">
          <tbody>
            <tr>
              <th className="profile-pic-column"></th>
              <th>Name</th>
              <th>Email</th>
            </tr>

            {students.map(student => (
              <tr>
                <td className="profile-pic-column">
                  <img className="profile-pic" src={ProfilePic} alt="profile"></img>
                </td>
                <td>{student.lastName}, {student.firstName}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p id="student-count-label">Total Students: {students.length}</p>
      </div>
    </div>
  );
}

function StudentInfoRow(props) {
  return (
    <tr>
      <td className="profile-pic"></td>
      <td>{props.lastName}, {props.firstName}</td>
      <td>{props.email}</td>
    </tr>
  );
}

StudentInfoRow.defaultProps = {
  firstName: "Firstname",
  lastName: "Lastname",
  email: "example@gmail.com",
}

export default Classlist;