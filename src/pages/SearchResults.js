import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const API_KEY = process.env.REACT_APP_API_KEY

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([])
  let params = useParams()

  const getSearched = async (results) => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${results}`
    )
    setSearchResults(response.data.results)
  }

  useEffect(() => {
    getSearched(params.results)
  }, [params.results])

  return (
    <div className="search-results">
      {searchResults.map((recipe) => (
        <Link to={`/recipe/details/${recipe.id}`}>
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} />
          </div>
        </Link>
      ))}
    </div>
  )
}

export default SearchResults
