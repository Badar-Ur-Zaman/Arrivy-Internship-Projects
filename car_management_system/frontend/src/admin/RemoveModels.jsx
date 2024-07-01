import React, { useState } from 'react';
import { backend_url } from '../backendURL';

const RemoveModels = () => {
    const [modelName, setModelName] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        setModelName(event.target.value);
    };

    const handleRemoveModel = (event) => {
        event.preventDefault();

        fetch(`${backend_url}/remove_model/${modelName}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setMessage(data.message);
        })
        .catch(error => {
            console.error('Error removing model:', error);
            setMessage('Failed to remove model. Please try again.');
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
            <h2 className="text-blue-500 text-2xl font-bold mb-4">Remove Model</h2>
            <form onSubmit={handleRemoveModel} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700">
                        Model Name:
                    </label>
                    <input
                        type="text"
                        value={modelName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-red-400 text-white p-2 rounded mt-4 hover:bg-red-600"
                >
                    Remove Model
                </button>
                {message && (
                    <div className="mt-4 p-2 text-center">
                        <p className={message.includes('successfully') ? "text-green-500" : "text-red-500"}>
                            {message}
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default RemoveModels;
