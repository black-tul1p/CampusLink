import "./Classlist.css";
import logo from '../images/campuslink_banner.png'
import ProfilePic from '../images/default_profile_picture.png'
import LogoBanner from '../Components/LogoBanner.js'
import { useState } from "react";

function Classlist() {
  const [students, setStudents] = useState([]);
  return (
    <div className="Registration-page">
      <LogoBanner></LogoBanner>
      <h1 className="course-name" >[Course Name Here]</h1>
      <div className="classlist-wrapper">
        <h1 className="title" >Course Classlist</h1>

        <button className="add-button" onClick={() => {
          setStudents([
            ...students, {
             firstname: "Firstname",
             lastname: "Lastname",
             email: "example@gmail.com"
            }
          ]);
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
                  <img className="profile-pic" src={ProfilePic}></img>
                </td>
                <td>{student.lastname}, {student.firstname}</td>
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
      <td>{props.lastname}, {props.firstname}</td>
      <td>{props.email}</td>
    </tr>
  );
}

StudentInfoRow.defaultProps = {
  firstname: "Firstname",
  lastname: "Lastname",
  email: "example@gmail.com",
}

export default Classlist;
