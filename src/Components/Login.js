import Banner from "../Assets/banner_logo.jpg";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Email, VpnKey } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Backend/user";
import ErrorBox from "./Error";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Returns true if signed in
    const signedIn = await loginUser(email.trim(), pass).catch((error) => {
      setError(error.message);
    });

    if (signedIn) navigate("/");
  };

  return (
    <div>
      <Box className="Default-card">
        <img className="Banner-logo" src={Banner} alt="CampusLink Logo" />
        <FormControl className="Login-form">
          {error && <ErrorBox text={error} />}
          <div className="Input-fields">
            <TextField
              required
              id="email-input"
              label="Email Address"
              variant="outlined"
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
            />
            <div className="Password-section">
              <TextField
                required
                id="pass-input"
                label="Password"
                type="password"
                variant="outlined"
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
              />
              <Button className="Mini-button">Forgot Password?</Button>
            </div>
          </div>
          <Button disableElevation variant="contained" onClick={handleLogin}>
            Submit
          </Button>
          <div style={{ color: "white", alignSelf: "center" }}>
            Don't have an account?
            <Button
              className="Mini-button"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </Button>
          </div>
        </FormControl>
      </Box>
    </div>
  );
}
