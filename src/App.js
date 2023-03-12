import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Admin from "./Components/Admin";
import Classlist from "./Components/CoursePages/Classlist"
import Landing, { PageList } from "./Components/Landing";
import { useContext, useState } from "react";
import { AuthContext } from "./Contexts/AuthContext";

function AuthorizedRoute(props) {
  const { user } = useContext(AuthContext);
  if (user) {
    return props.children;
  }
  return <Navigate to="/login" />;
}

function App() {
  const [isDark, setIsDark] = useState(false); // For future Dark Mode implementation

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/classlist" element={<Classlist />} />
        {Object.values(PageList).map((path) => (
          <Route
            key={path}
            path={path}
            element={
              <AuthorizedRoute>
                <Landing page={path} />
              </AuthorizedRoute>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
