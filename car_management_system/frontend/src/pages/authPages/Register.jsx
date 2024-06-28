import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { backend_url } from "../../backendURL";

function Register() {

    console.log("Backend URL:", backend_url);

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log("Fetch URL:", `${backend_url}/register`);

            const response = await fetch(`${backend_url}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonData = await response.json();

            if (jsonData.message === 'Account created successfully.') {
                navigate("/login");
            } else {
                console.error('Failed to create account:', jsonData.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="bg-blue-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-2xl max-w-sm w-full">
                <h2 className="text-center mb-3 text-xl font-bold text-blue-500">Registration Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block mb-1">First Name:</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Last Name:</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
