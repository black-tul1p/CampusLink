import React from "react";
import CourseNavBar from "../CourseNavBar";
import { addAssignment } from "../../Backend/assigment";
import "../../Styles/Assignments.css";
import "../../Styles/App.css";

function assignments() {
  const handleClick = () => {
    addAssignment("Assignment 20", "Something something etc.", "");
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
            <input placeholder="Assignment 1"/>    
            <label> Due Date </label>
            <input placeholder="YYYY-MM-DD"/>    
            <label> Assignment Description </label> 
            <textarea rows="4" placeholder="Assignment Description goes Here."/>  
            <div className="button-box">
              <button>Submit</button>
              <button>Cancel</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default assignments;
