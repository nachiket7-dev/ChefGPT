import React, { useState } from 'react';
import axios from 'axios';
import RecipeForm from '../components/RecipeForm';
import RecipeCard from '../components/RecipeCard';

const MainPage = () => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  const fetchRecipe = async (ingredients) => {
    try {
      setError(null);
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const requestBody = {
        prompt: {
          text: `Generate a recipe with the following ingredients: ${ingredients}`
        },
        temperature: 0.7,
        maxOutputTokens: 500,
        topP: 0.8,
        topK: 40,
        candidateCount: 1,
        safetySettings: [
          {
            category: 'HARM_CATEGORY_UNSPECIFIED',
            threshold: 'BLOCK_NONE',
          },
        ],
      };

      const response = await axios.post(url, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      console.log('API response data:', data);

      const generatedText = data?.candidates?.[0]?.output || '';
      const recipeData = {
        title: 'AI Generated Recipe',
        ingredients: ingredients.split(',').map(i => i.trim()),
        instructions: generatedText,
      };

      setRecipe(recipeData);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setError('Failed to generate recipe. Showing fallback recipe.');
      const fallbackData = {
        title: 'Chef GPT Magic Dish',
        ingredients: ingredients.split(',').map(i => i.trim()),
        instructions: 'Mix ingredients and cook for 30 minutes.',
      };
      setRecipe(fallbackData);
    }
  };

  return (
    <div className='main-page'>
      <h1>Generate Some Yummy Recipes!</h1>
      <RecipeForm fetchRecipe={fetchRecipe} />
      {error && <p className="error-message">{error}</p>}
      <RecipeCard recipe={recipe} />
    </div>
  );
};

export default MainPage;
