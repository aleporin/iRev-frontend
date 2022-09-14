import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaSearch, FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { Link, useParams } from 'react-router-dom'
import { GetRecipeById } from '../services/RecipeServices'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import EditRecipe from '../components/EditRecipe'

const MyRecipeDetails = ({ deleteUserRecipe }) => {
  const [recipe, setRecipe] = useState({})
  const [active, setActive] = useState('details')

  let { recipeId } = useParams()

  const getRecipes = async () => {
    const response = await GetRecipeById(recipeId)
    setRecipe(response[0])
  }

  useEffect(() => {
    getRecipes()
  }, [deleteUserRecipe])

  return (
    // <div className="recipe-detail">
    <div className="recipe-wrap">
      {/* {recipe.length > 0 ? ( */}

      <h3>{recipe.recipe_name}</h3>
      <img src={recipe.image} />
      <div className="delete-edit-icon">
        <button onClick={() => deleteUserRecipe(recipeId)}>
          <AiFillDelete size={30} />
        </button>
        <Link to={`/editrecipe/${recipe.id}`}>
          <AiFillEdit size={30} />
        </Link>
      </div>
      <div className="button-wrap">
        <button
          className={active === 'details' ? 'active' : ''}
          id="details-button"
          onClick={() => setActive('details')}
        >
          Details
        </button>
        <button
          id="details-button"
          className={active === 'ingredients' ? 'active' : ''}
          onClick={() => setActive('ingredients')}
        >
          Ingredients
        </button>
        <button
          id="details-button"
          className={!active === 'recipe' ? 'active' : ''}
          onClick={() => setActive('recipe')}
        >
          Recipe
        </button>
      </div>
      {active === 'details' && <p> {recipe.desc}</p>}
      {active === 'ingredients' && (
        <ul>
          {recipe?.ingredients.map((ingredient) => (
            <li>{ingredient}</li>
          ))}
        </ul>
      )}
      {active === 'recipe' && <div>{recipe.process}</div>}

      {/* ) : null} */}
    </div>
  )
}

export default MyRecipeDetails
