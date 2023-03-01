import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "@emotion/styled";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Admin from "./Components/Admin";
import NavBar from "./Components/NavBar";
import HomepageInstructor from "./Components/HomepageInstructor";
import SettingsPage from "./Components/Settings";
import FAQ from "./Components/FAQ";

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
          path="/faq"
          element={
            <Container>
              <NavBar />
              <FAQ />
            </Container>
          }
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;