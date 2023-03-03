import { useState } from "react";
import styled from "@emotion/styled";
import { Switch, FormControlLabel, FormGroup } from "@mui/material";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const SettingsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 1.5rem;
`;

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  return (
    <Container>
      <Title>Sample Settings</Title>
      <FormGroup>
        <SettingsItem>
          <Label>Dark Mode</Label>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={handleDarkModeChange}
                name="darkMode"
              />
            }
          />
        </SettingsItem>
        <SettingsItem>
          <Label>Notifications</Label>
          <FormControlLabel
            control={
              <Switch
                checked={notifications}
                onChange={handleNotificationsChange}
                name="notifications"
              />
            }
          />
        </SettingsItem>
      </FormGroup>
    </Container>
  );
}