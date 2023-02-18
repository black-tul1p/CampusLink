<<<<<<< HEAD
import React, {useState} from "react";
import banner from '../images/campuslink_banner.jpg'
import RegistrationForm from "./RegistrationForm";
=======
import React from "react";
import banner from '../images/campuslink_banner.jpg'
>>>>>>> 816cbd1 (Added banner to registration page)
import "./RegistrationPage.css"

function RegistrationPage() {
    return(
<<<<<<< HEAD
        <div className="RegistrationPage">
            <header className="RegistrationPage-header">
                <img src={banner} className="banner" alt="banner"/>
                <h2>Register</h2>
                <RegistrationForm></RegistrationForm>
            </header>
        </div>
=======
        <>
        <div className = "banner">
            <img src = {banner} className = "banner" alt = "banner"/>
        </div>
        </>
>>>>>>> 816cbd1 (Added banner to registration page)
    )
}

export default RegistrationPage