<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React, { Component } from "react";
import "./RegistrationForm.css"
<<<<<<< HEAD
=======
import React, { Component , useState, IconButton} from "react";
=======
import React, { useState} from "react";
>>>>>>> 25bc7f3 (Rewrote file from JS class to Js function)
import "./RegistrationForm.css"
import Banner from "../Assets/banner_logo.jpg";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
  IconButton,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";
import { Email, VpnKey, AccountCircleOutlined, VisibilityOff, Visibility } from "@mui/icons-material";
<<<<<<< HEAD
>>>>>>> 6dc67e7 (Reformatting page to MUI, still have to fix errors)
=======
import { createStudent } from "../Backend/student";
<<<<<<< HEAD
>>>>>>> 6fb0b9a (Integrated registration submit to backend)
=======
import { createInstructor } from "../Backend/instructor";
>>>>>>> 7eb55e5 (Implemented account type option, createInstructor)

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
<<<<<<< HEAD
        );
    }
}

export default RegistrationForm
=======
import React, {useState} from "react";
=======
import React, { Component } from "react";
>>>>>>> df22882 (Second iteration of Registration Form using props)
=======
>>>>>>> ac38e18 (Cleaned up UI and formatted code for css styling)

class RegistrationForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        alert('First Name: ' + this.state.firstName + 'Last Name: ' + this.state.lastName + 'Email: ' + this.state.email + 'Username: ' + this.state.username + 'Password: ' + this.state.password)
        event.preventDefault();
    }

    showPassword(event) {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    
    render() {
    return(
<<<<<<< HEAD
<<<<<<< HEAD
        <form>
            <label>
                First Name:
                <input
                    value={values.firstName}
                    onChange={handleInputChange}
                    label="First Name"
                    />
            </label>
        </form>
    )
}
>>>>>>> 650e964 (Created first iteration of registration form)
=======
=======
        <div className="form">
>>>>>>> ac38e18 (Cleaned up UI and formatted code for css styling)
            <form onSubmit={this.handleSubmit}>
                <div className="firstName">
                    <label className="formLabel" for="firstName">
                        First Name:
                    </label>
                    <input
                        className="formInput"
                        name="firstName"
                        id="firstName"
                        type="text"
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                        placeholder="First Name"
                    />
                </div>
                <br/>
                <div className="lastName">
                    <label className="formLabel" for="lastName">
                        Last Name:
                    </label>
                    <input
                        className="formInput"
                        name="lastName"
                        id="lastName"
                        type="text"
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                        placeholder="Last Name"
                    />
                </div>
                <br/>
                <div className="email">
                    <label className="formLabel" for="email">
                        Email:
                    </label>
                    <input
                        className="formInput"
                        name="email"
                        id="email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        placeholder="Email"
                    />
                </div>
                <br/>
                <div className="username">
                    <label className="formLabel" for="username">
                        Username:
                    </label>
                    <input
                        className="formInput"
                        name="username"
                        id="username"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        placeholder="Username"
                    />
                </div>
                <br/>
                <div className="password">
                    <label className="formLabel" for="password">
                        Password:
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        placeholder="Password"
                    />
                    <input
                        type='checkbox'
                        onClick={this.showPassword}
                    />
                    <label className="formLabel" for="submit">Show Password</label>
                </div>
                <br/>
                <button className="submit" type="submit">Submit</button>
            </form>
        </div>
        );
    }
}

export default RegistrationForm
>>>>>>> df22882 (Second iteration of Registration Form using props)
=======
    );
}
>>>>>>> 25bc7f3 (Rewrote file from JS class to Js function)
