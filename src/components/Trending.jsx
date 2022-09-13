// import { animationControls } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const API_KEY = process.env.REACT_APP_API_KEY

const Trending = () => {
  const [trending, setTrending] = useState([])

  useEffect(() => {
    const getTrending = async () => {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=9`
      )
      setTrending(response.data.recipes)
    }
    getTrending()
  }, [])

  return (
    <div>
      <div className="card-wrapper">
        <h3 className="section-title">Trending Recipes</h3>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: 'free'
          }}
        >
          {trending.map((recipe) => (
            <SplideSlide>
              <Link to={`/recipe/details/${recipe.id}`}>
                <div key={recipe.id} className="card-content">
                  <img src={recipe.image} />
                  <p>{recipe.title}</p>
                </div>
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  )
}

export default Trending
