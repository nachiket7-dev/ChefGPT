import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeForm from '../components/RecipeForm';
import RecipeCard from '../components/RecipeCard';

const MainPage = () => {
  const [recipe, setRecipe] = useState(null);
  const [previousRecipes, setPreviousRecipes] = useState(() => {
    const saved = localStorage.getItem('previousRecipes');
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [footer, setFooter] = useState(false);
  const navigate = useNavigate();

  const fetchRecipe = async (list) => {
    try {
      setError(null);
      setLoading(true);
      setFooter(false);
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `Give me a dish using these ingredients ${list.join(', ')} and provide the description, ingredients, and process in order.`
              }
            ]
          }
        ]
      };

      const response = await axios.post(url, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);

      const generatedText = response.data.candidates[0].content.parts[0].text || '';

      // Parse the generatedText to extract title, ingredients, and instructions
      // Assuming the generatedText format includes these sections separated by newlines or keywords
      // This is a simple heuristic parser and may need adjustment based on actual API response format
      const lines = generatedText.split('\n').map(line => line.trim()).filter(line => line.length > 0);

      let title = 'AI Generated Recipe';
      let ingredients = [];
      let instructions = '';

      // Simple parsing logic: find lines starting with "Ingredients:" and "Instructions:" or similar
      let ingredientsStart = lines.findIndex(line => /ingredients:/i.test(line));
      let instructionsStart = lines.findIndex(line => /instructions:|process:|steps:/i.test(line));

      if (ingredientsStart !== -1 && instructionsStart !== -1 && instructionsStart > ingredientsStart) {
        title = lines[0] || title;
        ingredients = lines.slice(ingredientsStart + 1, instructionsStart);
        instructions = lines.slice(instructionsStart + 1).join(' ');
      } else {
        // Fallback: treat entire text as instructions
        instructions = generatedText;
      }

      const recipeData = {
        title,
        ingredients,
        instructions,
      };

      setRecipe(recipeData);
      setPreviousRecipes(prev => {
        const updated = [recipeData, ...prev];
        localStorage.setItem('previousRecipes', JSON.stringify(updated));
        return updated;
      });
      setFooter(true);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching recipe:', error);
      setError('Failed to generate recipe. Showing fallback recipe.');
      const fallbackData = {
        title: 'Fallback Recipe',
        ingredients: [],
        instructions: 'Mix ingredients and cook for 30 minutes.',
      };
      setRecipe(fallbackData);
      setFooter(true);
    }
  };

  return (
    <div className='main-page'>
      <h1>Generate Some Yummy Recipes!</h1>
      <RecipeForm fetchRecipe={fetchRecipe} />
      {loading && <p>Loading recipe...</p>}
      {error && <p className="error-message">{error}</p>}
      <RecipeCard recipe={recipe} />
      {footer && <footer>Enjoy your meal!</footer>}
      {recipe && (
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => navigate('/recipe-detail', { state: { recipe } })}
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            View Full Recipe
          </button>
        </div>
      )}
      {previousRecipes.length > 0 && (
        <div style={{ marginTop: '40px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
          <h2>Previous Recipes</h2>
          {previousRecipes.map((prevRecipe, index) => (
            <div key={index} style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => navigate('/recipe-detail', { state: { recipe: prevRecipe } })}>
              <h3 style={{ color: '#4caf50' }}>{prevRecipe.title}</h3>
              <p style={{ color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {prevRecipe.instructions.length > 100 ? prevRecipe.instructions.substring(0, 100) + '...' : prevRecipe.instructions}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainPage;
