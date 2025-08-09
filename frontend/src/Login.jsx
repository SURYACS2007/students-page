import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // your existing CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:500/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store roll number in local storage
        localStorage.setItem('rollno', data.rollno);
        navigate('/stdmark'); // Redirect to students page on success
      } else {
        alert(data.message || 'Invalid username or roll number.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-body">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            required
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />

          <label htmlFor="password">Roll no</label>
          <input
            id="rollno"
            type="text"
            required
            placeholder="Enter roll number"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button type="submit" className="btn-login">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;