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
}

export default NavBar;
