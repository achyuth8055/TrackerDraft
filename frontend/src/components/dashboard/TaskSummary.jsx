import React from 'react';

const TaskSummary = () => {
  return (
    <div className="widget-card">
      <h3 className="widget-title">Task Summary</h3>
      <div className="summary-grid">
        <div className="summary-item">
          <div className="summary-value gradient-text">12</div>
          <div className="summary-label">Tasks Completed</div>
        </div>
        <div className="summary-item">
          <div className="summary-value gradient-text">5</div>
          <div className="summary-label">Upcoming Tasks</div>
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;