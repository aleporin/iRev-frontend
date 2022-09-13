import './App.css'
import Search from './components/Search'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect, createRef } from 'react'
import { CreateNewRecipe } from './services/RecipeServices'
import { CheckSession } from './services/Auth'
import SearchResults from './pages/SearchResults'
import Home from './pages/Home'
import RecipeDetails from './pages/RecipeDetails'
import MyRecipeDetails from './pages/MyRecipeDetails'
import Nav from './components/Nav'
import { SignUpUser } from './services/Auth'
import { DeleteRecipe } from './services/RecipeServices'
import { UpdateRecipe } from './services/RecipeServices'
import Login from './pages/Login'
import Register from './pages/Register'
import Sidebar from './components/Sidebar'
import CreateRecipe from './pages/CreateRecipe'
import { useNavigate, useParams } from 'react-router'
import { GetRecipeByUser } from './services/RecipeServices'
import {
  DeleteUserBookmark,
  GetApiSavedRecipe
} from './services/BookmarkServices'
import UserRecipe from './pages/UserRecipe'
import SavedRecipes from './pages/SavedRecipes'
import SavedRecipeDetails from './pages/SavedRecipeDetails'
import EditRecipe from './components/EditRecipe'

function App() {
  let navigate = useNavigate()

  // user auth
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState({})
  const logOut = () => {
    setUser(null)
    setAuthenticated(false)
    localStorage.clear()
  }

  const checkStatus = async () => {
    const user = await CheckSession()
    setUser(user)
    setAuthenticated(true)
  }
  useEffect(() => {
    const status = localStorage.getItem('token')
    if (status) {
      checkStatus()
    }
  }, [])

  // register data

  const handleRegisterChange = (error) => {
    setFormRegisterData({
      ...formRegisterData,
      [error.target.name]: error.target.value
    })
  }

  const [formRegisterData, setFormRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleRegisterSubmit = async (error) => {
    error.preventDefault()
    await SignUpUser({
      username: formRegisterData.username,
      email: formRegisterData.email,
      password: formRegisterData.password
    })
    setFormRegisterData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    navigate('/')
  }

  // recipe form
  let textInput = createRef()

  const [error, setError] = useState(null)

  const [recipeForm, setRecipeForm] = useState({
    recipe_name: '',
    desc: '',
    category: '',
    ingredients: [],
    cook_time: '',
    process: '',
    image: ''
  })
  const initialValue = ''

  const [ingredient, setIngredient] = useState(initialValue)

  const handleIngredientChange = (e) => {
    setIngredient(e.target.value)
  }

  const handleRecipeChange = (e) => {
    setRecipeForm({ ...recipeForm, [e.target.name]: e.target.value })
  }

  const handleIngredientAdd = (e) => {
    e.preventDefault()
    let ingredients = recipeForm.ingredients
    if (!ingredients.includes(ingredient)) {
      ingredients.push(ingredient)
      setRecipeForm({ ...recipeForm, ingredients: ingredients })
      setError(null)
    } else {
      setError('That Ingredient is already on your list')
    }
    setIngredient(initialValue)
  }

  const handleRecipeSubmit = async (e, userid) => {
    e.preventDefault()
    await CreateNewRecipe(
      {
        recipe_name: recipeForm.recipe_name,
        desc: recipeForm.desc,
        category: recipeForm.category,
        ingredients: recipeForm.ingredients,
        cook_time: recipeForm.cook_time,
        process: recipeForm.process,
        image: recipeForm.image
      },
      userid
    )
    setRecipeForm({
      recipe_name: '',
      desc: '',
      category: '',
      ingredients: [],
      cook_time: '',
      process: '',
      image: ''
    })
    navigate(`/recipe/${user.id}`)
  }

  // delete recipe
  const [deletePost, setDeletePost] = useState(false)

  const deleteUserRecipe = async (recipeId) => {
    await DeleteRecipe(recipeId)
    setDeletePost(true)
    navigate(`/recipe/${user.id}`)
  }

  // update recipe

  const updateUserRecipe = async (data, recipeId) => {
    await UpdateRecipe(data, recipeId)
    navigate(`/recipe/${recipeId}`)
  }

  //bookmarked recipes
  const [recipe, setRecipe] = useState([])

  const [savedRecipes, setSavedRecipes] = useState([])

  const [unBookmarked, setUnBookmarked] = useState([])

  const savedRecipe = {
    title: recipe.title,
    summary: recipe.summary,
    extendedIngredients: recipe.extendedIngredients,
    cook_time: recipe.readyInMinutes,
    instructions: recipe.instructions,
    image: recipe.image,
    apiId: recipe.id,
    userId: user.id
  }

  const checkBookmark = async (apiId, userId) => {
    const response = await GetApiSavedRecipe(apiId, userId)
    setUnBookmarked(response.data)
  }

  //unbookmark recipe
  const [unBookmarkUserRecipe, setUnBookmarkUserRecipe] = useState(false)

  const deleteUserBookmarkedRecipe = async (recipeId) => {
    await DeleteUserBookmark(recipeId)
    setUnBookmarkUserRecipe(true)
  }

  return (
    <div>
      {/* <Nav /> */}
      <div className="app">
        <img src="https://i.imgur.com/emU62vZ.png" />
        <Search authenticated={authenticated} user={user} logOut={logOut} />
        <Sidebar logOut={logOut} authenticated={authenticated} user={user} />
        <Routes>
          <Route
            path="/login"
            element={
              <Login setAuthenticated={setAuthenticated} setUser={setUser} />
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/searched/:results" element={<SearchResults />} />
          <Route
            path="/editrecipe/:recipeId"
            element={
              <EditRecipe
                updateUserRecipe={updateUserRecipe}
                handleRecipeChange={handleRecipeChange}
                recipeForm={recipeForm}
                ingredient={ingredient}
                handleIngredientAdd={handleIngredientAdd}
                recipe={recipe}
              />
            }
          />
          <Route
            path="/savedrecipes/:userid"
            element={
              <SavedRecipes
                user={user}
                savedRecipe={savedRecipe}
                setUnBookmarked={setUnBookmarked}
              />
            }
          />
          <Route
            path="/details/:apiId/:userId"
            element={
              <SavedRecipeDetails
                checkBookmark={checkBookmark}
                savedRecipes={savedRecipes}
                setSavedRecipes={setSavedRecipes}
                deleteUserBookmarkedRecipe={deleteUserBookmarkedRecipe}
                savedRecipe={savedRecipe}
              />
            }
          />
          <Route
            path="/recipes/details/user/:recipeId"
            element={
              <MyRecipeDetails
                deleteUserRecipe={deleteUserRecipe}
                deletePost={deletePost}
                setDeletePost={setDeletePost}
              />
            }
          />
          <Route
            path="/recipe/details/:recipeId"
            element={
              <RecipeDetails
                recipe={recipe}
                savedRecipe={savedRecipe}
                setRecipe={setRecipe}
                user={user}
                authenticated={authenticated}
              />
            }
          />
          <Route path="/recipe/:userid" element={<UserRecipe user={user} />} />
          <Route
            path="/create/:userid"
            element={
              <CreateRecipe
                handleRecipeSubmit={handleRecipeSubmit}
                recipeForm={recipeForm}
                handleRecipeChange={handleRecipeChange}
                handleIngredientAdd={handleIngredientAdd}
                handleIngredientChange={handleIngredientChange}
                ingredient={ingredient}
                user={user}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                handleRegisterChange={handleRegisterChange}
                formRegisterData={formRegisterData}
                handleRegisterSubmit={handleRegisterSubmit}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
