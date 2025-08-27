import React from 'react';

// A simple hash icon for the groups
const HashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 9H19" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 15H19" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 5L7 19" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 5L15 19" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const GroupList = ({ groups, activeGroupId, setActiveGroupId }) => {
  return (
    <div className="group-list-container">
      <div className="group-list-header">
        Study Groups
      </div>
      <nav className="group-list">
        {groups.map(group => (
          <button
            key={group.id}
            className={`group-list-item ${activeGroupId === group.id ? 'active' : ''}`}
            onClick={() => setActiveGroupId(group.id)}
          >
            <HashIcon />
            {group.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default GroupList;