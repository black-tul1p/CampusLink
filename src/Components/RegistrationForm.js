<<<<<<< HEAD
import React, { Component } from "react";
import "./RegistrationForm.css"

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
        <div className="form">
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
=======
import React, {useState} from "react";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
};

export default function RegistrationForm() {
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const {name, value} = e.targer;
        setValues({
            ...values,
            [name]: value,
        });
    };

    return(
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
