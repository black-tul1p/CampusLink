import React from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import FAQ from "./FAQ";
// import Account from "./Account";
import SettingsPage from "./Settings";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  min-width: 620px;
`;

export const PageList = {
  Home: "/home",
  Settings: "/settings",
  Account: "/account",
  FAQ: "/faq",
};

export default function Landing(props) {
  var content = null;
  if (props.page === PageList.Home) {
    content = <Home theme={props.theme} />;
    //   } else if (props.page === PageList.Account) {
    //     content = <Account theme={props.theme} />;
  } else if (props.page === PageList.Settings) {
    content = <SettingsPage theme={props.theme} />;
  } else if (props.page === PageList.FAQ) {
    content = <FAQ theme={props.theme} />;
  } else {
    content = <p>Invalid page.</p>;
  }

  return (
    <Container>
      <Navbar />
      {content}
    </Container>
  );
}
