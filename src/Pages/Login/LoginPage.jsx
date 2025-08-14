import React, { useState, useEffect } from 'react';



// App.jsx
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');

  const login = async () => {
    console.log("login method called");
    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.text();
      console.log('JWT token:', data);

      localStorage.setItem('token', data);
      setOutput('Logged in!');
    } catch (err) {
      console.error(err);
      setOutput('Login failed');
    }
  };

  const getProtected = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8080/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      setOutput('Failed to fetch protected data');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setOutput('Logged out');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>

      <h2>Protected Data</h2>
      <button onClick={getProtected}>Get Protected</button>
      <pre>{output}</pre>
    </div>
  );
}

export default LoginPage;


