import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import TodoList from '../components/dailytask/TodoList';
import PomodoroTimer from '../components/dailytask/PomodoroTimer';

const DailyTasks = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main-content">
        <Header title="Daily Tasks" />
        <div className="daily-task-layout">
          <TodoList />
          <PomodoroTimer />
        </div>
      </main>
    </div>
  );
};

export default DailyTasks;