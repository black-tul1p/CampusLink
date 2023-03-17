import CourseNavBar from "../CourseNavBar";
import { addAssignment, verifyInput } from "../../Backend/assigment";
import "../../Styles/Assignments.css";
import "../../Styles/App.css";
import { useState, useEffect} from "react";
import React from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getUserRole } from "../../Backend/user";
import ErrorBox from "../Error";

function Assignments() {

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [ isAlertVisible, setIsAlertVisible ] = useState(false);


  useEffect(() => {
    async function fetchRole() {
      try {
        // Get user role
        const role = await getUserRole();
        setRole(role);
        console.log("role: " + role);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRole();
  }, []);

  const toggle = () => {
    setOpen(!open);
  }

  const handleSubmit = () => {
    if (!verifyInput(title, description, date, time)) {
      console.log("verify: " + verifyInput(title, description, date, time));
      setError("Incorrect input format.");
      setTimeout(() => {
        setError("");
      }, 5000);
        return;
    } else {
      const due = date + " " + time;
      addAssignment(title, description, due);
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

  return (
    <div style={{ width: "100%" }}>
      <CourseNavBar />
      {error && <ErrorBox text={error} />}
      <div className = "assignment-box">
      {role === "student" ? (
        <div className ="header-box">
          <div className="header-titles">
            <p>Assignments</p>
            <p style={{ fontStyle: "italic" }}>Student View</p>
          </div>
          <div className="header-divider"></div>
        </div>
      ): null}
      {role === "instructor" ? (
        <div className ="header-box">
          <div className="header-titles">
          <p>Assignments</p>
          <p style={{ fontStyle: "italic" }}>Instructor View</p>
          </div>
          <div className="header-divider"></div>
        </div>
      ) : null}
        {role === "instructor" ? (
          <div className="create-assignment-bar" onClick={toggle}>
            <p style={{fontSize:"1.4em"}}>
              Create Assignment
            </p>
            <AddCircleIcon />
          </div>
          ) : null}
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
              <div className="button-box">
                <button onClick={handleSubmit}>
                  Submit
                </button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          )}
      </div>  
         
    </div>
  );
}

export default Assignments;
