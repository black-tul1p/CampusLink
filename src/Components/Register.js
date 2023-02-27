import { useState } from "react";
import { createUser } from "../Backend/user";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateEmail(email) != null) {
      setError("Invalid email format!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    console.log(email);
    await createUser(firstName, lastName, email, password, "student").catch(
      (error) => {
        setError(error.message);
      }
    );
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    // alert("Registration successful!");
  };

  const validateEmail = (email) => {
    // Email validation regular expression
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Check if email matches regular expression
    if (!emailRegex.test(email)) {
      return "Invalid email address";
    }

    return null;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          required
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin="normal"
        />
        <TextField
          required
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
        />
        <TextField
          required
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          required
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          required
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
        />
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Box>
  );
}
