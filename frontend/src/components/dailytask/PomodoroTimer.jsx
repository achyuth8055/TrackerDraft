import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const WORK_DURATION = 25 * 60; // 25 minutes
  const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes
  const LONG_BREAK_DURATION = 15 * 60; // 15 minutes

  const [mode, setMode] = useState('work');
  const [timeRemaining, setTimeRemaining] = useState(WORK_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
      // Show celebration when break timer completes
      if (mode === 'shortBreak' || mode === 'longBreak') {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 4000);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining, mode]);

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
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.2); }
          }
          @keyframes celebrationBounce {
            0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
            50% { transform: scale(1.1) rotate(5deg); }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          @keyframes catWiggle {
            0% { transform: rotate(-5deg) scale(1); }
            100% { transform: rotate(5deg) scale(1.05); }
          }
          @keyframes timerPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          @keyframes buttonShine {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
        `}
      </style>
      <div style={{
        background: 'linear-gradient(135deg, rgba(22, 27, 34, 0.9), rgba(13, 17, 23, 0.8))',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      }}>
        {/* Premium Mode Selector */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          background: 'rgba(13, 17, 23, 0.8)',
          padding: '0.5rem',
          borderRadius: '50px',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)',
        }}>
          <button 
            onClick={() => handleModeChange('work')} 
            style={{
              background: mode === 'work' 
                ? 'linear-gradient(135deg, #00BFFF, #8A2BE2)' 
                : 'none',
              border: 'none',
              color: mode === 'work' ? 'white' : '#8B949E',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '0.9rem',
              transform: mode === 'work' ? 'scale(1.05)' : 'scale(1)',
              boxShadow: mode === 'work' ? '0 5px 20px rgba(0, 191, 255, 0.3)' : 'none',
            }}
          >
            🎯 Focus
          </button>
          <button 
            onClick={() => handleModeChange('shortBreak')} 
            style={{
              background: mode === 'shortBreak' 
                ? 'linear-gradient(135deg, #00FF7F, #00BFFF)' 
                : 'none',
              border: 'none',
              color: mode === 'shortBreak' ? 'white' : '#8B949E',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '0.9rem',
              transform: mode === 'shortBreak' ? 'scale(1.05)' : 'scale(1)',
              boxShadow: mode === 'shortBreak' ? '0 5px 20px rgba(0, 255, 127, 0.3)' : 'none',
            }}
          >
            ☕ Short Break
          </button>
          <button 
            onClick={() => handleModeChange('longBreak')} 
            style={{
              background: mode === 'longBreak' 
                ? 'linear-gradient(135deg, #FF69B4, #8A2BE2)' 
                : 'none',
              border: 'none',
              color: mode === 'longBreak' ? 'white' : '#8B949E',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '0.9rem',
              transform: mode === 'longBreak' ? 'scale(1.05)' : 'scale(1)',
              boxShadow: mode === 'longBreak' ? '0 5px 20px rgba(255, 105, 180, 0.3)' : 'none',
            }}
          >
            🌟 Long Break
          </button>
        </div>
        
        {/* Premium Timer Circle */}
        <div style={{
          width: '280px',
          height: '280px',
          background: 'linear-gradient(135deg, rgba(13, 17, 23, 0.9), rgba(22, 27, 34, 0.7))',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5), 0 0 40px rgba(138, 43, 226, 0.1)',
          position: 'relative',
          border: '3px solid rgba(255, 255, 255, 0.05)',
          animation: isActive ? 'timerPulse 2s ease-in-out infinite' : 'none',
        }}>
          {/* Progress Ring */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `conic-gradient(${mode === 'work' ? '#FF69B4' : '#00FF7F'} ${progress}deg, transparent ${progress}deg)`,
            mask: 'radial-gradient(circle, transparent 85%, black 85%)',
            WebkitMask: 'radial-gradient(circle, transparent 85%, black 85%)',
            animation: progress > 0 ? 'pulse 2s ease-in-out infinite' : 'none',
          }}></div>
          
          {/* Inner Circle */}
          <div style={{
            width: 'calc(100% - 40px)',
            height: 'calc(100% - 40px)',
            background: 'linear-gradient(135deg, rgba(22, 27, 34, 0.95), rgba(13, 17, 23, 0.9))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            zIndex: 2,
          }}>
            {/* Timer Display */}
            <div style={{
              fontSize: '3.5rem',
              fontWeight: '700',
              color: '#C9D1D9',
              fontFamily: 'JetBrains Mono, monospace',
              textShadow: `0 0 20px ${mode === 'work' ? 'rgba(255, 105, 180, 0.3)' : 'rgba(0, 255, 127, 0.3)'}`,
              letterSpacing: '0.1em',
            }}>
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>
        
        {/* Premium Control Button */}
        <button 
          onClick={toggleTimer} 
          style={{
            marginTop: '2.5rem',
            padding: '1rem 3.5rem',
            fontSize: '1.1rem',
            fontWeight: '700',
            letterSpacing: '0.2em',
            color: 'white',
            background: isActive 
              ? 'linear-gradient(135deg, #FF4444, #FF6B6B)' 
              : 'linear-gradient(135deg, #00FF7F, #00BFFF)',
            backgroundSize: '200% auto',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            textTransform: 'uppercase',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isActive 
              ? '0 10px 30px rgba(255, 68, 68, 0.4)' 
              : '0 10px 30px rgba(0, 255, 127, 0.4)',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05) translateY(-3px)';
            e.target.style.animation = 'buttonShine 0.6s ease-in-out';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) translateY(0px)';
            e.target.style.animation = 'none';
          }}
        >
          {isActive ? '⏸️ Pause' : '▶️ Start'}
        </button>

        {/* Premium Status Indicators */}
        <div style={{
          marginTop: '1.5rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}>
          <div style={{
            padding: '0.5rem 1rem',
            background: mode === 'work' 
              ? 'rgba(255, 105, 180, 0.1)' 
              : 'rgba(0, 255, 127, 0.1)',
            border: `1px solid ${mode === 'work' ? '#FF69B4' : '#00FF7F'}`,
            borderRadius: '20px',
            color: mode === 'work' ? '#FF69B4' : '#00FF7F',
            fontSize: '0.85rem',
            fontWeight: '600',
            backdropFilter: 'blur(10px)',
          }}>
            {mode === 'work' ? '🎯 Work Mode' : '🎉 Break Time'}
          </div>
          {isActive && (
            <div style={{
              width: '12px',
              height: '12px',
              background: '#00FF7F',
              borderRadius: '50%',
              animation: 'pulse 1s ease-in-out infinite',
              boxShadow: '0 0 10px #00FF7F',
            }}></div>
          )}
        </div>

        {/* Progress Percentage */}
        <div style={{
          marginTop: '1rem',
          fontSize: '0.9rem',
          color: '#8B949E',
          fontWeight: '500',
        }}>
          {Math.round(((totalDuration - timeRemaining) / totalDuration) * 100)}% Complete
        </div>
      </div>

      {/* Premium Celebration Modal */}
      {showCelebration && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{
            textAlign: 'center',
            color: 'white',
            animation: 'celebrationBounce 0.8s ease-out',
          }}>
            <img 
              src="https://drive.google.com/uc?export=view&id=1Z4Pas-qWd5SXM3WTNC-bm7Vnp30cqAd6"
              alt="Great job!"
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain',
                marginBottom: '1rem',
                filter: 'drop-shadow(0 0 20px rgba(255, 105, 180, 0.5))',
                animation: 'catWiggle 1s ease-in-out infinite alternate',
              }}
              onError={(e) => {
                // Fallback to emoji if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div style={{
              fontSize: '8rem',
              display: 'none',
              animation: 'catWiggle 1s ease-in-out infinite alternate',
            }}>
              😸👍
            </div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #00FF7F, #00BFFF)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '0.5rem',
            }}>
              Break Complete! 🎉
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#8B949E',
            }}>
              Great job taking care of yourself!
            </p>
            <div style={{
              marginTop: '1.5rem',
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}>
              ⭐ 🌟 ✨ 🎊 🏆
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PomodoroTimer;