import React from "react";
import styled from "@emotion/styled";
import logo_mini from "../Assets/campuslink_logo.jpg";
import { Notifications, Settings, AccountCircle } from "@mui/icons-material";

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
  transition: transform 0.15s ease-out;
  &:hover {
    transform: scale(1.5);
  }
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

const NavBar = () => {
  return (
    <Sidebar>
      <SidebarItem>
        <img src={logo_mini} style={{ width: "2.5em" }} />
        {/* <SidebarText>Home</SidebarText> */}
      </SidebarItem>
      <SidebarDivider />
      <SidebarRow>
        <SidebarButton>
          <SidebarIcon>
            <Notifications style={{ color: "#fff" }} />
          </SidebarIcon>
          {/* <SidebarText>Notifications</SidebarText> */}
        </SidebarButton>
        <SidebarButton>
          <SidebarIcon>
            <Settings style={{ color: "#fff" }} />
          </SidebarIcon>
          {/* <SidebarText>Settings</SidebarText> */}
        </SidebarButton>
        <SidebarButton>
          <SidebarIcon>
            <AccountCircle style={{ color: "#fff" }} />
          </SidebarIcon>
          {/* <SidebarText>User</SidebarText> */}
        </SidebarButton>
      </SidebarRow>
    </Sidebar>
  );
};

export default NavBar;
