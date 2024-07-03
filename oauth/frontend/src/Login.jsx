import React from 'react';

const Login = () => {
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
    window.location.href = url; // Redirect the user to the authorization URL
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleAuthorize}>Authorize</button>
    </div>
  );
};

export default Login;
