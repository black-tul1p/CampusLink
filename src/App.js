import "./App.css";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import Register from "./Components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomepageInstructor from "./Components/HomepageInstructor";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
`;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Register />} />
        <Route path="/nav" element={<NavBar />} />
        <Route
          path="/home"
          element={
            <Container>
              <NavBar />
              <HomepageInstructor />
            </Container>
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
