import CourseContentCSS from "./CourseContent.css";
import NavBar from "../NavBar";
import Banner from "../Assets/banner_logo.jpg";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactDom from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
import { getInstructorCourses } from "../../Backend/instructor";

//import CS307Syllabus from "../Assets/CS307-Syllabus.pdf";
//import { Document,Page } from 'react-pdf';

export default function Content() {
  const CCNavButtonS = (props) => {
    return (
      <div className="CCNavButton">
        <Button
          varaint="contained"
          color="inherit"
          onClick={() => alert(props.title)}
        >
          <h3>{props.title}</h3>
        </Button>
      </div>
    );
  };

  /* const CCTest = (props) => {

        return(
            <div>
               <h1>Super test</h1>
            </div>
            
        )
    } */

  /* const CCAssignmentS = (props) => {
        return(
                <h4>
                    {props.title}
                    {props.duedate}
                </h4>
        )
    } */

  //  const [content_page, setCounter] = useState("Syllabus");

  return (
    <div>
      <div className="CCBannerContainer">
        <img className="CCBanner" src={Banner} alt="CampusLink Logo" />
      </div>

      <div className="CCNavBar">
        <CCNavButtonS title="Syllabus" />
        <CCNavButtonS title="Assignments" />
        <CCNavButtonS title="Quizzes" />
        <CCNavButtonS title="Grades" />
        <CCNavButtonS title="Discussions" />
        <CCNavButtonS title="Classlist" />
        <CCNavButtonS title="Bookmarks" />
      </div>
    </div>
  );
}
