import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import WeeklyProgressChart from '../components/dashboard/WeeklyProgressChart';
import TaskSummary from '../components/dashboard/TaskSummary';
import SubjectProgress from '../components/dashboard/SubjectProgress';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      if (!token) return;

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStats(res.data.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [token]);


  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-main-content">
          <Header title="Dashboard" />
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main-content">
        <Header title="Dashboard" />
        <div className="dashboard-widgets-grid">
          <div className="widget-span-2">
            {/* WeeklyProgressChart can be made dynamic in a similar way if needed */}
            <WeeklyProgressChart /> 
          </div>
          <TaskSummary summary={stats?.taskSummary} />
          <div className="widget-span-3">
            <SubjectProgress subjects={stats?.subjectProgress} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
