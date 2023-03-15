import React from "react";
import CourseNavBar from "../CourseNavBar";
import { addAssignment } from "../../Backend/assigment";
import "../../Styles/Assignments.css";
import "../../Styles/App.css";
import { useState} from "react";

function Assignments() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = () => {
    const due = (date + " " + time);
    addAssignment(title, description, due);
  }
  const handleCancel = () => {
    setTitle("");
    setDate("");
    setTime("");
    setDescription("");
  }

  return (
    <div style={{ width: "100%" }}>
      <CourseNavBar />
      <div className = "assignment-box">
        <div className ="header-box">
          <p>Assignments</p>
          <div className="header-divider"></div>
        </div>
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
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Assignments;
