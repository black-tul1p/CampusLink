import './App.css';
import Profile from './Components/Profile';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
/*
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
*/
function App() {
  return (
    <div>
      <Profile
        photo="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        email="example@example.com"
        name="John Doe"
      />
    </div>
  );
}

export default App;
