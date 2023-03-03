import React from 'react';

function LogoutButton(props) {
    function handleLogout() {
        //logout
        //redirect to login page
    }
    const buttonStyle = {
        position: 'absolute',
        top: 10,
        right: 10
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
    
}

export default LogoutButton;