import React from "react";
import CourseNavBar from "../CourseNavBar";
import { addAssignment } from "../../Backend/assigment";

function assignments() {
  const handleClick = () => {
    // Verify that suggestionRef contains valid input
    addAssignment("Assignment 2", "Write your thoughts about this course.", "");
  }
  return (
    <div style={{ width: "100%" }}>
      <CourseNavBar />
      <button onClick={handleClick}></button>
    </div>
  );
}

export default assignments;
