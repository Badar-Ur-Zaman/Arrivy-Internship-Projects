import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api";
import "../styles/Register.css"

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/register/", { username, password });
      const data = res.data;
      if (data.status) {
        navigate("/login");
      } else {
        console.log(data);
        alert("Something goes wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container"> {/* Apply the container class */}
      <div className="form-container"> {/* Apply the form-container class */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
