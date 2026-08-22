import React from 'react'
import './SearchBar.css'

function SearchBar() {
  return (
    <form className="search-bar">
        <input type="text"
        placeholder="Search photos..." />
    </form>
  )
}

export default SearchBar