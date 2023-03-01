import "./App.css";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import Register from "./Components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomepageInstructor from "./Components/HomepageInstructor";
import styled from "@emotion/styled";
import SettingsPage from "./Components/Settings";

const Container = styled.div`
  display: flex;
`;
import FAQ from "./Components/FAQ";

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
        <Route
          path="/settings"
          element={
            <Container>
              <NavBar />
              <SettingsPage />
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
