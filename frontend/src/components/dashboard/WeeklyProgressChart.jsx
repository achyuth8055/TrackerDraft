import React from 'react';

const WeeklyProgressChart = () => {
  const weeklyData = [
    { day: 'Mon', tasks: 5 },
    { day: 'Tue', tasks: 7 },
    { day: 'Wed', tasks: 4 },
    { day: 'Thu', tasks: 8 },
    { day: 'Fri', tasks: 6 },
    { day: 'Sat', tasks: 9 },
    { day: 'Sun', tasks: 3 },
  ];
  const maxTasks = Math.max(...weeklyData.map(d => d.tasks));

  return (
    <div className="widget-card">
      <h3 className="widget-title">Weekly Progress</h3>
      <div className="chart-container">
        {weeklyData.map((data) => (
          <div className="chart-bar-group" key={data.day}>
            <div className="chart-bar" style={{ height: `${(data.tasks / maxTasks) * 100}%` }}>
              <div className="chart-bar-tooltip">{data.tasks} tasks</div>
            </div>
            <div className="chart-label">{data.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyProgressChart;