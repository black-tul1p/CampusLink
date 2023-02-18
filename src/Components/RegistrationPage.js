import React, {useState} from "react";
import banner from '../images/campuslink_banner.jpg'
import RegistrationForm from "./RegistrationForm";
import "./RegistrationPage.css"

function RegistrationPage() {
    return(
        <div className="RegistrationPage">
            <header className="RegistrationPage-header">
                <img src={banner} className="banner" alt="banner"/>
                <h2>Register</h2>
                <RegistrationForm></RegistrationForm>
            </header>
        </div>
    )
}

export default RegistrationPage