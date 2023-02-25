import Banner from "../Assets/banner_logo.jpg";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Email, VpnKey } from "@mui/icons-material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div>
      <Box className="Default-card">
        <img className="Banner-logo" src={Banner} alt="CampusLink Logo" />
        <FormControl className="Login-form">
          <div className="Input-fields">
            <TextField
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
            <div className="password-section">
              <TextField
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
          <Button
            disableElevation
            variant="contained"
            onClick={() => {
              alert(email + ": " + pass);
            }}
          >
            Submit
          </Button>
          <div style={{ color: "white", alignSelf: "center" }}>
            Don't have an account?
            <Button className="Mini-button">Sign up</Button>
          </div>
        </FormControl>
      </Box>
    </div>
  );
}
