import React from 'react';

// Import the components we just created
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import WeeklyProgressChart from '../components/dashboard/WeeklyProgressChart';
import TaskSummary from '../components/dashboard/TaskSummary';
import SubjectProgress from '../components/dashboard/SubjectProgress';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main-content">
        <Header title="Dashboard" />
        <div className="dashboard-widgets-grid">
          <div className="widget-span-2">
            <WeeklyProgressChart />
          </div>
          <TaskSummary />
          <div className="widget-span-3">
            <SubjectProgress />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;