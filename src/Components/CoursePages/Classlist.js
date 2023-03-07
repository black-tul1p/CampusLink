import "../../Styles/Classlist.css";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  collection,
} from "@firebase/firestore";
import { firestore } from "../../Backend/firebase";
import ProfilePic from "../../images/default_profile_picture.png";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CourseNavBar from "../CourseNavBar";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function Classlist() {
  const [students, setStudents] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [courseDocId, setCourseDocId] = useState("");
  const [mailingList, setMailingList] = useState("");
  const location = useLocation();

  const updateClassList = async (courseID) => {
    if (courseID === undefined) {
      console.log("Course not specified!");
    } else {
      console.log(courseID);
      const course = doc(firestore, "courses", courseID);
      try {
        const courseDoc = await getDoc(course);
        if (courseDoc.exists()) {
          setCourseData(courseDoc.data());

          //Add enrolled students to classlist
          const enrolled = courseDoc.data().enrolledStudents;
          const stdnts = await Promise.all(enrolled.map(getDoc));
          setStudents(stdnts);
          setMailingList(
            "mailto:" + stdnts.map((s) => s.data().email).join(";")
          );
        } else {
          console.log("Course not found!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeStudent = (event) => {
    const id = event.currentTarget.parentElement.getAttribute("studentid");
    console.log(courseDocId);
    const courseRef = doc(firestore, "courses", courseDocId);
    const students = collection(firestore, "students");
    updateDoc(courseRef, {
      enrolledStudents: arrayRemove(doc(students, id)),
    }).then(() => {
      updateClassList(courseDocId);
    });
  };

  //Initialize data which comes from the database
  useEffect(() => {
    // Get course title and description
    const courseID = location.state?.courseId;
    setCourseDocId(courseID);
    updateClassList(courseID);
  }, [location]);

  return (
    <div>
      <CourseNavBar />
      <div className="classlist-page">
        <div className="classlist-wrapper">
          <h1 className="title">Course Classlist</h1>
          <Button
            className="add-button"
            onClick={() => {
              //Append placeholder student
              /*
      setStudents([
        ...students, {
         firstName: "Firstname",
         lastName: "Lastname",
         email: "example@gmail.com"
        }
      ]);*/
            }}
          >
            Add Students
          </Button>

          <a href={mailingList} className="email-button" onClick={() => {}}>
            Email All
          </a>

          <table className="classlist">
            <tbody>
              <tr>
                <th className="profile-pic-column"></th>
                <th>Name</th>
                <th>Email</th>
              </tr>

              {students.map((student) => (
                <tr>
                  <td className="profile-pic-column" studentid={student.id}>
                    <Button
                      className="remove-student-container"
                      onClick={removeStudent}
                    >
                      <DeleteIcon fontSize="large" />
                    </Button>
                    <img
                      className="profile-pic"
                      src={ProfilePic}
                      alt="profile"
                    ></img>
                  </td>
                  <td>
                    {student.data().lastName}, {student.data().firstName}
                  </td>
                  <td>{student.data().email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p id="student-count-label">Total Students: {students.length}</p>
        </div>
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

export default Classlist;
