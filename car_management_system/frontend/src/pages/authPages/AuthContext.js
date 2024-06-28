// AuthContext.js

import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backend_url } from '../../backendURL';

// Create context for authentication
const AuthContext = createContext();

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to hold authenticated user details
    const navigate = useNavigate();

    // Simulated login function
    const login = async (email, password) => {
        try {
            const response = await fetch(`${backend_url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.access_token);
                setUser(data.user); // Set user state with received user details
                navigate('/');
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    // Simulated logout function
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null); // Clear user state
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access authentication context
export const useAuth = () => useContext(AuthContext);
