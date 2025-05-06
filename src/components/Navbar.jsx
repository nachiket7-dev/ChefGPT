import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')}>
        👨‍🍳 <strong>Chef GPT</strong>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          location.pathname !== '/login' && <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
