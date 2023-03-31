import React from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import FAQ from "./FAQ";
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
import Classlist from "./CoursePages/Classlist";
import Admin from "./Admin";
import AssignmentContent from "./CoursePages/AssignmentContent";

const Container = styled.div`
  display: flex;
  width: 100vw;
  max-width: 100%;
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
  Admin: "/adminHome",
  AssignmentContent: "/assignmentContent",
};

export default function Landing(props) {
  var content = null;
  if (props.page === PageList.Admin) {
    content = <Admin theme={props.theme} />;
  } else if (props.page === PageList.Home) {
    content = <Home theme={props.theme} />;
  } else if (props.page === PageList.Settings) {
    content = <SettingsPage theme={props.theme} />;
  } else if (props.page === PageList.FAQ) {
    content = <FAQ theme={props.theme} />;
  } else if (props.page === PageList.Profile) {
    content = <Profile theme={props.theme} />;
  } else if (props.page === PageList.Announce) {
    content = <Announcements theme={props.theme} />;
  } else if (props.page === PageList.HW) {
    content = <Assignments theme={props} />;
  } else if (props.page === PageList.Discuss) {
    content = <Discussions theme={props} />;
  } else if (props.page === PageList.Grades) {
    content = <Grades theme={props} />;
  } else if (props.page === PageList.Syllabus) {
    content = <Syllabus theme={props} />;
  } else if (props.page === PageList.Quiz) {
    content = <Quizzes theme={props} />;
  } else if (props.page === PageList.Classlist) {
    content = <Classlist theme={props} />;
  } else if (props.page === PageList.ClasslistStud) {
    content = <ClasslistStudent theme={props} />;
  } else if (props.page === PageList.AssignmentContent) {
    content = <AssignmentContent theme={props} />;
  }else {
    content = <p>Invalid page.</p>;
  }

  return (
    <Container>
      <Navbar />
      <div style={{ width: "100%", minWidth: 1050 }}>{content}</div>
    </Container>
  );
}
