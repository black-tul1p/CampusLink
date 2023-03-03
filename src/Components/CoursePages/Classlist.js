import "../Classlist.css";
import {doc, getDoc, updateDoc, arrayRemove, collection} from "@firebase/firestore";
import { firestore } from "../../Backend/firebase";
import ProfilePic from '../../images/default_profile_picture.png'
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
  Dialog,
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle
} from '@mui/material';

function Classlist() {
  const [students, setStudents] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [courseDocId, setCourseDocId] = useState("");
  const [open, setOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const location = useLocation();

  const updateClassList = (courseID) => {
    if (courseID === undefined) {
      console.log("Course not specified!");
    } else {
      console.log(courseID);
      const course = doc(firestore, 'courses', courseID)
      getDoc(course).then((courseDoc) => {
        if (courseDoc.exists()) {
          setCourseData(courseDoc.data());

          //Add enrolled students to classlist
          const enrolled = courseDoc.data().enrolledStudents;
          Promise.all(enrolled.map(getDoc)).then(
            stdnts => setStudents(stdnts)
          ); 
        } else {
          console.log("Course not found!");
        }
      });
    }
  }

  const openEmailDialogue = () => {
    setOpen(true);
  };
  const closeEmailDialogue = () => {
    setOpen(false);
  };
  const submitEmailDialogue = () => {
   closeEmailDialogue(); 
  }

  //Initialize data which comes from the database
  useEffect(() => {
    // Get course title and description
    const courseID = location.state?.courseId;
    setCourseDocId(courseID);
    updateClassList(courseID);    
  }, [location]);

  return (
    <div className="classlist-page">
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


        <button className="add-button" onClick={() => {
          openEmailDialogue();
        }}>Email All</button>

        <table className="classlist">
          <tbody>
            <tr>
              <th className="profile-pic-column"></th>
              <th>Name</th>
              <th>Email</th>
            </tr>

            {students.map(student => (
              <tr>
                <td className="profile-pic-column" studentid={student.id} >
                  <div className="remove-student-container" onClick={(event) => {
                    const id = event.currentTarget.parentElement.getAttribute('studentid');
                    console.log(courseDocId);
                    const courseRef = doc(firestore, 'courses', courseDocId)
                    const students = collection(firestore, "students");
                    updateDoc(courseRef, {enrolledStudents: arrayRemove(doc(students, id))}).then(() => {
                      updateClassList(courseDocId);  
                    });
                  }}>
                       <DeleteIcon fontSize="large" />
                    </div>
                  <img className="profile-pic" src={ProfilePic} alt="profile"></img>
                </td>
                <td>{student.data().lastName}, {student.data().firstName}</td>
                <td>{student.data().email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p id="student-count-label">Total Students: {students.length}</p>
      </div>

      <Dialog open={open} onClose={closeEmailDialogue} sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "500px",  // Set your width here
          },
        },
      }}>
        <DialogTitle>Send Email to all Students</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
              label="Subject"
              sx={{ margin : '5px', width: "50%", 
                    "& .MuiInputBase-input": { color: 'black !important' },
                    "& .MuiInputLabel-root": { color: '#000A !important' } }}
              variant="standard"
              fullWidth
              onChange={e => {setEmailSubject(e.target.value);}}
          />
          <TextField
              label="Message"
              sx={{ margin : '5px',
                    "& .MuiInputBase-input": { color: 'black !important' },
                    "& .MuiInputLabel-root": { color: '#000A !important' } }}
              variant="standard"
              minRows="5"
              fullWidth
              multiline
              onChange={e => {setEmailBody(e.target.value);}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEmailDialogue}>Cancel</Button>
          <Button onClick={submitEmailDialogue}>Send</Button>
        </DialogActions>
      </Dialog>

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