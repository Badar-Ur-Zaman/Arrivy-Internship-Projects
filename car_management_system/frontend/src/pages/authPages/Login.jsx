import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("User Information: ", {email, password});
        navigate("/")
    }

    return(
        <div className="bg-blue-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-2xl max-w-sm w-full">
                <h2 className="text-center mb-3 text-xl font-bold text-blue-500">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block mb-1">Email: </label>
                        <input
                            type="email"
                            onChange={(e)=>setEmail(e.target.value)} 
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Password: </label>
                        <input 
                            type="password"
                            onChange={(e)=>setPassword(e.target.value)} 
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="mt-2 w-full bg-blue-500 text-white py-2 rounded">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;