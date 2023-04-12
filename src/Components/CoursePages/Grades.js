import React from "react";
import "../../Styles/App.css";
import { useState, useEffect} from "react";
import CourseNavBar from "../CourseNavBar";
import { getUserRole } from "../../Backend/user";


function Grades() {
  return (
    <div style={{ width: "100%", color: "white" }}>
      <CourseNavBar />
      <center>
        <h1>Test</h1>
      </center>
    </div>
  );
}

export default Grades;
