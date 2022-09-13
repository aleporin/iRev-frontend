import { useState } from 'react'
import { useParams } from 'react-router'
import Ingredient from '../components/Ingredient'

const CreateRecipe = ({
  handleRecipeSubmit,
  recipeForm,
  handleRecipeChange,
  handleIngredientChange,
  ingredient,
  handleIngredientAdd,
  user
}) => {
  let { userid } = useParams()
  console.log(userid)
  return (
    <div className="create-recipe-wrap">
      <h1 className="page-title">Create New Recipe</h1>
      <form
        className="recipe-form"
        onSubmit={(e) => handleRecipeSubmit(e, userid)}
      >
        <label className="recipe-field-label">Recipe Name</label>
        <input
          onChange={handleRecipeChange}
          value={recipeForm.recipe_name}
          name="recipe_name"
          type="text"
          placeholder="Give your recipe a meaningful name..."
          className="recipe-field-input"
        />
        <label className="recipe-field-label">Description</label>
        <textarea
          onChange={handleRecipeChange}
          value={recipeForm.desc}
          name="desc"
          type="text"
          placeholder="Describe your recipe"
          className="recipe-field-input"
        />
        <label className="recipe-field-label">Process</label>
        <textarea
          onChange={handleRecipeChange}
          value={recipeForm.process}
          name="process"
          type="text"
          placeholder="Describe your the process to make your recipe... The more detail the better"
          className="recipe-field-input"
        />
        <label className="recipe-field-label">Cook Time</label>
        <input
          onChange={handleRecipeChange}
          value={recipeForm.cook_time}
          name="cook_time"
          type="text"
          placeholder="Describe your the process to make your recipe... The more detail the better"
          className="recipe-field-input"
        />
        <label className="recipe-field-label">Image</label>
        <input
          onChange={handleRecipeChange}
          value={recipeForm.image}
          name="image"
          type="text"
          placeholder="Post a link to your recipe!"
          className="recipe-field-input"
        />
        <label className="recipe-field-label" htmlFor="category">
          Category
        </label>
        <select
          onChange={handleRecipeChange}
          value={recipeForm.category}
          name="category"
          className="recipe-field-input"
        >
          <option type="option" value="" disabled hidden></option>
          <option type="snack" value="snack">
            Snack
          </option>
          <option type="appetizer">Appetizer</option>
          <option type="entree">Entree</option>
          <option type="dessert">Dessert</option>
          <option type="cocktail">Cocktail</option>
        </select>
        <Ingredient
          handleIngredientAdd={handleIngredientAdd}
          recipeForm={recipeForm}
          handleRecipeSubmit={handleRecipeSubmit}
          handleIngredientChange={handleIngredientChange}
          ingredient={ingredient}
          handleRecipeChange={handleRecipeChange}
        />
        <button className="submit-button">Submit Recipe</button>
      </form>
    </div>
  )
}

export default CreateRecipe
