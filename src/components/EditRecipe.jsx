import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import Ingredient from '../components/Ingredient'
import { GetRecipeById } from '../services/RecipeServices'

const EditRecipe = ({
  handleRecipeSubmit,
  handleIngredientChange,

  updateUserRecipe,
  user
}) => {
  const [recipe, setRecipe] = useState({})
  const [active, setActive] = useState('details')
  const [editForm, setEditForm] = useState('')
  const initialValue = ''
  const [error, setError] = useState(null)

  const [ingredient, setIngredient] = useState(initialValue)

  let { recipeId } = useParams()

  const getRecipes = async () => {
    const response = await GetRecipeById(editForm, recipeId)
    setEditForm(response[0])
  }

  const handleIngredientAdd = (e) => {
    e.preventDefault()
    let ingredients = editForm.ingredients
    if (!editForm.ingredients.includes(ingredient)) {
      console.log(ingredient)
      editForm.ingredients.push(ingredient)
      console.log(editForm.ingredients)
      setEditForm({ ...editForm, ingredients: ingredients })
      setError(null)
    } else {
      setError('That Ingredient is already on your list')
    }
    setIngredient(initialValue)
  }

  useEffect(() => {
    getRecipes()
    if (recipe) {
      setEditForm({
        recipe_name: recipe.recipe_name,
        desc: recipe.desc,
        process: recipe.process,
        cook_time: recipe.cook_time,
        image: recipe.image,
        category: recipe.category,
        ingredient: recipe.ingredient,
        ingredients: recipe.ingredients
      })
    }
  }, [])

  // const spliceIngredient = editForm.ingredients.splice(-1, 1)

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (error) => {
    error.preventDefault()
    const payload = await updateUserRecipe(editForm, recipeId)
  }

  return (
    <div>
      <h1 className="page-title">Edit Recipe</h1>
      <form className="recipe-form" onSubmit={(e) => handleSubmit(e)}>
        <label className="recipe-field-label">Recipe Name</label>
        <input
          onChange={handleChange}
          value={editForm.recipe_name}
          name="recipe_name"
          type="text"
          className="recipe-field-input"
        />
        <label className="recipe-field-label">Description</label>
        <textarea
          onChange={handleChange}
          value={editForm.desc}
          name="desc"
          type="text"
          placeholder="Describe your recipe"
          className="recipe-field-input"
        />
        <label className="recipe-field-label">Process</label>
        <textarea
          onChange={handleChange}
          value={editForm.process}
          name="process"
          type="text"
          className="recipe-field-input"
        />
        <label className="recipe-field-label">Cook Time</label>
        <input
          onChange={handleChange}
          value={editForm.cook_time}
          name="cook_time"
          type="text"
          className="recipe-field-input"
        />
        <label className="recipe-field-label">Image</label>
        <input
          onChange={handleChange}
          value={editForm.image}
          name="image"
          type="text"
          className="recipe-field-input"
        />
        <label className="recipe-field-label" htmlFor="category">
          Category
        </label>
        <select
          onChange={handleChange}
          value={editForm.category}
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
        <label className="recipe-field-label" htmlFor="ingredient">
          Ingredient
        </label>
        <input
          onChange={(e) => setIngredient(e.target.value)}
          value={ingredient}
          name="ingredient"
          type="text"
          placeholder="Add Ingredients!"
          className="recipe-field-input"
        />
        <button className="add-ingredient-button" onClick={handleIngredientAdd}>
          Add Ingredient
        </button>
        <div>
          <div>
            <h2 className="ingredients-title">All Ingredients</h2>
            {editForm.ingredients?.map((ingredient) => (
              <div key={ingredient.id}>
                <p className="ingredient-text">{ingredient}</p>
              </div>
            ))}
          </div>
        </div>
        <button className="submit-button">Edit Recipe</button>
      </form>
    </div>
  )
}

export default EditRecipe
