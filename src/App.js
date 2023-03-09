import "./Styles/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Reset from "./Components/Reset";
import AdminLogin from "./Components/AdminLogin";
import Landing, { PageList } from "./Components/Landing";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./Contexts/AuthContext";
import { CircularProgress } from "@mui/material";
import { isAdmin } from "./Backend/user";

function AuthorizedRoute(props) {
  const { user } = useContext(AuthContext);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Waits until user has logged in and user object is set
    const unsubscribe = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 200);

    return () => clearTimeout(unsubscribe);
  }, []);

  if (isCheckingAuth) {
    return (
      <div
        style={{
          flexGrow: 1,
          marginTop: "30vh",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  } else if (isAdmin(user.email)) {
    <Navigate to="/adminHome" />;
  }

  return props.children;
}

function App() {
  const [isDark, setIsDark] = useState(false); // For future Dark Mode implementation

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Register />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/forgot" element={<Reset />} />
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;