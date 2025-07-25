import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
      navigate('/main');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setUser(auth.currentUser);
      navigate('/main');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Login to Chef GPT</h2>
      <form onSubmit={handleLogin} className='login-form'>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <button onClick={handleGoogleLogin} className="google-login-button" style={{
        backgroundColor: '#4285F4',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px',
        display: 'block',
        width: '100%',
        maxWidth: '300px',
      }}>
        Sign in with Google
      </button>
      <p style={{ marginTop: '20px', color: 'white' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#4caf50', textDecoration: 'underline' }}>Sign up here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
