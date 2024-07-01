import React, { useState } from "react";
import { backend_url } from "../backendURL";

function AddModels() {
    const [name, setName] = useState("");
    const [backgroundImgUrl, setBackgroundImgUrl] = useState("");
    const [issuanceYear, setIssuanceYear] = useState("");
    const [price, setPrice] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [brand, setBrand] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name) {
            setMessage("Name is required.");
            return;
        }

        try {
            const response = await fetch(`${backend_url}/add_model`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, backgroundImgUrl, issuanceYear, price, fuelType, brand }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const jsonData = await response.json();
            console.log(jsonData);

            if (jsonData.message === 'Model added successfully.') {
                setMessage("Model added successfully.");
                setName("");
                setBackgroundImgUrl("");
                setIssuanceYear("");
                setPrice("");
                setFuelType("");
                setBrand("");
            } else {
                setMessage(`Failed to add model: ${jsonData.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
            <h2 className="text-blue-500 text-2xl font-bold mb-4">Add a New Model</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700">
                        Name: <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700">
                        Background Image Url:
                    </label>
                    <input
                        type="text"
                        placeholder="Background Img Url"
                        value={backgroundImgUrl}
                        onChange={(e) => setBackgroundImgUrl(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700">
                        Issuance Year:
                    </label>
                    <input
                        type="number"
                        placeholder="Year"
                        value={issuanceYear}
                        onChange={(e) => setIssuanceYear(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700">
                        Price (In $): <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700">
                        Fuel Type: <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Fuel Type"
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700">
                        Brand Name:
                    </label>
                    <input
                        type="text"
                        placeholder="Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-400 text-white p-2 rounded mt-4 hover:bg-blue-600"
                >
                    Add Model
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
}

export default AddModels
