import React, { useContext } from 'react'; // Import useContext
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'; // Import AuthContext

// --- SVG Icon Components (no changes) ---
const DashboardIcon = () => ( <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="iconGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="var(--premium-cyan)" /><stop offset="1" stopColor="var(--premium-pink)" /></linearGradient></defs><path d="M10 3H4C3.44772 3 3 3.44772 3 4V10C3 10.5523 3.44772 11 4 11H10C10.5523 11 11 10.5523 11 10V4C11 3.44772 10.5523 3 10 3Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 13H14C13.4477 13 13 13.4477 13 14V20C13 20.5523 13.4477 21 14 21H20C20.5523 21 21 20.5523 21 20V14C21 13.4477 20.5523 13 20 13Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 13H4C3.44772 13 3 13.4477 3 14V20C3 20.5523 3.44772 21 4 21H10C10.5523 21 11 20.5523 11 20V14C11 13.4477 10.5523 13 10 13Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 3H14C13.4477 3 13 3.44772 13 4V10C13 10.5523 13.4477 11 14 11H20C20.5523 11 21 10.5523 21 10V4C21 3.44772 20.5523 3 20 3Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );
const TasksIcon = () => ( <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="iconGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="var(--premium-cyan)" /><stop offset="1" stopColor="var(--premium-pink)" /></linearGradient></defs><path d="M8 6H21" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12H21" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 18H21" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 6H3.01" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 12H3.01" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 18H3.01" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );
const PlanIcon = () => ( <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="iconGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="var(--premium-cyan)" /><stop offset="1" stopColor="var(--premium-pink)" /></linearGradient></defs><path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );
const GroupsIcon = () => ( <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="iconGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="var(--premium-cyan)" /><stop offset="1" stopColor="var(--premium-pink)" /></linearGradient></defs><path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 21V19C22.9992 17.0622 21.6252 15.4206 19.764 15.05" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3.13C17.3135 3.55921 18.3498 4.67329 18.771 6" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );
const LogoutIcon = () => ( <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );


const Sidebar = () => {
  const { user, logoutAction } = useContext(AuthContext);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">ProdigyHub</div>
      
      {user && (
        <div className="sidebar-profile">
          <div className="profile-avatar">{user.name ? user.name.charAt(0).toUpperCase() : '?'}</div>
          <div className="profile-name">{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</div>
        </div>
      )}

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          <DashboardIcon /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/daily-tasks" className="sidebar-link">
          <TasksIcon /> <span>Daily Tasks</span>
        </NavLink>
        <NavLink to="/study-plan" className="sidebar-link">
          <PlanIcon /> <span>Study Plan</span>
        </NavLink>
        <NavLink to="/study-groups" className="sidebar-link">
          <GroupsIcon /> <span>Study Groups</span>
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <button onClick={logoutAction} className="sidebar-logout-btn">
            <LogoutIcon /> <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;