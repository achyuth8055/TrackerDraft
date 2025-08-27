import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="dashboard-header">
      <h1 className="header-title">{title}</h1>
      <div className="header-actions">
        <input type="search" placeholder="Search..." className="header-search" />
      </div>
    </header>
  );
};

export default Header;