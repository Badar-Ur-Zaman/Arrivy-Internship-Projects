import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css"; // Make sure Tailwind CSS is imported

function Brands() {
    const [brands, setBrands] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                const response = await fetch('http://localhost:5000/brands');
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setBrands(data);
            } catch (error) {
                console.error(error);
            }
        };
        handleSubmit();
    }, []);

    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + brands.length) % brands.length;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % brands.length;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="w-full h-screen overflow-hidden">
            <div className="relative w-full h-full">
                <div className="carousel overflow-hidden relative w-full h-full">
                    <div className="flex transition-transform duration-500 w-full h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {brands.map((brand, index) => (
                            <div 
                                key={brand[0]} 
                                className="carousel-item w-full flex-shrink-0 relative h-full"
                            >
                                <div className="absolute z-50 top-3 left-3 p-4 text-white">
                                    <div className="flex items-center">
                                        <span className="mr-2">Name: {brand[1]}</span>
                                        <img 
                                            src={`${brand[4]}`}
                                            alt={`${brand[1]} Logo`} 
                                            className="w-8 h-8" 
                                        />
                                    </div>
                                </div>
                                <img 
                                    src={`${brand[2]}`}
                                    alt={brand[1]} 
                                    className="w-full h-full object-cover" 
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <h3 className="text-white text-3xl">
                                        <a href={brand[3]} target="_blank" rel="noopener noreferrer">
                                            {brand[1]}
                                        </a>
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white text-xl px-3 py-1 rounded">Prev</button>
                <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white text-xl px-3 py-1 rounded">Next</button>
            </div>
        </div>
    );
}

export default Brands;
