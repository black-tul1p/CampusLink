import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const AccountSettingsButton = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/account-settings');
  };

  return (
    <button onClick={handleClick}>
      <FontAwesomeIcon icon={faCog} /> Account Settings
    </button>
  );
};

export default AccountSettingsButton;
