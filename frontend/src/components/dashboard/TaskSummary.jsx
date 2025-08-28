import React from 'react';

const TaskSummary = ({ summary }) => {
  return (
    <div className="widget-card">
      <h3 className="widget-title">Task Summary</h3>
      <div className="task-summary-stats">
        <div className="task-stat-item">
          <div className="task-stat-number">{summary ? summary.completed : 0}</div>
          <div className="task-stat-label">Tasks Completed</div>
        </div>
        <div className="task-stat-item">
          <div className="task-stat-number">{summary ? summary.upcoming : 0}</div>
          <div className="task-stat-label">Upcoming Tasks</div>
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;
