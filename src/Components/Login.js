import React, { useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";
import Banner from "../Assets/banner_logo.jpg";

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
              placeholder="test"
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
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
              <Button className="Mini-button">Forgot Password?</Button>
            </div>
          </div>
          <Button
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
