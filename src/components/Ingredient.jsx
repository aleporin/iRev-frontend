import React from 'react'

const Ingredient = ({
  handleRecipeSubmit,
  recipeForm,
  handleRecipeChange,
  handleIngredientAdd,
  handleIngredientChange,
  ingredient
}) => {
  return (
    <div>
      <div className="ingredient-div">
        <label className="recipe-field-label" htmlFor="ingredient">
          Ingredient
        </label>
        <input
          onChange={handleIngredientChange}
          value={ingredient}
          name="ingredient"
          type="text"
          placeholder="Add Ingredients!"
          className="recipe-field-input"
        />
        <button className="add-ingredient-button" onClick={handleIngredientAdd}>
          Add Ingredient
        </button>
      </div>
      <div>
        <h2 className="ingredients-title">All Ingredients</h2>
        {recipeForm.ingredients.map((ingredient) => (
          <div key={ingredient.id}>
            <p className="ingredient-text">{ingredient}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ingredient
