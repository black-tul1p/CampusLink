import CourseNavBar from "../CourseNavBar";
import { addAssignment, verifyInput, getAssigmentsByCourse } from "../../Backend/assigment";
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
import { useLocation } from "react-router-dom";
import assignmentContent from "./AssignmentContent"
import { Button } from "@mui/material";
import loadData from "./AssignmentContent";


function Assignments() {

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(true);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [courseDocId, setCourseDocId] = useState("");
  const [assignments, setAssignments] = useState([]);
  const location = useLocation();



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
  }, [location]);

  const toggle = () => {
    setOpen(!open);
    if(open === false) {
      setTitle("");
      setDate("");
      setTime("");
      setDescription("");
      setOpen1(false);
    }
  }

  const firstToggle = () => {
    setOpen1(!open1);
    if(!open1) {
      handleCancel();
    }
  }

  const handleSubmit = () => {
    if (!verifyInput(title, description, date, time)) {
      console.log("verify: " + verifyInput(title, description, date, time));
      setError("Incorrect input format.");
      setTimeout(() => {
        setError("");
      }, 1500);
        return;
    } else {
      const due = date + " " + time;
      addAssignment(title, description, due, courseDocId);
      alert("New Assignment Added!");
      handleCancel();
    }
    
  }
  const handleCancel = () => {
    setTitle("");
    setDate("");
    setTime("");
    setDescription("");
    setOpen(false);
  }


  const handleUpload = () => {
    console.log("File Changed");
  }

  const displayContent = (e) => {
    const tDTitle = e.currentTarget.parentElement.getAttribute("assignmenttitle");
    const tDDueDate = e.currentTarget.parentElement.getAttribute("assignmentduedate");
    const tDDescript = e.currentTarget.parentElement.getAttribute("assignmentdescript");
    const tDSubLim = e.currentTarget.parentElement.getAttribute("assignmentsublim");
    console.log(tDTitle + " " + tDDueDate + " " + tDDescript + " " + tDSubLim);
    loadData(tDTitle, tDDueDate, tDDescript, tDSubLim);
  }

  return (
    <div className = "main-box" style={{ width: "100%" }}>
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
                      .filter(
                        (assignment) =>
                          assignment.title
                      )
                      .map((assignment) => (
                        <div className = 'assignment-list-box'>
                          <NavigateNextIcon/>
                          <label>{assignment.title}</label>
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
                      /*.filter(
                        (assignment) =>
                          assignment.title
                      )*/
                      .map((assignment) => (
                        <div className = 'assignment-list-box' 
                          assignmenttitle={assignment.title}
                          assignmentdescript={assignment.description}
                          assignmentduedate={assignment.dueDate}
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
            <div className="create-assignment-bar" onClick={toggle}>
              <p style={{fontSize:"1.3em"}}>
                Create An Assignment
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
                <label> Upload PDFs/Images </label> 
                <input type="file"/>
                <div className="button-box">
                  <button onClick={handleSubmit}>
                    Submit
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
