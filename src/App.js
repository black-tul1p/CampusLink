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
        {Object.values(PageList).map((path) => (
          <Route
            key={path}
            path={path}
            element={
              <AuthorizedRoute>
                <Landing page={path} theme={isDark} />
              </AuthorizedRoute>
            }
          />
        ))}
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
  );
}

export default App;
