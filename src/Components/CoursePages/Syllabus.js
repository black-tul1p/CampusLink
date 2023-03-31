import React from "react";
import CourseNavBar from "../CourseNavBar";

import FileUpload from "../../Backend/FileUpload";
import VidUpload from "../../Backend/VidUpload";

function Syllabus() {
  return (
    <div style={{ width: "100%" }}>
      <CourseNavBar /> 
      <FileUpload />
      <VidUpload />
    </div>
  );
}

export default Syllabus;
