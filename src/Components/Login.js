<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import Banner from "../Assets/banner_logo.jpg";
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> 270941a (Added Basic Login Page)
=======
import Banner from "../Assets/banner_logo.jpg";
import React, { useState } from "react";
>>>>>>> 0720e1e (Added MUI Icon library, missing icons to form)
import {
  Box,
  Button,
  FormControl,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0720e1e (Added MUI Icon library, missing icons to form)
  InputAdornment,
  TextField,
} from "@mui/material";
import { Email, VpnKey } from "@mui/icons-material";
<<<<<<< HEAD
<<<<<<< HEAD
import CourseContent from "./CourseContent";
=======
>>>>>>> 0720e1e (Added MUI Icon library, missing icons to form)
=======
import { Link } from 'react-router-dom';
import RegistrationPage from "./RegistrationPage";
>>>>>>> bf73a88 (Attempted to redirect using react router)
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { loginUser } from "../Backend/student";
>>>>>>> 4575726 (Update login page, added register page for testing)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Returns true if signed in
    const signedIn = await loginUser(email, password, "student").catch(
      (error) => {
        console.log(error.message);
        setError(error.message);
      }
    );

    if (signedIn) navigate("/");
  };

=======
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import Banner from "../Assets/banner_logo.jpg";

export default function Login() {
>>>>>>> 270941a (Added Basic Login Page)
  return (
<<<<<<< HEAD
    <div>
      <Box className="Default-card">
        <img className="Banner-logo" src={Banner} alt="CampusLink Logo" />
        <FormControl className="Login-form">
          <div className="Input-fields">
            <TextField
              id="email-input"
              label="Email Address"
              variant="outlined"
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0720e1e (Added MUI Icon library, missing icons to form)
              placeholder="email@organization.edu"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                    <div className="Vertical-line" />
                  </InputAdornment>
                ),
              }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
=======
              placeholder="test"
              sx={{ input: { color: "white" } }}
>>>>>>> 270941a (Added Basic Login Page)
            />
            <div className="password-section">
              <TextField
                id="pass-input"
                label="Password"
                type="password"
                variant="outlined"
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0720e1e (Added MUI Icon library, missing icons to form)
                placeholder="***********"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKey />
                      <div className="Vertical-line" />
                    </InputAdornment>
                  ),
                }}
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
=======
>>>>>>> 270941a (Added Basic Login Page)
              />
              <Button className="Mini-button">Forgot Password?</Button>
            </div>
          </div>
          <Button
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0720e1e (Added MUI Icon library, missing icons to form)
            disableElevation
            variant="contained"
            onClick={() => {
              alert(email + ": " + pass);
=======
            variant="contained"
            onClick={() => {
              alert("Clicked!");
>>>>>>> 270941a (Added Basic Login Page)
            }}
          >
            Submit
          </Button>
          <div style={{ color: "white", alignSelf: "center" }}>
            Don't have an account?
            <Link to="/">
            <Button className="Mini-button"
            containerElement={<Link to="/"/>}
            >
              Sign up
            </Button>
            </Link>
          </div>
        </FormControl>
=======
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{ display: "flex", flexDirection: "column", mt: 2 }}
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Login
        </Button>
>>>>>>> 4575726 (Update login page, added register page for testing)
      </Box>
    </Box>
  );
};

export default Login;
