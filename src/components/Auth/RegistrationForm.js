import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      alert('failed to register check credentials');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <h3>Register Here</h3>
      </div>

      <div className='row'>
        <form onSubmit={handleSubmit} className='registration-form'>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}required />
          </label><br />
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}required />
          </label><br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}required />
          </label><br />
          <button type="submit">Register</button>
        </form>
        <div>
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
