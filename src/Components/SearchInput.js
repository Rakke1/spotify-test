import React from 'react'

const SearchInput = ({searchValue, setSearchValue}) => {
  return (
    <input id="search" className="search input-form" value={searchValue} onChange={(e) => {setSearchValue(e.target.value);}} />
  )
}

export default SearchInput