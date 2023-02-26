import React from 'react';
import CourseContentCSS from "./CourseContent.css"
import NavBar from './NavBar';
import Banner from "../Assets/banner_logo.jpg";


export default function CourseContent() {


    return ( <div>
            <div className='CCBannerContainer'>
                <img className="CCBanner" src={Banner} alt="CampusLink Logo" />
            </div>
            <h1 className="CCHeader">Course Test</h1>
            <p className='Navbar'>huh</p>
    </div>
    );
}