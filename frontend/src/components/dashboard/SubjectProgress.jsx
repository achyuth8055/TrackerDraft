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

const SubjectProgress = () => {
  return (
    <div className="widget-card">
      <h3 className="widget-title">Subject Progress</h3>
      <div className="subject-progress-container">
        <SubjectProgressBar 
          subject="Data Structures & Algo" 
          percentage={75} 
          gradient="linear-gradient(to right, var(--premium-cyan), #34D399)" 
        />
        <SubjectProgressBar 
          subject="System Design" 
          percentage={40} 
          gradient="linear-gradient(to right, var(--premium-pink), #FBBF24)" 
        />
        <SubjectProgressBar 
          subject="Core Java" 
          percentage={90} 
          gradient="linear-gradient(to right, var(--premium-purple), var(--premium-pink))" 
        />
      </div>
    </div>
  );
};

export default SubjectProgress;