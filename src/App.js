import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "@emotion/styled";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NavBar from "./Components/NavBar";
import HomepageInstructor from "./Components/HomepageInstructor";
import SettingsPage from "./Components/Settings";
import Classlist from "./Components/Classlist";

const Container = styled.div`
  display: flex;
`;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Register />} />
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
          path="/classlist"
          element={
            <Container>
              <NavBar />
              <Classlist />
            </Container>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
