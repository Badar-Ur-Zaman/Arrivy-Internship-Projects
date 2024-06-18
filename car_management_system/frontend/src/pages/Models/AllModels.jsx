import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function AllModels() {
    const location = useLocation();
    const [models, setModels] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { brand } = location.state || {};

    useEffect(() => {
        const handleSubmit = async () => {
            console.log("Brand received in AllModels:", brand);
            if (!brand) {
                console.error("No brand found in location state");
                return;
            }
            try {
                const response = await fetch('http://localhost:5000/models', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ brand })
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setModels(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        };
        handleSubmit();
    }, [brand]);

    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + models.length) % models.length;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % models.length;
        setCurrentIndex(newIndex);
    };

    if (!brand) {
        return <div>No brand selected</div>;
    }

    return (
        <div className="w-full h-screen overflow-hidden">
            <div className="relative w-full h-full">
                <div className="carousel overflow-hidden relative w-full h-full">
                    <div className="flex transition-transform duration-500 w-full h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {models.map((model, index) => (
                            <div 
                                key={model[0]} 
                                className="carousel-item w-full flex-shrink-0 relative h-full"
                            >
                                <div className="absolute z-50 top-10 left-10 p-4 text-white">
                                    <div className="text-lg flex items-start flex-col">
                                        <div><span>{`Year: ${model[3]}`}</span></div>
                                        <div><span>{`Price: ${model[4]} $`}</span></div>
                                        <div><span>{`Fuel-Type: ${model[5]}`}</span></div>
                                    </div>
                                </div>
                                <img 
                                    src={model[2]}
                                    alt={model[1]} 
                                    className="w-full h-full object-cover" 
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <button className="text-white text-3xl flex">
                                        <span className="mr-2">
                                            {model[1]}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent bg-opacity-50 text-white text-xl px-3 py-1 rounded">←</button>
                <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent bg-opacity-50 text-white text-xl px-3 py-1 rounded">→</button>
            </div>
        </div>
    );
}

export default AllModels;
