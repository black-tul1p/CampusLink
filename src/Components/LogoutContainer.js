import React from 'react';
import "./NavBar.css";

function LogoutContainer() {
  return (
    <div  className='log-out-container' id='log-out-container'>
        <div className = 'log-out-triangle'>
        </div>
        <div className='log-out-bubble'>
            <h2>Username</h2>
            <button className='log-out-button'>Log Out</button>
        </div>
    </div>
  )
}

export default LogoutContainer
