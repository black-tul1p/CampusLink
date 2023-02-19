import React from 'react';

const AccountSettingsPage = () => {
  return (
    <div>
      <h2>Account Settings</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default AccountSettingsPage;
