import React, { Component } from "react";

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
        var x = document.getElementById("pswd");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    
    render() {
    return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    First Name:
                    <input
                        name="firstName"
                        type="text"
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                        placeholder="First Name"
                    />
                </label>
                <br/>
                <label>
                    Last Name:
                    <input
                        name="lastName"
                        type="text"
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                        placeholder="Last Name"
                    />
                </label>
                <br/>
                <label>
                    Email:
                    <input
                        name="email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        placeholder="Email"
                    />
                </label>
                <br/>
                <label>
                    Username:
                    <input
                        name="username"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        placeholder="Username"
                    />
                </label>
                <br/>
                <label>
                    Password:
                    <input
                        id="pswd"
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
                    <label>Show Password</label>
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default RegistrationForm