import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const SignupPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
      navigate('/main');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
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
      <h2>Create an Account</h2>
      <form onSubmit={handleSignup} className="login-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <button onClick={handleGoogleSignup} className="google-login-button" style={{
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
        Sign up with Google
      </button>
    </div>
  );
};

export default SignupPage;
