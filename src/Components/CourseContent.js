<<<<<<< HEAD
import CourseContentCSS from "./CourseContent.css"
import NavBar from './NavBar';
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
import CS307Syllabus from "../Assets/CS307-Syllabus.pdf";
import { Document,Page } from 'react-pdf';




=======
import React from 'react';
import CourseContentCSS from "./CourseContent.css"
>>>>>>> 8100a24 (created css file, added test button, committing to save before more changes)


export default function CourseContent() {

<<<<<<< HEAD
    const CCNavButtonS = (props) => {
        return(
            <div className='CCNavButton'>
                <Button varaint="contained" color="inherit" 
                    onClick={() => alert(props.title)}>
                  <h3>{props.title}</h3>
                    
                </Button>
            </div>
        
    
        )
    }

    const CCTest = (props) => {

        return(
            <div>
               <h1>Super test</h1>
            </div>
            
        )
    }
    
    const CCAssignmentS = (props) => {
        return(
                <h4>
                    {props.title}
                    {props.duedate}
                </h4>
        )
    }
    
    const [content_page, setCounter] = useState("Syllabus");



    return ( <div>
            <div className='CCBannerContainer'>
                <img className="CCBanner" src={Banner} alt="CampusLink Logo"/>
            </div>

            <div className='CCNavBar'>
                <CCNavButtonS title="Syllabus" />
                <CCNavButtonS title="Assignments"/>
                <CCNavButtonS title="Quizzes"/>
                <CCNavButtonS title="Grades"/>
                <CCNavButtonS title="Discussions"/>
                <CCNavButtonS title="Classlist"/>
                <CCNavButtonS title="Bookmarks"/>
            </div>
        
           {/* <div className="CCSyllabusContainer">
                <div className="CCAssignmentS">
                    <CCAssignmentS title="Test Name" duedate=" 2/2/2"/>
                    <CCAssignmentS title="Test Name" duedate=" 2/2/2"/>
                    <CCAssignmentS title="Test Name" duedate=" 2/2/2"/>
                    <CCAssignmentS title="Test Name" duedate=" 2/22/2"/>
                </div>
              </div> */}




            
    </div>
    )
=======

    return <div className = "CCtest">
            <button className="CCtest">ClickMe 
            </button>
    </div>
>>>>>>> 8100a24 (created css file, added test button, committing to save before more changes)
}