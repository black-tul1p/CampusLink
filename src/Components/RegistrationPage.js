import React, {useState} from "react";
import banner from '../images/campuslink_banner.jpg'
import RegistrationForm from "./RegistrationForm";
import "./RegistrationPage.css"
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function RegistrationPage() {
    return(
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
    )
}

export default RegistrationPage