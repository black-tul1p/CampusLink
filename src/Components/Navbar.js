import React, { useContext, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Backend/user";
import { AuthContext } from "../Contexts/AuthContext";
import { isAdmin } from "../Backend/user";

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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAdminRole, setIsAdminRole] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClick = (event) => {
    handleClose(event);
    handleLogout();
    logoutUser();
    navigate("/");
  };

  const navigateToProfile = (event) => {
    //handleClose(event);
    navigate("/profile");
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

  useEffect(() => {
    const checkRole = async () => {
      const role = await isAdmin(user.email);
      console.log(isAdmin ? "Admin Account Detected" : "Nope");
      setIsAdminRole(role);
    };

    checkRole();
  }, []);

  return (
    <Sidebar>
      <Tooltip
        title={<Typography style={{ fontSize: "1.5em" }}>Home</Typography>}
        placement="right"
      >
        <SidebarItem
          onClick={() => {
            if (!isAdminRole) navigate("/home");
            else navigate("/adminHome");
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
        {/* <Tooltip
          title={
            <Typography style={{ fontSize: "1.5em" }}>Notifications</Typography>
          }
          placement="right"
        >
          <SidebarButton
            onClick={() => {
              navigate("/announcements");
            }}
          >
            <SidebarIcon>
              <Notifications style={{ color: "#fff" }} />
            </SidebarIcon>
          </SidebarButton>
        </Tooltip> */}
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
                      {!isAdminRole && (
                        <MenuItem onClick={navigateToProfile}>
                          <Settings
                            fontSize="small"
                            sx={{ mr: 1 }}
                            style={{ color: "rgb(16,46,68" }}
                          />
                          Account Settings
                        </MenuItem>
                      )}
                      <MenuItem onClick={handleClick}>
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
}
