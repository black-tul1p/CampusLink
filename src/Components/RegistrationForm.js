import React, { Component , useState, IconButton} from "react";
import "./RegistrationForm.css"
import Banner from "../Assets/banner_logo.jpg";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Email, VpnKey, AccountCircleOutlined, VisibilityOff, Visibility } from "@mui/icons-material";

class RegistrationForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
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
        alert('First Name: ' + this.state.firstName + 'Last Name: ' 
            + this.state.lastName + 'Email: ' + this.state.email + 'Username: ' +
             this.state.username + 'Password: ' + this.state.password)
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
        <div>
            <Box className="Default-card">
                <img className="Banner-logo" src={Banner} alt="CampusLink Logo"/>
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
                                }}
                                defaultValue={this.state.firstName}
                                onChange={this.handleInputChange}
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
                                }}
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
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
                                }}
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="password">
                                <TextField
                                id="password"
                                label="Password"
                                type="text"
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
                                    
                                }}
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        <br/>
                        <Button
                            disableElevation
                            variant="contained"
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </Button>
                </FormControl>                
            </Box>
        </div>
        );
    }
}

export default RegistrationForm