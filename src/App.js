import "./App.css";
import Login from "./Components/Login";
import {
  createStudent,
  removeStudent,
  getStudentIdByEmail,
} from "./Backend/student";
import { useRef, useState } from "react";
import RegistrationForm from "./Components/RegistrationForm";
import RegistrationPage from "./Components/RegistrationPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationPage/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
