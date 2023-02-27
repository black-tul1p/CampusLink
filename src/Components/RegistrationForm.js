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
  IconButton,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";
import { Email, VpnKey, AccountCircleOutlined, VisibilityOff, Visibility } from "@mui/icons-material";
import { createStudent } from "../Backend/student";
import { createInstructor } from "../Backend/instructor";

export default function RegistrationForm() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pushed, setPushed] = useState(true);
    const [accountType, setAccountType] = useState("student");

    const submitHandler = (e) => {
        e.preventDefault();
        if (accountType === "student") {
            createStudent(firstName, lastName, email, password);
        alert("First Name: " + firstName + "\n" +
            "Last Name: " + lastName + "\n" +
            "Email: " + email + "\n" +
            "Password: " + password + "\n" + 
            "Account Type: " + accountType + "\n")
        } else {
            createInstructor(firstName, lastName, email, password);
            alert("First Name: " + firstName + "\n" +
            "Last Name: " + lastName + "\n" +
            "Email: " + email + "\n" +
            "Password: " + password + "\n" + 
            "Account Type: " + accountType + "\n")
        }
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

    const changeAccountType = (e, newAccountType) => {
        if (newAccountType !== null) {
            setAccountType(newAccountType)
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
                        <div className="toggleButton">
                        <ToggleButtonGroup
                            size="medium"
                            value={accountType}
                            exclusive
                            onChange={changeAccountType}
                        >
                            <ToggleButton value="student">
                                Student
                            </ToggleButton>
                            <ToggleButton value="instructor">
                                Instructor
                            </ToggleButton>
                        </ToggleButtonGroup>
                        </div>
                        <br/>
                        <Button
                            disableElevation
                            variant="contained"
                            onClick={submitHandler}
                        >
                            Sign Up
                        </Button>
                </FormControl>                
            </Box>
        </div>
    );
}