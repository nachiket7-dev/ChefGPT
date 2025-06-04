import React from 'react';

const RecipeCard = ({ recipe }) => {
  if (!recipe) {
    return (
      <div className='recipe-card'>
        <div className='card'>
          <h2>Recipe Card</h2>
          <p>No recipe generated yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='recipe-card'>
      <div className='card'>
        <h2>{recipe.title}</h2>
        <h3>Ingredients:</h3>
        <ul>
          {recipe.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
