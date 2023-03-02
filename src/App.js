import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "@emotion/styled";
import NavBar from "./Components/NavBar";
import CourseNavBar from "./Components/CourseNavBar";
import Announcements from "./CoursePages/Announcements";
import Assignments from "./CoursePages/Assignments";
import Syllabus from "./CoursePages/Syllabus";
import Classlist from "./CoursePages/Classlist";
import Discussions from "./CoursePages/Discussions";
import Grades from "./CoursePages/Grades";
import Quizzes from "./CoursePages/Quizzes";

const Container = styled.div`
  display: flex;
`;

function App() {
  return (
    <div ClassName='App'>
      <Router>
      <Routes>
      {/* <Route
          path="/"
          element={
            <Container>
              <NavBar />
              <HomepageInstructor />
            </Container>
          }
      /> */}
      <Route
          path="/"
          element={
            <Container>
              <NavBar />
              <CourseNavBar />
              <Announcements />
            </Container>
          }
      />
      <Route
          path="/announcements"
          element={
            <Container>
              <NavBar />
              <CourseNavBar />
              <Announcements />
            </Container>
          }
      />
      <Route
          path="/assignments"
          element={
            <Container>
              <NavBar />
              <CourseNavBar />
              <Assignments />
            </Container>
          }
        />
      <Route
          path="/discussions"
          element={
            <Container>
              <NavBar />
              <CourseNavBar />
              <Discussions />
            </Container>
          }
        />
      <Route
          path="/grades"
          element={
            <Container>
              <NavBar />
              <CourseNavBar />
              <Grades />
            </Container>
          }
        />
      <Route
          path="/syllabus"
          element={
            <Container>
              <NavBar />
              <CourseNavBar />
              <Syllabus />
            </Container>
          }
        />
        <Route
          path="/quizzes"
          element={
            <Container>
              <NavBar />
              <CourseNavBar />
              <Quizzes />
            </Container>
          }
        />
        <Route
          path="/classlist"
          element={
            <Container>
              <NavBar />
              <CourseNavBar />
              <Classlist />
            </Container>
          }
        />
        
      </Routes>
      </Router> 
       
    </div>
  );
}

export default App;
