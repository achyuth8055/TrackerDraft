import React, { useState } from 'react';

// A simple hash icon for the groups
const HashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 9H19" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 15H19" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 5L7 19" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 5L15 19" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const SubjectList = ({ subjects, activeSubjectId, setActiveSubjectId, onAddNewSubject }) => {
  const [newSubject, setNewSubject] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newSubject.trim() === '') return;
    onAddNewSubject(newSubject);
    setNewSubject('');
  };

  return (
    <div className="subject-list-container">
      <div>
        <div className="subject-list-header">
          Subjects / Tech
        </div>
        <nav className="subject-list">
          {subjects.map(subject => (
            <button
              key={subject._id}
              className={`subject-list-item ${activeSubjectId === subject._id ? 'active' : ''}`}
              onClick={() => setActiveSubjectId(subject._id)}
            >
              {subject.name}
            </button>
          ))}
        </nav>
      </div>
      <form onSubmit={handleSubmit} className="new-subject-form">
        <input 
          type="text"
          className="new-subject-input"
          placeholder="Add new subject..."
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button type="submit" className="new-subject-btn">+</button>
      </form>
    </div>
  );
};

export default SubjectList;
