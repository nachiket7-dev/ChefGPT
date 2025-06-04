import React, { useState } from 'react';

const RecipeForm = ({ fetchRecipe }) => {
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (ingredient.trim() !== '') {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient('');
    }
  };

  const handleRemoveIngredient = (e) => {
    e.preventDefault();
    setIngredients(ingredients.slice(0, -1));
  };

  const handleGenerate = () => {
    if (ingredients.length > 0) {
      fetchRecipe(ingredients);
    } else {
      alert('Please add at least one ingredient');
    }
  };

  return (
    <>
      <form className="recipe-form">
        <div className="ingredient">
          <input
            type="text"
            value={ingredient}
            placeholder="example: tomato, onion..."
            onChange={(e) => setIngredient(e.target.value)}
          />
          <button className="add" onClick={handleAddIngredient}>Add Ingredient</button>
          <button className="remove" onClick={handleRemoveIngredient}>Remove Ingredient</button>
        </div>

        <div className="ingredient-list">
          <h3>Ingredients:</h3>
          <ul>
            {ingredients.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
        </div>
      </form>
      <button className='generate' onClick={handleGenerate}>Generate</button>
    </>
  );
};

export default RecipeForm;
