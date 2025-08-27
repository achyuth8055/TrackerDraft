import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const WORK_DURATION = 25 * 60; // 25 minutes
  const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes
  const LONG_BREAK_DURATION = 15 * 60; // 15 minutes

  const [mode, setMode] = useState('work');
  const [timeRemaining, setTimeRemaining] = useState(WORK_DURATION);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // Optionally, add a sound or notification here
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    switch (newMode) {
      case 'work':
        setTimeRemaining(WORK_DURATION);
        break;
      case 'shortBreak':
        setTimeRemaining(SHORT_BREAK_DURATION);
        break;
      case 'longBreak':
        setTimeRemaining(LONG_BREAK_DURATION);
        break;
      default:
        setTimeRemaining(WORK_DURATION);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const totalDuration = mode === 'work' ? WORK_DURATION : mode === 'shortBreak' ? SHORT_BREAK_DURATION : LONG_BREAK_DURATION;
  const progress = ((totalDuration - timeRemaining) / totalDuration) * 360;

  return (
    <div className="widget-card timer-widget">
      <div className="timer-modes">
        <button onClick={() => handleModeChange('work')} className={mode === 'work' ? 'active' : ''}>Pomodoro</button>
        <button onClick={() => handleModeChange('shortBreak')} className={mode === 'shortBreak' ? 'active' : ''}>Short Break</button>
        <button onClick={() => handleModeChange('longBreak')} className={mode === 'longBreak' ? 'active' : ''}>Long Break</button>
      </div>
      <div className="timer-circle">
        <div className="timer-progress" style={{ background: `conic-gradient(var(--premium-cyan) ${progress}deg, transparent 0deg)` }}>
          <div className="timer-inner-circle">
            <div className="timer-display">{formatTime(timeRemaining)}</div>
          </div>
        </div>
      </div>
      <button onClick={toggleTimer} className="timer-control-btn">
        {isActive ? 'PAUSE' : 'START'}
      </button>
    </div>
  );
};

export default PomodoroTimer;