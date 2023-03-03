import  "./Classlist.css";
import {doc, getDoc, updateDoc, arrayUnion } from "@firebase/firestore";
import { firestore } from "../Backend/firebase";
import ProfilePic from '../Assets/user_logo.jpg'
//import LogoBanner from '../Components/LogoBanner.js'
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom'
import { getUserByEmail } from "../Backend/user";
import { TextField } from "@mui/material";
import ErrorBox from "./Error";

function Classlist() {
  const [students, setStudents] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [searchParams] = useSearchParams();
  const [addStudent, setAddStudent] = useState("");
  const [course, setCourse] = useState();
  const [error, setError] = useState("");

  //Initialize data which comes from the database
  useEffect(() => {
    // Get course title and description
    const courseID = searchParams.get('course_id')
    if (courseID === null) {
      console.log("Course not specified!");
    } else {
      setCourse(doc(firestore, 'courses', courseID))
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

  const handleAdd = (e) => {
    getUserByEmail(addStudent)
    .then((user) => {
      const userId = user.id;
      const userRef = doc(firestore, "students", userId);
      let studentList = students;
      studentList.push({firstName: userRef.data().firstName,
      lastName: userRef.data().lastName, 
      email: userRef.data().email})
      setStudents(studentList);
      updateDoc(userRef, {courses: arrayUnion(course)});
      updateDoc(course, {enrolled: arrayUnion(userId)});
    })
    .catch((error) => {
      setError(error.message)
    })
  }

  return (
    <div className="Registration-page">
      <h1 className="course-name" >{courseData.courseTitle} {courseData.courseId}</h1>
      <h2 className="course-name" >{courseData.description}</h2>
      <div className="classlist-wrapper">
        <h1 className="title" >Course Classlist</h1>
        {error && <ErrorBox text={error} />}
        <TextField
              required
              id="f-name-input"
              label="Student Email to Add"
              variant="outlined"
              placeholder="email@organization.edu"
              value={addStudent}
              onChange={(e) => {
                setAddStudent(e.target.value);
              }}
            />
        <button className="add-button" onClick={handleAdd}>
          Add Students
          </button>
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