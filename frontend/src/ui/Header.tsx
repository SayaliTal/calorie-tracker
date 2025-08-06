import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './index';
import TestDataButton from '../components/TestDataButton';
import './Header.css';

interface HeaderProps {
  token: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ token, onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="header">
      <div className="header__brand">
        <img
          src="/calorie-logo.svg"
          alt="Calorie Tracker Logo"
          className="header__logo"
        />
        <span className="header__title">Calorie Tracker</span>
      </div>
      <div className="header__actions">
        <span className="header__time">
          {currentTime.toLocaleTimeString()}
        </span>
        {token && <TestDataButton token={token} />}
        <ThemeToggle />
        {token && (
          <button
            className="logout-btn"
            onClick={onLogout}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
