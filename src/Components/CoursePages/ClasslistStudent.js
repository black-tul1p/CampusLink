import React from "react";
import "../Classlist.css";
//import Classlist from '../Classlist';
import { doc, getDoc } from "@firebase/firestore";
import { firestore } from "../../Backend/firebase";
import ProfilePic from "../../Assets/user_logo.jpg";
//import LogoBanner from '../Components/LogoBanner.js'
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

function ClasslistStudent() {
  const [students, setStudents] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [searchParams] = useSearchParams();

  //Initialize data which comes from the database
  useEffect(() => {
    // Get course title and description
    const location = useLocation();
    const courseID = location.state?.courseId;
    // const courseID = "iR8l666mgOfQLNUXjjLO"
    if (courseID === null) {
      console.log("Course not specified!");
    } else {
      const course = doc(firestore, "courses", courseID);
      getDoc(course).then((courseDoc) => {
        if (courseDoc.exists()) {
          setCourseData(courseDoc.data());

          //Add enrolled students to classlist
          const enrolled = courseDoc.data().enrolledStudents;
          Promise.all(enrolled.map(getDoc)).then((stdnts) =>
            setStudents(stdnts.map((s) => s.data()))
          );
        } else {
          console.log("Course not found!");
        }
      });
    }
  }, [searchParams]);

  return (
    <div className="Registration-page">
      <div className="classlist-wrapper">
        <h1 className="title">Course Classlist</h1>

        <table className="classlist">
          <tbody>
            <tr>
              <th className="profile-pic-column"></th>
              <th>Name</th>
              <th>Email</th>
            </tr>

            {students.map((student) => (
              <tr>
                <td className="profile-pic-column">
                  <img
                    className="profile-pic"
                    src={ProfilePic}
                    alt="profile"
                  ></img>
                </td>
                <td>
                  {student.lastName}, {student.firstName}
                </td>
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
      <td>
        {props.lastName}, {props.firstName}
      </td>
      <td>{props.email}</td>
    </tr>
  );
}

StudentInfoRow.defaultProps = {
  firstName: "Firstname",
  lastName: "Lastname",
  email: "example@gmail.com",
};

export default ClasslistStudent;
