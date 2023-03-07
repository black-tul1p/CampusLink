import Banner from "../Assets/banner_logo.jpg";
import {
  Button,
  FormControl,
  InputAdornment,
  Snackbar,
  SnackbarContent,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import ErrorBox from "./Error";
import { CheckCircle, Email } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { sendPasswordResetEmail, verifyEmail } from "../Backend/user";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleReset = async () => {
    await sendPasswordResetEmail(email.trim())
      .then(() => {
        setSnackbarMessage("Email sent");
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
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
        </div>
        <Button disableElevation variant="contained" onClick={handleReset}>
          Send Reset Link
        </Button>
        <div style={{ color: "white", alignSelf: "center" }}>
          <Button
            className="Mini-button"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Login
          </Button>
        </div>
      </FormControl>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          style={{
            backgroundColor: "green",
            display: "flex",
            alignItems: "center",
          }}
          message={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <CheckCircle />
              <span
                style={{
                  marginLeft: "1em",
                  alignSelf: "center",
                }}
              >
                {snackbarMessage}
              </span>
            </div>
          }
        />
      </Snackbar>
    </Box>
  );
}
