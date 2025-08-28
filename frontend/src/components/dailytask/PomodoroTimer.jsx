import React, { useState, useEffect } from 'react';

const PlayIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );
const PauseIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 4H10V20H6V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 4H18V20H14V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );
const ResetIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 4V10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 20V14H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.51 9A9 9 0 0121.5 14.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.49 15A9 9 0 012.5 9.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );

const PomodoroTimer = () => {
    const WORK_DURATION = 60 * 60; // Fixed: Changed from 25 to 50 minutes
    const SHORT_BREAK_DURATION = 1 * 60;
    const LONG_BREAK_DURATION = 15 * 60;

    const [mode, setMode] = useState('work');
    const [timeRemaining, setTimeRemaining] = useState(WORK_DURATION);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && timeRemaining > 0) {
            interval = setInterval(() => setTimeRemaining(time => time - 1), 1000);
        } else if (timeRemaining === 0) {
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, timeRemaining]);
    
    const handleModeChange = (newMode) => {
        setIsActive(false);
        setMode(newMode);
        switch (newMode) {
            case 'work': setTimeRemaining(WORK_DURATION); break;
            case 'shortBreak': setTimeRemaining(SHORT_BREAK_DURATION); break;
            case 'longBreak': setTimeRemaining(LONG_BREAK_DURATION); break;
            default: setTimeRemaining(WORK_DURATION);
        }
    };
    
    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => handleModeChange(mode);
    const formatTime = (seconds) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    
    const totalDuration = mode === 'work' ? WORK_DURATION : mode === 'shortBreak' ? SHORT_BREAK_DURATION : LONG_BREAK_DURATION;
    const progress = (timeRemaining / totalDuration) * 100;

    return (
        <div className="pomodoro-widget">
            <div className="timer-modes">
                <button onClick={() => handleModeChange('work')} className={mode === 'work' ? 'active' : ''}>Work</button>
                <button onClick={() => handleModeChange('shortBreak')} className={mode === 'shortBreak' ? 'active' : ''}>Short Break</button>
                <button onClick={() => handleModeChange('longBreak')} className={mode === 'longBreak' ? 'active' : ''}>Long Break</button>
            </div>
            <div className="timer-display-container">
                <svg className="timer-svg" viewBox="0 0 120 120">
                    <circle className="timer-bg-circle" cx="60" cy="60" r="54" />
                    <circle 
                        className="timer-progress-circle" 
                        cx="60" cy="60" r="54"
                        style={{ strokeDashoffset: `calc(339.29 - (339.29 * ${progress}) / 100)` }}
                    />
                </svg>
                <div className="timer-text">{formatTime(timeRemaining)}</div>
            </div>
            <div className="timer-controls">
                <button onClick={resetTimer} className="timer-reset-btn"><ResetIcon /></button>
                <button onClick={toggleTimer} className="timer-control-btn">{isActive ? <PauseIcon/> : <PlayIcon/>}</button>
            </div>
        </div>
    );
};

export default PomodoroTimer;
