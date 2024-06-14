import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

function Register(){
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form Information: " , {firstname, lastname, email, password});
        navigate("/Login");
    }

    return(
        <div className="bg-blue-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-2xl max-w-sm w-full">
                <h2 className="text-center mb-3 text-xl font-bold text-blue-500">Registration Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block mb-1">First Name:</label>
                        <input 
                            type="text" 
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Last Name:</label>
                        <input 
                            type="text" 
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Email:</label>
                        <input 
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Password:</label>
                        <input 
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Submit</button>
                </form>
            </div>
        </div>

    )
};

export default Register;
