import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')}>
        👨‍🍳 <strong>Chef GPT</strong>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/main">Main</Link>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/about">About</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
