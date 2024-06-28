import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { backend_url } from "../backendURL";


function Search() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate()

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backend_url}/search_brands`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTerm: search }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResults(data);
            console.log(data);
            navigate('/models', {state: {brand: data[0]}})
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
            <div className="flex items-center border border-gray-300 rounded-3xl overflow-hidden">
                <input 
                    type="text" 
                    value={search}
                    onChange={handleChange}
                    className="py-2 px-4 w-full focus:outline-none"
                    placeholder="Search Models"
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
            {results.length > 0 && (
                <div className="relative w-full h-full mt-4">
                    <div className="carousel overflow-hidden relative w-full h-full">
                        <div className="flex transition-transform duration-500 w-full h-full">
                            {results.map((brand, index) => (
                                <div key={brand.id} className="carousel-item w-full flex-shrink-0 relative h-full">
                                    <div className="absolute z-50 top-3 left-3 p-4 text-white">
                                        <div className="flex items-center flex-col">
                                            <div>
                                                <span>{brand.name}</span>
                                            </div>
                                            <a href={brand.official_website} target="_blank" rel="noopener noreferrer" className="mt-2 bg-gray-800 bg-opacity-50 text-white text-xl px-3 py-1 rounded">Official Website</a>
                                        </div>
                                    </div>
                                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
