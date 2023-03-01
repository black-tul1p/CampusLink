<<<<<<< HEAD
import React, { useState } from "react";
import logo from "../Assets/campuslink_logo.jpg";
import menu_logo from "../Assets/menu_logo.jpg";
import settings_logo from "../Assets/settings_logo.jpg";
import notification_logo from "../Assets/notification_logo.jpg";
import user_logo from "../Assets/user_logo.jpg";
import "./NavBar.css";

function NavBar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-container">
            <img src={logo} className="logo" alt="logo" />
          </div>
          <div className="menu-logo-container">
            <img src={menu_logo} className="menu_logo" alt="menu" />
          </div>
          <div className="notification-logo-container">
            <img
              src={notification_logo}
              className="notification_logo"
              alt="notifications"
            />
          </div>
          <div className="settings-logo-container">
            <img src={settings_logo} className="settings_logo" alt="settings" />
          </div>
          <div className="user-logo-container">
            <img src={user_logo} className="user_logo" alt="user profile" />
          </div>
        </div>
      </nav>
    </>
  );
=======
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/logo.jpg';
import menu_logo from '../Images/menu_logo.jpg';
import settings_logo from '../Images/settings_logo.jpg';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import Person2Icon from '@mui/icons-material/Person2';

import notification_logo from '../Images/notification_logo.jpg';
import user_logo from '../Images/user_logo.jpg';
import LogoutContainer from './LogoutContainer';
import "./NavBar.css";

function NavBar() {
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(!open);
    }
    const [click, setClick] = React.useState(false);
    const handleClick = () => {
        setClick(!click);
    }

    return (
        <>
        <nav className="navbar">
            <div className = "navbar-container">
                <div className = "logo-container">
                    <img src={logo} className = "logo" alt="logo"/>
                </div>
                <div className = "menu-logo-container">
                    <Link to="/">
                        <MenuIcon fontSize="large" sx={{ color: "#F0F8FF" }}/>
                    </Link>
                </div>
                <div onClick={handleOpen} className = "notification-logo-container">
                    <NotificationsIcon fontSize="large" sx={{ color: "#F0F8FF" }} />
                    {/* <div className = "notification-dropdown">
                        {open ? (
                            <ul className = "notifications-list">
                                <li className="notification">
                                    <button>Notification 1</button>
                                </li>
                                <li>
                                    <button>Notification 2</button>
                                </li>
                            </ul>
                        ): null}
                    </div> */}
                </div>
                <div className = "settings-logo-container">
                    <Link to="/Settings">
                        <SettingsIcon fontSize="large" sx={{ color: "#F0F8FF" }} />
                    </Link>
                </div>
                <div onClick= {handleClick} className = "user-logo-container">
                    {click ? <Person2Icon fontSize="large" sx={{ color: "#F0F8FF" }}/>: <Person2Icon fontSize="large" sx={{ color: "#F0F8FF" }} />}
                </div>  
            </div>
            {click && <LogoutContainer/>} 
        </nav>
        </>
  )
>>>>>>> e212a60 (navigates to courses and settings pages - 1.5 hours)
}

export default NavBar;
