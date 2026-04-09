import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Mascot.css';

const Mascot = () => {
  const { theme } = useTheme();
  const [animation, setAnimation] = useState('idle');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const getColors = () => {
    switch (theme) {
      case 'azul':
        return { primary: '#3b82f6', secondary: '#60a5fa', glow: 'rgba(59, 130, 246, 0.6)' };
      case 'roxo':
        return { primary: '#a855f7', secondary: '#c084fc', glow: 'rgba(168, 85, 247, 0.6)' };
      case 'vermelho':
        return { primary: '#ef4444', secondary: '#f87171', glow: 'rgba(239, 68, 68, 0.6)' };
      default:
        return { primary: '#3b82f6', secondary: '#60a5fa', glow: 'rgba(59, 130, 246, 0.6)' };
    }
  };

  const colors = getColors();

  useEffect(() => {
    const animations = ['idle', 'bounce', 'wave', 'spin'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    
    const interval = setInterval(() => {
      setAnimation(randomAnimation);
      setTimeout(() => setAnimation('idle'), 1000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = () => setAnimation('excited');
  const handleMouseLeave = () => setAnimation('idle');
  const handleClick = () => {
    setAnimation('jump');
    setTimeout(() => setAnimation('idle'), 500);
  };

  return (
    <div 
      className={`mascot ${animation} ${isVisible ? 'visible' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="mascot-body">
        <svg viewBox="0 0 100 100" className="mascot-svg">
          <defs>
            <linearGradient id={`grad-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
            <filter id={`glow-${theme}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <circle cx="50" cy="50" r="40" fill={`url(#grad-${theme})`} filter={`url(#glow-${theme})`} />
          
          <ellipse cx="35" cy="42" rx="8" ry="10" fill="white" className="eye left" />
          <ellipse cx="65" cy="42" rx="8" ry="10" fill="white" className="eye right" />
          
          <circle cx="35" cy="44" r="4" fill="#1a1a25" className="pupil" />
          <circle cx="65" cy="44" r="4" fill="#1a1a25" className="pupil" />
          
          <circle cx="37" cy="42" r="2" fill="white" className="eye-shine" />
          <circle cx="67" cy="42" r="2" fill="white" className="eye-shine" />
          
          <path 
            d="M 35 62 Q 50 75 65 62" 
            stroke="white" 
            strokeWidth="4" 
            fill="none" 
            strokeLinecap="round"
            className="mouth"
          />
          
          <ellipse cx="25" cy="55" rx="6" ry="4" fill="rgba(255,255,255,0.3)" className="blush" />
          <ellipse cx="75" cy="55" rx="6" ry="4" fill="rgba(255,255,255,0.3)" className="blush" />
        </svg>
      </div>

      <div className="mascot-glow" style={{ background: colors.glow }} />
      
      <div className="mascot-sparkles">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="sparkle"
            style={{
              '--rotation': `${i * 60}deg`,
              '--delay': `${i * 0.2}s`,
              background: colors.primary
            }}
          />
        ))}
      </div>

      <div className="mascot-bubble">
        <span>Oi! 👋</span>
      </div>
    </div>
  );
};

export default Mascot;
