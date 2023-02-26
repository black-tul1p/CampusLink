import CourseContentCSS from "./CourseContent.css"
import NavBar from './NavBar';
import Banner from "../Assets/banner_logo.jpg";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";


const CCNavButtonS = (props) => {
    return(
        <div className='CCNavButton'>
            <Button varaint="contained" color="inherit" >
                <h3>{props.title}</h3>
            </Button>
        </div>
    

    )
}


export default function CourseContent() {


    return ( <div>
            <div className='CCBannerContainer'>
                <img className="CCBanner" src={Banner} alt="CampusLink Logo" />
            </div>

            <div className='CCNavBar'>
                <CCNavButtonS title="Syllabus"/>
                <CCNavButtonS title="Assignments"/>
                <CCNavButtonS title="Quizzes"/>
                <CCNavButtonS title="Grades"/>
                <CCNavButtonS title="Discussions"/>
                <CCNavButtonS title="Classlist"/>
                <CCNavButtonS title="Bookmarks"/>
            </div>
            

            

            <h1 className="CCHeader">Course Test</h1>
    </div>
    )
}