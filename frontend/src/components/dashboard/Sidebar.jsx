import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

// Premium SVG Icon Components with Illustrations
const DashboardIcon = () => ( 
  <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dashboardGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--premium-cyan)" />
        <stop offset="1" stopColor="var(--premium-pink)" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="7" height="7" rx="2" stroke="url(#dashboardGradient)" strokeWidth="2" fill="none"/>
    <rect x="14" y="3" width="7" height="7" rx="2" stroke="url(#dashboardGradient)" strokeWidth="2" fill="none"/>
    <rect x="3" y="14" width="7" height="7" rx="2" stroke="url(#dashboardGradient)" strokeWidth="2" fill="none"/>
    <rect x="14" y="14" width="7" height="7" rx="2" stroke="url(#dashboardGradient)" strokeWidth="2" fill="none"/>
  </svg>
);

const TasksIcon = () => ( 
  <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tasksGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--premium-cyan)" />
        <stop offset="1" stopColor="var(--premium-pink)" />
      </linearGradient>
    </defs>
    <path d="M8 6H21" stroke="url(#tasksGradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 12H21" stroke="url(#tasksGradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 18H21" stroke="url(#tasksGradient)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="4" cy="6" r="2" fill="url(#tasksGradient)"/>
    <circle cx="4" cy="12" r="2" fill="url(#tasksGradient)"/>
    <circle cx="4" cy="18" r="2" fill="url(#tasksGradient)"/>
  </svg>
);

const PlanIcon = () => ( 
  <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="planGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--premium-cyan)" />
        <stop offset="1" stopColor="var(--premium-pink)" />
      </linearGradient>
    </defs>
    <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="url(#planGradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="url(#planGradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 7H16" stroke="url(#planGradient)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 11H16" stroke="url(#planGradient)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 15H13" stroke="url(#planGradient)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const GroupsIcon = () => ( 
  <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="groupsGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--premium-cyan)" />
        <stop offset="1" stopColor="var(--premium-pink)" />
      </linearGradient>
    </defs>
    <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="url(#groupsGradient)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="9" cy="7" r="4" stroke="url(#groupsGradient)" strokeWidth="2" fill="none"/>
    <path d="M23 21V19C22.9992 17.0622 21.6252 15.4206 19.764 15.05" stroke="url(#groupsGradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 3.13C17.8683 3.67056 19.2183 5.41963 19.2183 7.48211C19.2183 9.54459 17.8683 11.2937 16 11.8342" stroke="url(#groupsGradient)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LogoutIcon = () => ( 
  <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const Sidebar = () => {
  const { user, logoutAction } = useContext(AuthContext);

  return (
    <>
      <style>
        {`
          .sidebar {
            width: 260px;
            flex-shrink: 0;
            background: linear-gradient(180deg, var(--dark-bg-secondary) 0%, rgba(22, 27, 34, 0.95) 100%);
            border-right: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            padding: 1.5rem;
            position: relative;
            overflow: hidden;
          }
          
          .sidebar::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--premium-cyan), transparent);
            opacity: 0.5;
          }

          .sidebar-logo {
            font-size: 1.75rem;
            font-weight: 800;
            text-align: center;
            margin-bottom: 2rem;
            background: linear-gradient(135deg, var(--premium-cyan), var(--premium-pink));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            font-family: 'JetBrains Mono', monospace;
            letter-spacing: -0.02em;
            position: relative;
          }

          .sidebar-logo::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 2px;
            background: linear-gradient(90deg, var(--premium-cyan), var(--premium-pink));
            border-radius: 1px;
          }

          .sidebar-profile {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.5rem;
            background: linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(0, 191, 255, 0.05));
            border-radius: 1rem;
            margin-bottom: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
          }

          .sidebar-profile::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: left 0.5s ease;
          }

          .sidebar-profile:hover::before {
            left: 100%;
          }

          .profile-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--premium-purple), var(--premium-pink));
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 1.2rem;
            box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
            position: relative;
            z-index: 2;
          }

          .profile-info {
            flex: 1;
            position: relative;
            z-index: 2;
          }

          .profile-name {
            font-weight: 700;
            color: var(--text-primary);
            font-size: 1.1rem;
            margin-bottom: 0.25rem;
          }

          .profile-status {
            font-size: 0.8rem;
            color: var(--premium-cyan);
            font-weight: 500;
          }

          .sidebar-nav {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            flex: 1;
          }

          .sidebar-link {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 1.25rem;
            border-radius: 0.75rem;
            text-decoration: none;
            color: var(--text-secondary);
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            border: 1px solid transparent;
          }

          .sidebar-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
            transition: left 0.3s ease;
          }

          .sidebar-link:hover::before {
            left: 100%;
          }

          .sidebar-link:hover {
            background: rgba(255, 255, 255, 0.05);
            color: var(--text-primary);
            transform: translateX(4px);
            border-color: rgba(255, 255, 255, 0.1);
          }

          .sidebar-link.active {
            background: linear-gradient(135deg, var(--premium-purple), var(--premium-pink));
            color: white;
            box-shadow: 0 8px 25px rgba(255, 105, 180, 0.25);
            transform: translateX(4px);
          }

          .sidebar-link.active .sidebar-icon path,
          .sidebar-link.active .sidebar-icon circle,
          .sidebar-link.active .sidebar-icon rect {
            stroke: white;
            fill: white;
          }

          .sidebar-link:hover .sidebar-icon {
            transform: scale(1.1);
          }

          .sidebar-icon {
            width: 22px;
            height: 22px;
            flex-shrink: 0;
            transition: transform 0.3s ease;
          }

          .sidebar-footer {
            margin-top: auto;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border-color);
          }

          .sidebar-logout-btn {
            display: flex;
            align-items: center;
            gap: 1rem;
            width: 100%;
            padding: 1rem 1.25rem;
            border-radius: 0.75rem;
            text-decoration: none;
            color: var(--text-secondary);
            font-weight: 600;
            background: none;
            border: 1px solid transparent;
            cursor: pointer;
            font-size: 0.95rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .sidebar-logout-btn:hover {
            background: rgba(255, 105, 180, 0.1);
            color: var(--premium-pink);
            border-color: rgba(255, 105, 180, 0.2);
            transform: translateX(4px);
          }

          .sidebar-logout-btn .sidebar-icon {
            transition: all 0.3s ease;
          }

          .sidebar-logout-btn:hover .sidebar-icon {
            transform: scale(1.1);
          }

          .sidebar-logout-btn:hover .sidebar-icon path {
            stroke: var(--premium-pink);
          }
        `}
      </style>
      <aside className="sidebar">
        <div className="sidebar-logo">&lt;trackr/&gt;</div>
        
        {user && (
          <div className="sidebar-profile">
            <div className="profile-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : '?'}
            </div>
            <div className="profile-info">
              <div className="profile-name">
                {user.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'User'}
              </div>
              <div className="profile-status">● Online</div>
            </div>
          </div>
        )}

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="sidebar-link">
            <DashboardIcon />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/daily-tasks" className="sidebar-link">
            <TasksIcon />
            <span>Daily Tasks</span>
          </NavLink>
          <NavLink to="/study-plan" className="sidebar-link">
            <PlanIcon />
            <span>Study Plan</span>
          </NavLink>
          <NavLink to="/study-groups" className="sidebar-link">
            <GroupsIcon />
            <span>Study Groups</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button onClick={logoutAction} className="sidebar-logout-btn">
            <LogoutIcon />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;