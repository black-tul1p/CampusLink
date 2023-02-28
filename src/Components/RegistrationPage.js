<<<<<<< HEAD
<<<<<<< HEAD
import React, {useState} from "react";
import banner from '../images/campuslink_banner.jpg'
import RegistrationForm from "./RegistrationForm";
=======
import React from "react";
import banner from '../images/campuslink_banner.jpg'
>>>>>>> 816cbd1 (Added banner to registration page)
=======
import React, {useState} from "react";
import banner from '../images/campuslink_banner.jpg'
import RegistrationForm from "./RegistrationForm";
>>>>>>> 650e964 (Created first iteration of registration form)
import "./RegistrationPage.css"
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function RegistrationPage() {
    return(
<<<<<<< HEAD
<<<<<<< HEAD
        <div className="RegistrationPage">
            <header className="RegistrationPage-header">
                <img src={banner} className="banner" alt="banner"/>
                <RegistrationForm></RegistrationForm>
                <div style={{color: "white", alignSelf: "center"}}>
                            Already have an account?
                            <Link to="login">
                            <Button 
                            className="Mini-button"
                            containerElement={<Link to="/login"/>}
                            >
                                Log in
                            </Button>
                            </Link>
                        </div>
            </header>
        </div>
=======
        <>
        <div className = "banner">
            <img src = {banner} className = "banner" alt = "banner"/>
        </div>
        </>
>>>>>>> 816cbd1 (Added banner to registration page)
=======
        <div className="RegistrationPage">
            <header className="RegistrationPage-header">
                <img src={banner} className="banner" alt="banner"/>
                <h2>Register</h2>
                <RegistrationForm></RegistrationForm>
            </header>
        </div>
>>>>>>> 945068e (Added background and made banner scalable)
    )
}

export default RegistrationPage