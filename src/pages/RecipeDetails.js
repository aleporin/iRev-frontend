import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaSearch, FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { Bookmark } from '../components/Bookmark'

const API_KEY = process.env.REACT_APP_API_KEY

const RecipeDetails = ({
  recipe,
  setRecipe,
  savedRecipe,
  user,
  authenticated
}) => {
  // const [recipe, setRecipe] = useState([])
  const [active, setActive] = useState('details')

  let { recipeId } = useParams()

  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
    )
    setRecipe(response.data)
  }

  useEffect(() => {
    getRecipe()
  }, [recipeId])

  return (
    // <div className="recipe-detail">
    <div>
      {savedRecipe ? (
        <div className="recipe-wrap">
          <div className="title-image">
            <h3>{recipe.title}</h3>
            <img src={recipe.image} />
            <Bookmark
              savedRecipe={savedRecipe}
              user={user}
              authenticated={authenticated}
            />
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
          {active === 'details' && (
            <div className="summary-wrap">
              <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
            </div>
          )}
          {active === 'ingredients' && (
            <ul>
              {recipe.extendedIngredients.map((ingrendient) => (
                <li>{ingrendient.original}</li>
              ))}
            </ul>
          )}
          {active === 'recipe' && (
            <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
            // <ol>
            //   {recipe.analyzedInstructions[0].steps.map((instruction) => (
            //     <li>{instruction.step}</li>
            //   ))}
            // </ol>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default RecipeDetails
