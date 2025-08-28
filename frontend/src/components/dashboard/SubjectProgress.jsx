import React from 'react';

const SubjectProgressBar = ({ subject, percentage, topics }) => (
  <div className="subject-progress-item">
    <div className="subject-info">
      <span className="subject-name">{subject}</span>
      <span className="subject-topics">{topics || 0} topics</span>
    </div>
    <div className="subject-progress-bar">
      <div 
        className="subject-progress-fill" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <span className="subject-progress-percentage">{percentage}%</span>
  </div>
);

const SubjectProgress = ({ subjects }) => {
  return (
    <div className="widget-card">
      <h3 className="widget-title">Subject Progress</h3>
      <div className="subject-progress-list">
        {subjects && subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <SubjectProgressBar 
              key={index}
              subject={subject.name} 
              percentage={subject.progress} 
              topics={subject.length}
            />
          ))
        ) : (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
            No subjects found. Go to the Study Plan page to add one!
          </p>
        )}
      </div>
    </div>
  );
};

export default SubjectProgress;
