import Banner from "../Assets/banner_logo.jpg";
import React from "react";
import { Button } from "@mui/material";
import "./CourseContent.css";

//import CS307Syllabus from "../Assets/CS307-Syllabus.pdf";
//import { Document,Page } from 'react-pdf';

export default function CourseContent() {
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
