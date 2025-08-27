import React from 'react';

const SubjectProgressBar = ({ subject, percentage, gradient }) => (
  <div className="subject-progress-item">
    <div className="subject-info">
      <span className="subject-name">{subject}</span>
      <span className="subject-percentage">{percentage}%</span>
    </div>
    <div className="progress-bar-background">
      <div 
        className="progress-bar-foreground" 
        style={{ width: `${percentage}%`, background: gradient }}
      ></div>
    </div>
  </div>
);

const SubjectProgress = ({ subjects }) => {
  return (
    <div className="widget-card">
      <h3 className="widget-title">Subject Progress</h3>
      <div className="subject-progress-container">
        {subjects && subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <SubjectProgressBar 
              key={index}
              subject={subject.name} 
              percentage={subject.progress} 
              gradient={subject.gradient}
            />
          ))
        ) : (
          <p className="text-secondary">No subjects found. Go to the Study Plan page to add one!</p>
        )}
      </div>
    </div>
  );
};

export default SubjectProgress;