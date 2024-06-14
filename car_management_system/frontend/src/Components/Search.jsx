import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Search(){
    const [search, setSearch] = useState();

    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }
    const handleSubmit = () => {
        console.log("User Searched for: ", search);
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
            <div className="flex items-center border border-gray-300 rounded-3xl overflow-hidden">
            <input 
                type="text" 
                value={search}
                onChange={handleChange}
                className="py-2 px-4 w-full focus:outline-none"
                placeholder="Search Cars"
                required
            />
            <button 
                type="submit" 
                onClick={handleSubmit}
                className="bg-gray-200 hover:bg-gray-300 py-2 px-4"
            >
                <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
            </button>
            </div>
        </div>
    );
}

export default Search;