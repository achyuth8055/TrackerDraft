import React from 'react';

import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import TodoList from '../components/dailytask/TodoList';
import PomodoroTimer from '../components/dailytask/PomodoroTimer';

const DailyTask = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main-content">
        <Header title="Daily Tasks" />
        <div className="daily-task-grid">
          <div className="todo-list-container">
            <TodoList />
          </div>
          <div className="pomodoro-timer-container">
            <PomodoroTimer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailyTask;