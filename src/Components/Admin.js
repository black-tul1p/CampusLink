import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../Backend/firebase";
import { useSearchParams } from "react-router-dom";
import "./Classlist.css";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import styled from "@emotion/styled";

export default function Admin() {
  const [instructors, setInstructors] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    //Get students and add to list
    getDocs(collection(firestore, "instructors")).then((instructorSet) => {
      let instructorList = [];
      instructorSet.forEach((doc) => {
        if (doc.data().accepted) {
          instructorList.push({
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
          });
        }
      });
      setInstructors(instructorList);
    });
  }, []);

  return (
    <div className="adminPage">
      <div className="classlist-wrapper">
        <h1 className="title">Instructor List</h1>

        <table className="classlist">
          <tbody>
            <tr>
              <th className="accountTypeColumn">Status</th>
              <th>Name</th>
              <th>Email</th>
            </tr>

            {instructors.map((instructor) => (
              <tr>
                <td className="userTypeColumn">Approved</td>
                <td>
                  {instructor.lastName}, {instructor.firstName}
                </td>
                <td>{instructor.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p id="student-count-label">Total Instructors: {instructors.length}</p>
      </div>
    </div>
  );
}

function InstructorInfoRow(props) {
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

InstructorInfoRow.defaultProps = {
  firstName: "Firstname",
  lastName: "Lastname",
  email: "example@gmail.com",
};
InstructorInfoRow.defaultProps = {
  firstName: "Firstname",
  lastName: "Lastname",
  email: "example@gmail.com",
};
