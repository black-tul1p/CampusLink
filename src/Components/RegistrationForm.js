import React, { useState} from "react";
import "./RegistrationForm.css"
import Banner from "../Assets/banner_logo.jpg";
import {
  Box,
  Button,
  FormControl,
  Icon,
  InputAdornment,
  TextField,
  IconButton
} from "@mui/material";
import { Email, VpnKey, AccountCircleOutlined, VisibilityOff, Visibility } from "@mui/icons-material";
import { createStudent } from "../Backend/student";

export default function RegistrationForm() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pushed, setPushed] = useState(true);

    const submitHandler = (e) => {
        e.preventDefault();
        createStudent(firstName, lastName, email, password);
        alert("First Name: " + firstName + "\n" +
            "Last Name: " + lastName + "\n" +
            "Email: " + email + "\n" +
            "Password: " + password + "\n")
    }

    const showPwHandler = () => {
        setPushed(!pushed)
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return(
        <div>
            <Box className="Default-card">
                <img className="Banner-logo" src={Banner} alt="CampusLink Logo"/>
                <h1> Sign Up</h1>
                <FormControl className="registrationForm">
                        <div className="Input-fields">
                            <div className="firstName">
                                <TextField
                                id="firstName"
                                label="First Name"
                                type="text"
                                variant="outlined"
                                placeholder="John"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleOutlined/>
                                            <div className="Vertical-line"/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">

                                        </InputAdornment>
                                    )
                                }}
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}
                                />
                            </div>
                            <div className="lastName">
                                <TextField
                                id="lastName"
                                label="Last Name"
                                type="text"
                                variant="outlined"
                                placeholder="Smith"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleOutlined/>
                                            <div className="Vertical-line"/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            
                                        </InputAdornment>
                                    )
                                }}
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                }}
                                />
                            </div>
                            <div className="email">
                                <TextField
                                id="email"
                                label="Email"
                                type="text"
                                variant="outlined"
                                placeholder="email@organization.edu"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email/>
                                            <div className="Vertical-line"/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            
                                        </InputAdornment>
                                    )
                                }}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                />
                            </div>
                            <div className="password">
                                <TextField
                                id="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                placeholder="***********"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKey/>
                                            <div className="Vertical-line"/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={showPwHandler}>
                                                {pushed ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                />
                            </div>
                        </div>
                        <br/>
                        <Button
                            disableElevation
                            variant="contained"
                            onClick={submitHandler}
                        >
                            Submit
                        </Button>
                </FormControl>                
            </Box>
        </div>
    );
}