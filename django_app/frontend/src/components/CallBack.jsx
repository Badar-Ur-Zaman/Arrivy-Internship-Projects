import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN_OAuth, REFRESH_TOKEN_OAuth } from '../constants'; // Ensure these constants are defined

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const code_verifier = localStorage.getItem('code_verifier');

      console.log(code_verifier);

      try {
        const response = await axios.post(`http://localhost:8001/callback/?code=${code}`, {
          code_verifier: code_verifier,
        });
        const tokenData = response.data;
        console.log('Token data:', tokenData);

        localStorage.setItem(ACCESS_TOKEN_OAuth, tokenData.access_token);
        localStorage.setItem(REFRESH_TOKEN_OAuth, tokenData.refresh_token);

        // Redirect to the main page or another appropriate page
        navigate('/');
      } catch (error) {
        console.error('Error during token exchange:', error);
        // Handle error appropriately, maybe redirect to an error page
      }
    };

    fetchToken();
  }, [location, navigate]);

  return (
    <div>
      <h2>Callback</h2>
      <p>Processing...</p>
    </div>
  );
};

export default Callback;
