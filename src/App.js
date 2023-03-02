import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "@emotion/styled";
import NavBar from "./Components/NavBar";
import HomepageInstructor from "./Components/HomepageInstructor";
import SettingsPage from "./Components/Settings";
import FAQ from "./Components/FAQ";

const Container = styled.div`
  display: flex;
`;

function App() {
  return (
    <div ClassName='App'>
      <Router>
      <Routes>
      <Route
          path="/"
          element={
            <Container>
              <NavBar />
              <HomepageInstructor />
            </Container>
          }
      />
      <Route
          path="/home"
          element={
            <Container>
              <NavBar />
              <HomepageInstructor />
            </Container>
          }
      />
      <Route
          path="/settings"
          element={
            <Container>
              <NavBar />
              <SettingsPage />
            </Container>
          }
        />
        <Route
          path="/faq"
          element={
            <Container>
              <NavBar />
              <FAQ />
            </Container>
          }
        />
      </Routes>
      </Router> 
       
    </div>
  );
}

export default App;
