import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import About from '../../about/components/About';
import '../styles/Auth.css';

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const [dots, setDots] = useState([]);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const newDots = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      delay: Math.random() * 3 + 's',
      duration: (Math.random() * 3 + 2) + 's',
    }));
    setDots(newDots);
  }, []);

  const createSparks = (e) => {
    // Only trigger on layout background or specific elements if needed
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;

    const x = e.clientX;
    const y = e.clientY;
    const colors = ['#4f46e5', '#818cf8', '#22d3ee', '#67e8f9', '#6366f1'];

    for (let i = 0; i < 6; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark-particle';
      const size = Math.random() * 4 + 2;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 50 + 25;

      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.borderRadius = Math.random() > 0.5 ? '50%' : '1px';
      spark.style.background = colors[Math.floor(Math.random() * colors.length)];
      spark.style.boxShadow = `0 0 6px ${colors[Math.floor(Math.random() * colors.length)]}`;
      spark.style.setProperty('--sx', `${Math.cos(angle) * distance}px`);
      spark.style.setProperty('--sy', `${Math.sin(angle) * distance - 20}px`);

      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 900);
    }
  };

  return (
    <div className="auth-page" onClick={createSparks}>
      <div className="tech-grid"></div>
      <div className="dots-container">
        {dots.map(dot => (
          <div
            key={dot.id}
            className="dot"
            style={{
              left: dot.left,
              top: dot.top,
              animationDelay: dot.delay,
              animationDuration: dot.duration
            }}
          />
        ))}
      </div>

      <div className="auth-container">
        <div className="top-accent"></div>

        <div className="auth-logo">
          <div className="logo-mark">
            <svg viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1>Uni<span>Event</span></h1>
          <p className="subtitle">Organisez. Collaborez. Réussissez.</p>
        </div>

        <div className="auth-tabs">
          <NavLink
            to="/login"
            className={({ isActive }) => `auth-tab ${isActive ? 'active' : ''}`}
          >
            Connexion
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => `auth-tab ${isActive ? 'active' : ''}`}
          >
            Inscription
          </NavLink>
        </div>

        <div className="auth-content">
          {children}
        </div>
      </div>

      {/* About Button */}
      <button
        className="about-btn"
        onClick={() => setShowAbout(true)}
        title="À propos"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* About Overlay */}
      {showAbout && (
        <div className="about-overlay" onClick={() => setShowAbout(false)}>
          <div className="about-modal" onClick={e => e.stopPropagation()}>
            <button className="close-about" onClick={() => setShowAbout(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <About />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
