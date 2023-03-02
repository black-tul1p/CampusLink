import "./App.css";
import Login from "./Components/Login";
import {
  createStudent,
  removeStudent,
  getStudentIdByEmail,
} from "./Backend/student";
import { useRef, useState } from "react";
import Admin from "./Components/Admin";
import RegistrationPage from "./Components/RegistrationPage";
import AdminLogin from "./Components/AdminLogin"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/adminHome" element={<Admin/>}/>
        <Route path="/admin" element={<AdminLogin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
