import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'
import { GetUserBookmarkRecipes } from '../services/BookmarkServices'
import { useState, useEffect } from 'react'

const SavedRecipes = ({ user }) => {
  let { userid } = useParams()

  const [bookmarkedRecipe, setBookmarkedRecipe] = useState([])

  const getBookmark = async (userid) => {
    const response = await GetUserBookmarkRecipes(userid)
    setBookmarkedRecipe(response)
  }

  useEffect(() => {
    getBookmark(userid)
  }, [])

  let navigate = useNavigate()
  return (
    <div>
      <div className="card-wrapper">
        <h3 className="section-title">Bookmarked Recipes</h3>
        <div className="recipe-grid">
          {bookmarkedRecipe?.map((recipe) => (
            <div className="recipe-item">
              {/* <Link to={`/details/${recipe.apiId}/${userid}`}> */}
              <div
                key={recipe.id}
                className="card-content"
                onClick={() => navigate(`/details/${recipe.apiId}/${userid}`)}
              >
                <img src={recipe.image} />
                <p>{recipe.title}</p>
              </div>
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SavedRecipes
