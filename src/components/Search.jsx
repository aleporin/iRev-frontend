import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router'

const Search = () => {
  const navigate = useNavigate()

  const [searched, toggleSearched] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const getSearchResults = async (event) => {
    event.preventDefault()
    navigate(`/searched/${searchQuery}`)
    setSearchQuery('')
    toggleSearched(true)
  }

  return (
    <form className="search-form" onSubmit={getSearchResults}>
      <input
        type="text"
        placeholder="Browse Thousands of Recipes Here"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
    </form>
  )
}

export default Search
