import React, { useState } from 'react';
import RecipeForm from '../components/RecipeForm';
import RecipeCard from '../components/RecipeCard';

const MainPage = () => {
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = async (ingredients) => {
    const data = {
      title: 'Chef GPT Magic Dish',
      ingredients: ingredients.split(',').map(i => i.trim()),
      instructions: 'Mix ingredients and cook for 30 minutes.',
    };
    setRecipe(data);
  };

  return (
    <div>
      <h1>Chef GPT</h1>
      <RecipeForm fetchRecipe={fetchRecipe} />
      <RecipeCard recipe={recipe} />
    </div>
  );
};

export default MainPage;
