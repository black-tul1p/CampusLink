import Banner from "../Assets/banner_logo.jpg";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Email, Person, VpnKey, School } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { createUser } from "../Backend/user";
import styled from "@emotion/styled";

export default function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const StudToggleButton = styled(ToggleButton)({
    display: "grid",
    gridTemplateColumns: "1fr 9fr",
    color: "white",
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: role === "student" ? "teal" : "none",
    },
  });

  const InstToggleButton = styled(ToggleButton)({
    display: "grid",
    gridTemplateColumns: "1fr 9fr",
    color: "white",
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: role === "instructor" ? "teal" : "none",
    },
  });

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Returns true if registered successfully
    const registered = await createUser(
      email,
      password,
      firstName,
      lastName,
      role
    ).catch((error) => {
      console.log(error.message);
      setError(error.message);
    });

    if (registered) navigate("/");
  };

  return (
    <div>
      <Box className="Default-card">
        <img className="Banner-logo" src={Banner} alt="CampusLink Logo" />
        <FormControl className="Registration-form">
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
            <div className="grid-row">
              <TextField
                required
                id="f-name-input"
                label="First Name"
                variant="outlined"
                placeholder="John"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                      <div className="Vertical-line" />
                    </InputAdornment>
                  ),
                }}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <TextField
                required
                id="l-name-input"
                label="Last Name"
                variant="outlined"
                placeholder="Doe"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                      <div className="Vertical-line" />
                    </InputAdornment>
                  ),
                }}
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
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
            <div className="grid-row Password-section">
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <TextField
                required
                id="conf-pass-input"
                label="Confirm"
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
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <ToggleButtonGroup
            value={role}
            exclusive
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
          >
            <StudToggleButton
              value="student"
              aria-label="student-role"
              onClick={() => {
                setRole("student");
              }}
              disableRipple
            >
              <Person />
              <span>Student</span>
            </StudToggleButton>
            <InstToggleButton
              value="instructor"
              aria-label="instructor-role"
              onClick={() => {
                setRole("instructor");
              }}
              disableRipple
            >
              <School />
              <span>Instructor</span>
            </InstToggleButton>
          </ToggleButtonGroup>

          <Button
            disableElevation
            variant="contained"
            onClick={handleRegistration}
          >
            Register
          </Button>
          <div style={{ color: "white", alignSelf: "center" }}>
            Already have an account?
            <Button
              className="Mini-button"
              onClick={() => {
                navigate("/");
              }}
            >
              Login
            </Button>
          </div>
        </FormControl>
      </Box>
    </div>
  );
}
