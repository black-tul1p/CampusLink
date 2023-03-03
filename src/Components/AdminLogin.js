import Banner from "../Assets/banner_logo.jpg";
import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Email, VpnKey } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ErrorBox from "./Error";
import { loginAdmin } from "../Backend/user";
import { AuthContext } from "../Contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginAdmin(email.trim(), pass)
      .then((res) => {
        handleLogin(res);
        navigate("/adminHome");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <Box className="Default-card">
        <h1>Admin Login</h1>
        <FormControl className="Login-form">
          {error && <ErrorBox text={error} />}
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
            </div>
          </div>
          <Button disableElevation variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </div>
  );
}
