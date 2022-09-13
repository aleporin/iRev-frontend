import { useState, useEffect } from 'react'
import { FaSearch, FaBookmark, FaRegBookmark } from 'react-icons/fa'
import RecipeDetails from '../pages/RecipeDetails'
import { NewBookmarkRecipe } from '../services/BookmarkServices'
import { Navigate, useNavigate } from 'react-router'

export const Bookmark = ({ savedRecipe, user, authenticated }) => {
  let navigate = useNavigate()
  const [bookmarkRecipe, setBookmarkRecipe] = useState([])
  const [bookmark, setBookmark] = useState(false)

  const saveRecipe = async (recipe) => {
    const response = await NewBookmarkRecipe(recipe)
    setBookmark(true)
    navigate(`/details/${savedRecipe.apiId}/${savedRecipe.userId}`)
  }

  let isAuthenticated
  if (user) {
    {
      isAuthenticated = bookmark ? (
        <FaBookmark size={30} />
      ) : (
        <FaRegBookmark size={30} />
      )
    }
  }

  let notAuthenticated
  if (user) {
    {
      notAuthenticated = null
    }
  }

  return (
    <div>
      <div onClick={() => saveRecipe(savedRecipe)}>
        {authenticated && user ? isAuthenticated : notAuthenticated}
      </div>
    </div>
  )
}
