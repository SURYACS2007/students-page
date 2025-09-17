import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const API_BASE_URL = 'https://students-page.onrender.com';

function Login() {
  const [username, setUsername] = useState('');
  const [rollno, setRollno] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare payload (trim spaces)
      const payload = {
        username: username.trim(),
        rollno: rollno.trim(),
      };

      console.log("Sending login payload:", payload);

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Save roll number in local storage
        localStorage.setItem('rollno', data.rollno || payload.rollno);

        // Navigate to result page
        navigate('/stdmark');
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
      <header className="header">
        DHIRAJLAL GANDHI COLLEGE OF TECHNOLOGY
      </header>

      <div className="login-card">
        <div className="notice">
          📢 Upcoming Results will be published on 
          <span className="date"> 30th August 2025 At 9 AM</span>
        </div>

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
            autoComplete="off"
          />

          <label htmlFor="rollno">Roll no</label>
          <input
            id="rollno"
            type="text"
            required
            placeholder="Enter roll number"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
            autoComplete="off"
          />

          <button type="submit" className="btn-login">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
