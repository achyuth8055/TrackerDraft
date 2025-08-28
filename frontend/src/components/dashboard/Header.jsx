import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Header = ({ title }) => {
  const { user } = useContext(AuthContext);

  return (
    <header className="dashboard-header">
      <h1 className="header-title">{title}</h1>
      <div className="header-actions">
        <input type="search" placeholder="Search..." className="header-search" />
        {user && (
          <div className="header-profile-info">
            <span className="header-welcome">Welcome back, {user.name || 'User'}!</span>
            <div className="header-profile-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : '?'}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
