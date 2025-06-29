import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate('/event');
  };

  return (
    <header className="header">
      <div className="header-title">Goodies Distribution System</div>
      <button className="create-button" onClick={handleCreateEvent}>
        Create New Event
      </button>
    </header>
  );
};

export default Header;
