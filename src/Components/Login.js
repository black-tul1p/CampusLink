import React from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import Banner from "../Assets/banner_logo.jpg";

export default function Login() {
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
              sx={{ input: { color: "white" } }}
            />
            <div className="password-section">
              <TextField
                id="pass-input"
                label="Password"
                type="password"
                variant="outlined"
              />
              <Button className="Mini-button">Forgot Password?</Button>
            </div>
          </div>
          <Button
            variant="contained"
            onClick={() => {
              alert("Clicked!");
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
