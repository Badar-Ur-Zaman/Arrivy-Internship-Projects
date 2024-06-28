import React, { useState } from "react";
import { backend_url } from "../backendURL";

function AddBrand() {
    const [name, setName] = useState("");
    const [backgroundImgUrl, setBackgroundImgUrl] = useState("");
    const [website, setWebsite] = useState("");
    const [logo_url, setLogoUrl] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name) {
            setMessage("Name is required.");
            return;
        }

        try {
            const response = await fetch(`${backend_url}/add_brand`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, backgroundImgUrl, website, logo_url }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const jsonData = await response.json();
            console.log(jsonData);

            if (jsonData.message === 'Brand added successfully.') {
                setMessage("Brand added successfully.");
                setName("");
                setBackgroundImgUrl("");
                setWebsite("");
                setLogoUrl("");
            } else {
                setMessage(`Failed to add brand: ${jsonData.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
            <h2 className="text-blue-500 text-2xl font-bold mb-4">Add a New Brand</h2>
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
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
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
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700">
                        Website:
                    </label>
                    <input 
                        type="text" 
                        placeholder="Website" 
                        value={website} 
                        onChange={(e) => setWebsite(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-gray-700">
                        Brand Logo Url:
                    </label>
                    <input 
                        type="text" 
                        placeholder="Logo Url" 
                        value={logo_url} 
                        onChange={(e) => setLogoUrl(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-400 text-white p-2 rounded mt-4 hover:bg-blue-600"
                >
                    Add Brand
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

export default AddBrand;
