import React from "react";
import banner from '../images/campuslink_banner.jpg'
import "./RegistrationPage.css"

function RegistrationPage() {
    return(
        <>
        <div className = "banner">
            <img src = {banner} className = "banner" alt = "banner"/>
        </div>
        </>
    )
}

export default RegistrationPage