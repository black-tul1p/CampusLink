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
import CourseContent from "./CourseContent";
=======
>>>>>>> 0720e1e (Added MUI Icon library, missing icons to form)

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

=======
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import Banner from "../Assets/banner_logo.jpg";

export default function Login() {
>>>>>>> 270941a (Added Basic Login Page)
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
            <Button className="Mini-button">Sign up</Button>
          </div>
        </FormControl>
      </Box>
    </div>
  );
}
