import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './SplashScreen.css';

const SplashScreen = () => {
  const { theme } = useTheme();
  const [phase, setPhase] = useState('logo');
  const [starVisible, setStarVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStarVisible(true), 500),
      setTimeout(() => setPhase('star-shine'), 1500),
      setTimeout(() => setFadeOut(true), 2500),
      setTimeout(() => setPhase('logo-fade'), 3000)
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const getThemeColor = () => {
    switch (theme) {
      case 'azul': return '#3b82f6';
      case 'roxo': return '#a855f7';
      case 'vermelho': return '#ef4444';
      default: return '#3b82f6';
    }
  };

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className={`star-container ${starVisible ? 'visible' : ''} ${phase === 'star-shine' ? 'shining' : ''}`}>
          <svg className="star" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
          <div className="star-rays"></div>
        </div>
        
        <div className={`logo-container ${phase === 'logo-fade' ? 'fade' : ''}`}>
          <div className="logo-main">
            <span className="logo-cps">CPS</span>
            <div className="logo-underline" style={{ background: getThemeColor() }}></div>
          </div>
          <p className="logo-subtitle">Create Portfolio Studio</p>
        </div>

        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="splash-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
