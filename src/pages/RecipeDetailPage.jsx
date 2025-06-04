import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RecipeDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe;

  if (!recipe) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>No recipe data available.</h2>
        <button onClick={() => navigate(-1)} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontFamily: 'Roboto, sans-serif', color: '#333' }}>
      <h1 style={{ color: '#4caf50', textAlign: 'center' }}>{recipe.title}</h1>
      <h3 style={{ color: '#388e3c', marginTop: '30px' }}>Ingredients:</h3>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555' }}>
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx} style={{ marginBottom: '6px' }}>{ing}</li>
        ))}
      </ul>
      <h3 style={{ color: '#388e3c', marginTop: '30px' }}>Instructions:</h3>
      <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1.1rem', color: '#444' }}>{recipe.instructions}</p>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Back to Main
        </button>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
