<<<<<<< HEAD
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
=======
import Banner from "../Assets/banner_logo.jpg";
import React, { useState } from "react";
>>>>>>> f4f9525 (Added backend  functionality to get user role)
import {
  Box,
  Button,
  FormControl,
<<<<<<< HEAD
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
=======
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Email, VpnKey } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Backend/user";
>>>>>>> f4f9525 (Added backend  functionality to get user role)

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Returns true if signed in
    const signedIn = await loginUser(email, pass).catch((error) => {
      console.log(error.message);
      setError(error.message);
    });

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
=======
    <div>
      <Box className="Default-card">
        <img className="Banner-logo" src={Banner} alt="CampusLink Logo" />
        <FormControl
          className="Login-form"
          onSubmit={() => {
            alert("BRUH");
          }}
        >
          {error && (
            <Typography
              variant="body1"
              color="error"
              sx={{ alignSelf: "center" }}
            >
              {error}
            </Typography>
          )}
          <div className="Input-fields">
            <TextField
              required
              id="email-input"
              label="Email Address"
              variant="outlined"
>>>>>>> f4f9525 (Added backend  functionality to get user role)
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
<<<<<<< HEAD
=======
              placeholder="test"
              sx={{ input: { color: "white" } }}
>>>>>>> 270941a (Added Basic Login Page)
            />
            <div className="password-section">
              <TextField
=======
            />
            <div className="password-section">
              <TextField
                required
>>>>>>> f4f9525 (Added backend  functionality to get user role)
                id="pass-input"
                label="Password"
                type="password"
                variant="outlined"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0720e1e (Added MUI Icon library, missing icons to form)
=======
>>>>>>> f4f9525 (Added backend  functionality to get user role)
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
<<<<<<< HEAD
=======
>>>>>>> 270941a (Added Basic Login Page)
=======
>>>>>>> f4f9525 (Added backend  functionality to get user role)
              />
              <Button className="Mini-button">Forgot Password?</Button>
            </div>
          </div>
<<<<<<< HEAD
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
=======
          <Button disableElevation variant="contained" onClick={handleLogin}>
>>>>>>> f4f9525 (Added backend  functionality to get user role)
            Submit
          </Button>
          <div style={{ color: "white", alignSelf: "center" }}>
            Don't have an account?
<<<<<<< HEAD
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
=======
            <Button className="Mini-button">Sign up</Button>
          </div>
        </FormControl>
>>>>>>> f4f9525 (Added backend  functionality to get user role)
      </Box>
    </div>
  );
}
