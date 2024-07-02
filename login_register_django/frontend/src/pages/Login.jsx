import React, { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import "../styles/Login.css"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/login/", { username, password });
      const data = res.data;
      if (data.success) {
        localStorage.setItem(ACCESS_TOKEN, data.token);
        alert(data.message);
      } else {
        alert("Something Goes Wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container"> {/* Apply the container class */}
      <div className="form-container"> {/* Apply the form-container class */}
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
