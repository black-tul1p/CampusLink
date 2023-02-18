import React from "react";
import banner from '../images/campuslink_banner.jpg'
import "./RegistrationPage.css"

function RegistrationPage() {
    return(
        <div className="RegistrationPage">
            <header className="RegistrationPage-header">
                <img src={banner} className="banner" alt="banner"/>
            </header>
        </div>
    )
}

export default RegistrationPage