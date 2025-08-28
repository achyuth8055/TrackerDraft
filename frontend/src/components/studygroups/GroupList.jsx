import React from 'react';

// --- SVG Icons ---
const HashIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 9H19" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 15H19" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 5L7 19" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 5L15 19" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );
const SearchIcon = () => ( <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );


const GroupList = ({ groups, activeGroupId, setActiveGroupId, onFindGroupsClick }) => {
  return (
    <div className="group-list-container">
      <div className="group-list-header">
        <span>Study Groups</span>
      </div>
      
      {/* --- Redesigned Search/Create Button --- */}
      <div className="find-create-bar" onClick={onFindGroupsClick}>
        <SearchIcon />
        <span>Find or create a group...</span>
      </div>

      <nav className="group-list">
        {groups.map(group => (
          <button key={group._id} className={`group-list-item ${activeGroupId === group._id ? 'active' : ''}`} onClick={() => setActiveGroupId(group._id)}>
            <HashIcon /> {group.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default GroupList;