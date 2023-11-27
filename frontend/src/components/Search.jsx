// SearchComponent.jsx
import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <input type="text " placeholder="Type to search..." className= "border-2 border-gray-500 px-4 py-2 mr-5" value={searchTerm} onChange={handleInputChange} />
      <button onClick={handleSearch} className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'>Search</button>
    </div>
  );
};

export default Search;
