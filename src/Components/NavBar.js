<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutContainer from "./LogoutContainer";
>>>>>>> 5b0adfb (Fixed routing)
import "./NavBar.css";
=======
import React from "react";
import styled from "@emotion/styled";
import logo_mini from "../Assets/campuslink_logo.jpg";
import { Notifications, Settings, AccountCircle } from "@mui/icons-material";
>>>>>>> 8bb6cac (Improved Navbar and Homepage functionality)
=======
import React, { useState } from "react";
import styled from "@emotion/styled";
import logo_mini from "../Assets/campuslink_logo.jpg";
import {
  Notifications,
  Settings,
  AccountCircle,
  ExitToApp,
  QuestionMark,
} from "@mui/icons-material";
import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRef } from "react";
<<<<<<< HEAD
>>>>>>> fe91d3d (Fixed Navbar Account popup)
=======
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
>>>>>>> e8a81a1 (Fixed navigation functionality)
=======
import { logoutUser } from "../Backend/user";
>>>>>>> 4c75083 (Added logout functionality to Navbar)

// CSS Styles
const Sidebar = styled.div`
  flex-shrink: 0;
  width: 5em;
  height: 100vh;
  background-color: #20232a;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SidebarItem = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4em;
  color: #fff;
  cursor: pointer;
  // transition: transform 0.15s ease-out;
  // &:hover {
  //   transform: scale(1.5);
  // }
`;

const SidebarText = styled.span`
  font-size: 1.25em;
  font-weight: 500;
  margin-left: 1em;

  @media (max-width: 768px) {
    font-size: 1em;
    margin-left: 0.5em;
  }
`;

const SidebarDivider = styled.div`
  flex-shrink: 0;
  height: 1px;
  background-color: #3c3f4c;
  margin: 0.25em 1em;
`;

const SidebarRow = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 1em;
`;

const SidebarButton = styled.div`
  display: flex;
  align-items: center;
  height: 3em;
  padding: 0 25%;
  color: #fff;
  cursor: pointer;
`;

const SidebarIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  &:hover {
    background-color: teal;
  }
`;

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogout = (event) => {
    handleClose(event);
    logoutUser();
    navigate("/");
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
<<<<<<< HEAD
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-container">
            <img src={logo} className="logo" alt="logo" />
          </div>
          <div
            className="menu-logo-container"
            onClick={() => {
              navigate("/");
            }}
          >
            <MenuIcon fontSize="large" sx={{ color: "#F0F8FF" }} />
          </div>
          <div onClick={handleOpen} className="notification-logo-container">
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
<<<<<<< HEAD
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
=======
          </div>
          <div
            className="settings-logo-container"
            onClick={() => {
              navigate("/settings");
            }}
          >
            <SettingsIcon fontSize="large" sx={{ color: "#F0F8FF" }} />
          </div>
          <div
            id="user-icon"
            onClick={handleClick}
            className="user-logo-container"
          >
            {click ? (
              <Person2Icon fontSize="large" sx={{ color: "#F0F8FF" }} />
            ) : (
              <Person2Icon fontSize="large" sx={{ color: "#F0F8FF" }} />
            )}
          </div>
        </div>
        {click && <LogoutContainer />}
      </nav>
    </>
  );
>>>>>>> 5b0adfb (Fixed routing)
}
=======
    <Sidebar>
      <Tooltip
        title={<Typography style={{ fontSize: "1.5em" }}>Home</Typography>}
        placement="right"
      >
        <SidebarItem
          onClick={() => {
            navigate("/home");
          }}
        >
          <img src={logo_mini} style={{ width: "2.5em" }} alt="" />
        </SidebarItem>
      </Tooltip>
      <SidebarDivider />
      <SidebarRow>
        <Tooltip
          title={<Typography style={{ fontSize: "1.5em" }}>FAQ</Typography>}
          placement="right"
        >
          <SidebarButton
            onClick={() => {
              navigate("/faq");
            }}
          >
            <SidebarIcon>
              <QuestionMark style={{ color: "#fff" }} />
            </SidebarIcon>
          </SidebarButton>
        </Tooltip>
        <Tooltip
          title={
            <Typography style={{ fontSize: "1.5em" }}>Notifications</Typography>
          }
          placement="right"
        >
          <SidebarButton>
            <SidebarIcon>
              <Notifications style={{ color: "#fff" }} />
            </SidebarIcon>
          </SidebarButton>
        </Tooltip>
        <Tooltip
          title={
            <Typography style={{ fontSize: "1.5em" }}>Settings</Typography>
          }
          placement="right"
        >
          <SidebarButton
            onClick={() => {
              navigate("/settings");
            }}
          >
            <SidebarIcon>
              <Settings style={{ color: "#fff" }} />
            </SidebarIcon>
          </SidebarButton>
        </Tooltip>
        {/* <Tooltip
          title={<Typography style={{ fontSize: "1.5em" }}>Account</Typography>}
          placement="right"
        > */}
        <SidebarButton>
          <SidebarIcon
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            style={{ color: "#fff" }}
          >
            <AccountCircle />
          </SidebarIcon>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            placement="right"
            transition
            disablePortal
            popperOptions={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 20],
                  },
                },
              ],
            }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "right" ? "center left" : "center right",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>
                        <Settings
                          fontSize="small"
                          sx={{ mr: 1 }}
                          style={{ color: "rgb(16,46,68" }}
                        />
                        Account Settings
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <ExitToApp
                          fontSize="small"
                          sx={{ mr: 1 }}
                          style={{ color: "rgb(16,46,68" }}
                        />
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </SidebarButton>
        {/* </Tooltip> */}
      </SidebarRow>
    </Sidebar>
  );
<<<<<<< HEAD
};
>>>>>>> 8bb6cac (Improved Navbar and Homepage functionality)

export default NavBar;
=======
}
>>>>>>> fe91d3d (Fixed Navbar Account popup)
