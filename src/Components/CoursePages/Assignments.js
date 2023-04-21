import CourseNavBar from "../CourseNavBar";
import { addAssignment, verifyInput, getAssigmentsByCourse, editAssignment, getAssignmentById } from "../../Backend/assigment";
import "../../Styles/Assignments.css";
import "../../Styles/App.css";
import { useState, useEffect} from "react";
import React from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { getUserRole } from "../../Backend/user";
import ErrorBox from "../Error";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField, TextareaAutosize, Container, Box, Typography, Stack } from "@mui/material";
import { ref, uploadBytes, listAll, list,  getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../Backend/firebase";


function Assignments() {

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(true);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [courseDocId, setCourseDocId] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [submissionLimit, setSubmissionLimit] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [originalFileUrl, setOriginalFileUrl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [editingAssignment, setEditingAssignment] = useState(null);
  

  useEffect(() => {
    async function fetchData() {
      try {
        // Get user role
        const courseID = location.state?.courseId;
        setCourseDocId(courseID);
        console.log("ID: " + courseID);
        const role = await getUserRole();
        setRole(role);
        console.log("role: " + role);
        const assgnts = await getAssigmentsByCourse(courseID);
        setAssignments(assgnts);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [location, assignments.length]);

  const toggle = () => {
    setOpen(!open);
    if(open === false) {
      setTitle("");
      setDate("");
      setTime("");
      setDescription("");
      setSubmissionLimit("");
      setPoints("");
      setOpen1(false);
      setEditingAssignment(null);
    }
  }

  const firstToggle = () => {
    setOpen1(!open1);
    if(!open1) {
      handleCancel();
    }
  }
  const UploadFile = async () => {
    const fileLocation =    "STAT40200/" + "Assignments/" + title + "/pdfs";
    const fileListRef = ref(storage, fileLocation + '/');
    if (fileUpload == null) {
			console.log("no pdfs added.")
			return;
		}

		var fileCheck = "" + fileUpload.type;

		if (!fileCheck.includes("pdf")) {
			setError("Only pdfs allowed.");
      setTimeout(() => {
        setError("");
      }, 1500);
        return;
			return;
		}

    if (editingAssignment && originalFileUrl) {
      const fileToDelete = ref(storage, originalFileUrl);
      await deleteObject(fileToDelete);
    }
 

		const fileRef = ref(storage, fileLocation + '/' + fileUpload.name);
		
		uploadBytes(fileRef, fileUpload).then(() => {
			console.log("File Uploaded!");
      setFileUpload(null);
      setOriginalFileUrl(null);
			//console.log(fileUpload)
		})
  }
  

  const handleSubmit = async () => {
    if (!verifyInput(title, description, date, time, submissionLimit)) {
      console.log("verify: " + verifyInput(title, description, date, time));
      setError("Incorrect input format.");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    } else {
      const due = date + " " + time;
      if (editingAssignment) {
        const updatedAssignment = await editAssignment(editingAssignment.id, title, description, due, submissionLimit, courseDocId);
        setAssignments(assignments.map(a => a.id === updatedAssignment.id ? updatedAssignment : a));
      } else {
        await addAssignment(title, description, due, submissionLimit, courseDocId);
        const assgnts = await getAssigmentsByCourse(courseDocId);
        setAssignments(assgnts);
      }
      UploadFile();
      if (editingAssignment) {
        alert("Assignment Updated!");
      } else {
        alert("New Assignment Added!");
      }
  
      handleCancel();
      const assgnts = await getAssigmentsByCourse(courseDocId);
      setAssignments(assgnts);
    }
  };
  

  const handleCancel = () => {
    setTitle("");
    setDate("");
    setTime("");
    setDescription("");
    setSubmissionLimit("");
    setPoints("");
    setOpen(false);
  }


  const handleUpload = () => {
    console.log("File Changed");
  }

  const displayContent = (e) => {
    const assignmentTitle = e.currentTarget.parentElement.getAttribute("assignmenttitle");
    const assignmentDueDate = e.currentTarget.parentElement.getAttribute("assignmentduedate");
    const assignmentDescript = e.currentTarget.parentElement.getAttribute("assignmentdescript");
    const assignmentSubLim = e.currentTarget.parentElement.getAttribute("assignmentsublim");
    console.log(assignmentTitle + " " + assignmentDueDate + " " + assignmentDescript + " " + assignmentSubLim);
    navigate("/assignmentContent", { state: {assignmentTitle, assignmentDueDate, assignmentDescript, assignmentSubLim, courseDocId}});
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }

  function formatTime(date) {
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return hours + ":" + minutes + ":" + seconds;
  }

  const handleEdit = async (assignment) => {
    console.log(assignment.id);
    try {
      setTitle(assignment.title);
      const due = assignment.dueDate.toDate();
      setDate(formatDate(due));
      setTime(formatTime(due));
      setDescription(assignment.description);
      setSubmissionLimit(assignment.submissionLimit.toString());
      setEditingAssignment(assignment);
      const fileLocation = "STAT40200/" + "Assignments/" + assignment.title + "/pdfs";
      const fileListRef = ref(storage, fileLocation + '/');
      const fileList = await list(fileListRef);
      if (fileList.items.length > 0) {
        const originalFileRef = fileList.items[0];
        const url = await getDownloadURL(originalFileRef);
        setOriginalFileUrl(url);
      } else {
        setOriginalFileUrl(null);
      }
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ width: "100%", maxHeight:"100vh", overflow:"auto" }}>
      <CourseNavBar />
      {error && <ErrorBox text={error} />}
      <div className = "assignment-box">
        {role === "student" ? (
          <div className="inner-assignment-box">
            <div className ="header-box">
              <div className="header-titles">
                <p>Assignments</p>
                <p style={{ fontStyle: "italic" }}>Student View</p>
              </div>
              <div className="header-divider"></div>
            </div>
            <div className="assignments-bar"  onClick={firstToggle}>
              <p style={{fontSize:"1.4em"}}>
                All Assignments
              </p>
              {open1 ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </div>
            {open1 && (
              <div className="all-assigments-box">
                {assignments.length > 0 ? (
                    assignments
                    .map((assignment) => (
                      <div className = 'assignment-list-box' 
                        assignmenttitle={assignment.title}
                        assignmentdescript={assignment.description}
                        assignmentduedate={assignment.dueDate.toDate()}
                        assignmentsublim={assignment.submissionLimit}
                        >
                        <Button
                          className="Mini-button"
                          onClick={displayContent}
                        >
                          {assignment.title}
                        </Button>
                      </div>
                    ))
                ):
                (<label>No Assignments</label>) 
                }
                
              </div>
            )}
          </div>
        ): role === "instructor" ? (
          <div className="inner-assignment-box">
            <div className ="header-box">
              <div className="header-titles">
              <p>Assignments</p>
              <p style={{ fontStyle: "italic" }}>Instructor View</p>
              </div>
              <div className="header-divider"></div>
            </div>
            <div className="assignments-bar"  onClick={firstToggle}>
              <p style={{fontSize:"1.3em"}}>
                All Assignments
              </p>
              {open1 ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </div>
            {open1 && (
              <div className="all-assigments-box">
                {assignments.length > 0 ? (
                    assignments
                      .map((assignment) => (
                        <div className = 'assignment-list-box'
                          assignmenttitle={assignment.title}
                          assignmentdescript={assignment.description}
                          assignmentduedate={new Date(assignment.dueDate.seconds * 1000)}
                          //assignmentduedate={assignment.dueDate.toDate()}
                          assignmentsublim={assignment.submissionLimit}
                          >
                          <Button
                            className="Mini-button"
                            onClick={displayContent}
                          >
                            {assignment.title}
                          </Button>
                          <Button
                            className="Mini-button edit-button"
                            onClick={() => handleEdit(assignment)}
                          >
                            Edit
                          </Button>
                        </div>
                      ))
                ):
                (<label>No Assignments</label>) 
                }
                
              </div>
            )}
            <div className="create-assignment-bar" onClick={toggle}>
              <p style={{fontSize:"1.3em"}}>
                Create or Edit An Assignment
              </p>
              {open ? <RemoveCircleIcon/> : <AddCircleIcon />}
            </div>
            {open && (
              <div className = "assignment-form-box">
                <label> Assignment Title </label>
                <input placeholder="Assignment 1"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />    
                <label> Due Date </label>
                <input placeholder="YYYY-MM-DD"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />  
                <label> Due At </label>
                <input placeholder="23:59:00"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />    
                <label> Assignment Description </label> 
                <textarea rows = "3"
                  placeholder="Assignment Description goes Here."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <label> Number of Submissions </label>
                <input placeholder="1"
                  value={submissionLimit}
                  onChange={(e) => {
                    setSubmissionLimit(e.target.value)
                  }}/>
                <label> Total Points </label>
                <input placeholder="100"
                  value={points}
                  onChange={(e) => {
                    setPoints(e.target.value);
                  }}
                />  
                <label> Upload PDFs/Images </label> 
                <input type="file"
                onChange={(event) => {setFileUpload(event.target.files[0]);}}
                multiple
                />
                <div className="button-box">
                  <button onClick={handleSubmit}>
                    {editingAssignment ? "Update" : "Submit"}
                  </button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        ): null}
      </div>  
         
    </div>
  );
}

export default Assignments;
