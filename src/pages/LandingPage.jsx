import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <h1>👨‍🍳 Welcome to Chef GPT</h1>
      <p>Your AI-powered cooking assistant. Get personalized recipes with the power of AI!</p>
      <button onClick={() => navigate('/login')} className='get-started'>Get Started</button>
    </div>
  );
};

export default LandingPage;
