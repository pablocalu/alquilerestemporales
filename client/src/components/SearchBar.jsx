import React, { useState } from 'react';
import { getPlaces } from '../methods/SearchMethod';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import axios from 'axios';

export default function SearchBar() {


  const [search, setSearch] = useState('')
  const { setSearchResult, searchResult } = useContext(UserContext)

  const handleInputChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }


  const handleSubmitSearch = async (e) => {
    e.preventDefault()
    setSearchResult(    await getPlaces(search))
    console.log(searchResult)
    setSearch('')
    /* window.location.href = '/s/places' */
  }



  return (
    <form className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-200" onSubmit={handleSubmitSearch}>
      <div>Anywhere</div>
      <div className="border-l border-gray-300"></div>
      <div>Any week</div>
      <div className="border-l border-gray-300"></div>
      <div>Add guests</div>
      <input type="text" value={search} onChange={(e) => handleInputChange(e)}/>
      <button className="bg-primary text-white p-1 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </form>
  );
}
