import React from 'react';

// The component now accepts a 'data' prop and defaults it to an empty array.
const WeeklyProgressChart = ({ data = [] }) => {
  // Handle the case where there is no data to display
  if (!data || data.length === 0) {
    return (
      <div className="widget-card">
        <h3 className="widget-title">Weekly Progress</h3>
        <div className="chart-container" style={{ alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
          <p>No progress data available for this week.</p>
        </div>
      </div>
    );
  }

  // Calculate maxTasks based on the incoming data prop
  const maxTasks = Math.max(...data.map(d => d.tasks), 0);

  return (
    <div className="widget-card">
      <h3 className="widget-title">Weekly Progress</h3>
      <div className="chart-container">
        {/* Map over the 'data' prop */}
        {data.map((item) => (
          <div className="chart-bar-group" key={item.day}>
            <div
              className="chart-bar"
              style={{ height: maxTasks > 0 ? `${(item.tasks / maxTasks) * 100}%` : '0%' }}
            >
              <div className="chart-bar-tooltip">{item.tasks} tasks</div>
            </div>
            <div className="chart-label">{item.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyProgressChart;