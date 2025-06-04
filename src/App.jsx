import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import MainPage from './pages/MainPage.jsx';
import RecipeDetailPage from './pages/RecipeDetailPage.jsx';
import Navbar from './components/Navbar.jsx';
import { auth } from './firebaseConfig';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage setUser={setUser} />} />
        <Route
          path="/main"
          element={user ? <MainPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/recipe-detail"
          element={user ? <RecipeDetailPage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
