import { useState, useEffect } from 'react'
import { UnBookmark } from '../components/UnBookmark'
import { useParams } from 'react-router'
import { GetApiSavedRecipe } from '../services/BookmarkServices'

const SavedRecipeDetails = ({
  // checkBookmark,
  savedRecipes,
  setSavedRecipes,
  deleteUserBookmarkedRecipe,
  savedRecipe
  // setUnBookmarked
}) => {
  let { apiId, userId } = useParams()

  const [active, setActive] = useState('details')
  const [unBookmarked, setUnBookmarked] = useState({})

  const checkBookmark = async (api, user) => {
    const response = await GetApiSavedRecipe(api, user)
    console.log(response)
    setUnBookmarked(response)
  }
  useEffect(() => {
    checkBookmark(apiId, userId)
  }, [])

  return (
    // <div className="recipe-detail">
    <div className="recipe-wrap">
      <div className="title-image">
        <h3>{unBookmarked.title}</h3>
        <img src={unBookmarked.image} />
        <UnBookmark
          unBookmarked={unBookmarked}
          deleteUserBookmarkedRecipe={deleteUserBookmarkedRecipe}
          savedRecipe={savedRecipe}
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
          <p dangerouslySetInnerHTML={{ __html: unBookmarked.summary }}></p>
        </div>
      )}
      {active === 'ingredients' && (
        <ul>
          {unBookmarked.extendedIngredients.map((ingrendient) => (
            <li>{ingrendient.original}</li>
          ))}
        </ul>
      )}
      {active === 'recipe' && (
        <p dangerouslySetInnerHTML={{ __html: unBookmarked.instructions }}></p>
      )}
    </div>
  )
}

export default SavedRecipeDetails
