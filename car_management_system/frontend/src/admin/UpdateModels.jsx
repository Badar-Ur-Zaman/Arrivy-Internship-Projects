import React, { useState, useEffect } from 'react';
import { backend_url } from '../backendURL';

const UpdateModels = ({ modelId }) => {
    const [model, setModel] = useState({
        name: '',
        backgroundImg_url: '',
        issuanceYear: '',
        price: '',
        fuel_type: ''
    });

    useEffect(() => {
        fetch(`${backend_url}/`)
            .then(response => response.json())
            .then(data => {
                setModel(data); 
            })
            .catch(error => {
                console.error('Error fetching model details:', error);
            });
    }, [modelId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModel(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${backend_url}/update_model`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Model updated successfully:', data);
        })
        .catch(error => {
            console.error('Error updating model:', error);
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
            <h2 className="text-blue-500 text-2xl font-bold mb-4">Update Model</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700">
                        Name: <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={model.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700">
                        Background Image URL:
                    </label>
                    <input
                        type="text"
                        name="backgroundImg_url"
                        value={model.backgroundImg_url}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700">
                        Issuance Year:
                    </label>
                    <input
                        type="number"
                        name="issuanceYear"
                        value={model.issuanceYear}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700">
                        Price:
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={model.price}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700">
                        Fuel Type:
                    </label>
                    <input
                        type="text"
                        name="fuel_type"
                        value={model.fuel_type}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-400 text-white p-2 rounded mt-4 hover:bg-blue-600"
                >
                    Update Model
                </button>
            </form>
        </div>
    );
    
};

export default UpdateModels;
