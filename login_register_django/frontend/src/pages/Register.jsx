import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import api from "../api";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false); 

  const authorizationUrl = 'http://127.0.0.1:8000/o/authorize/';
  const params = {
    response_type: 'code',
    code_challenge: 'JZzb7H8TdHOioHRgmDVJ-C9oi62-2smO5952UWfrSIU',
    code_challenge_method: 'S256',
    client_id: 'AEgBHJifpN0R1nGNXjULiG51FmqVPiDPkLLT0hvb',
    redirect_uri: 'http://localhost:8000/noexist/callback',
  };

  const buildUrl = (baseUrl, params) => {
    const query = new URLSearchParams(params).toString();
    return `${baseUrl}?${query}`;
  };

  const handleAuthorize = () => {
    const url = buildUrl(authorizationUrl, params);
    window.open(url, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/register/", { username, password });
      const data = res.data;
      if (data.success) {
        setRegistered(true);
      } else {
        console.log(data);
        alert("Something goes wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (registered) {
    return <Navigate to="/login" />; 
  }

  return (
    <div className="container"> 
      <div className="form-container">
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
        <button className="authorize-button" onClick={handleAuthorize}>Sign In with OAuth2</button>
      </div>
    </div>
  );
};

export default Register;
