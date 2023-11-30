// SearchComponent.jsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };
  const handleKeyPress = (e) => {
    // Trigger search when Enter key is pressed
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className='flex flex-col md:flex-row justify-center items-center gap-y-4 md:gap-x-4' >
      <input 
      type="text " 
      placeholder="Type to search..." 
      className= "border-2 border-gray-500 px-4 py-2 " 
      value={searchTerm} onChange={handleInputChange} 
      onKeyPress={handleKeyPress}
      />
      {/* <button onClick={handleSearch} className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'>Search</button> */}
      <FaSearch onClick={handleSearch} className='hover:text-red-800 cursor-pointer'/>
    </div>
  );
};

export default Search;
