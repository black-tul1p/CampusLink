import React from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import FAQ from "./FAQ";
// import Account from "./Account";
import SettingsPage from "./Settings";
import styled from "@emotion/styled";
import Profile from "./Profile";
import Announcements from "./CoursePages/Announcements";
import Assignments from "./CoursePages/Assignments";
import Discussions from "./CoursePages/Discussions";
import Grades from "./CoursePages/Grades";
import Syllabus from "./CoursePages/Syllabus";
import Quizzes from "./CoursePages/Quizzes";
import ClasslistStudent from "./CoursePages/ClasslistStudent";
import Classlist from "./Classlist";
import CourseNavBar from "./CourseNavBar";

const Container = styled.div`
  display: flex;
  min-width: 620px;
`;

export const PageList = {
  Home: "/home",
  Settings: "/settings",
  FAQ: "/faq",
  Profile: "/profile",
  Announce: "/announcements",
  HW: "/assignments",
  Discuss: "/discussions",
  Grades: "/grades",
  Syllabus: "/syllabus",
  Quiz: "/quizzes",
  Classlist: "/classlist",
  ClasslistStud: "/classlistStudent",
};

export default function Landing(props) {
  var content = null;
  if (props.page === PageList.Home) {
    content = <Home theme={props.theme} />;
  } else if (props.page === PageList.Settings) {
    content = <SettingsPage theme={props.theme} />;
  } else if (props.page === PageList.FAQ) {
    content = <FAQ theme={props.theme} />;
  } else if (props.page === PageList.Profile) {
    content = <Profile theme={props.theme} />;
  } else if (props.page === PageList.Announce) {
    content = (
        <CourseNavBar/>,
        <Announcements theme={props.theme} />
    );
  } else if (props.page === PageList.HW) {
    content = (
        <CourseNavBar/>,
        <Assignments theme={props} />
      
    );
    
  } else if (props.page === PageList.Discuss) {
    content = (
      <CourseNavBar/>,
      <Discussions theme={props} />
      
    );
  } else if (props.page === PageList.Grades) {
    content = (
        <CourseNavBar/>,
        <Grades theme={props} />
      
    );
  } else if (props.page === PageList.Syllabus) {
    content = (
        <CourseNavBar/>,
        <Syllabus theme={props} />
      
    );
  } else if (props.page === PageList.Quiz) {
    content = (
        <CourseNavBar/>,
        <Quizzes theme={props} />
    );
  } else if (props.page === PageList.Classlist) {
    content = (
        <CourseNavBar/>,
        <Classlist theme={props} />
    );
  } else if (props.page === PageList.ClasslistStud) {
    content = (
        <CourseNavBar/>,
        <ClasslistStudent theme={props} />
    );
  } else {
    content = <p>Invalid page.</p>;
  }

  return (
    <Container>
      <Navbar />
      {content}
    </Container>
  );
}