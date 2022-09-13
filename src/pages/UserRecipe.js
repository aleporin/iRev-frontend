import { useState, useEffect } from 'react'
import { GetRecipeByUser } from '../services/RecipeServices'
import { useParams } from 'react-router-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
const UserRecipe = ({ user }) => {
  let navigate = useNavigate()
  let { userid } = useParams()
  const [recipe, setRecipe] = useState([])

  const showRecipes = async (userid) => {
    const data = await GetRecipeByUser(userid)
    setRecipe(data)
  }
  useEffect(() => {
    showRecipes(userid)
  }, [])

  return (
    <div>
      <div className="card-wrapper">
        <h3 className="section-title">Your Recipes</h3>
        <div className="recipe-grid">
          {recipe?.map((recipe) => (
            <div>
              {/* <Link to={`user/recipes/details/${recipe.id}`}> */}
              <div
                key={recipe.id}
                className="card-content"
                onClick={() => navigate(`/recipes/details/user/${recipe.id}`)}
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
export default UserRecipe
