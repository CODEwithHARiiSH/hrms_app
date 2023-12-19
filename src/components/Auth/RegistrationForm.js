import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './auth.css';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
        username,
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.message === 'true'){alert("Registered successfully, Please login");
        navigate('/login');}
        else{alert("Registered successfully, Please login")
             setEmail('')
            setUsername('')
          setPassword('')                          }
    } catch (error) {
      alert('failed to register check credentials');
    }
  };


  return (
    <div className='image'>
    <div className='login_container'>
    <div className='login_card'>
        <div className='row'>
          <h3>Register Here</h3>
        </div>
        <form onSubmit={handleSubmit} className='registration-form'>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control"
              placeholder="Username"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            style={{ marginTop: '15px', width: '100%' }}
          >
            Register
          </button>
        </form>
        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RegistrationForm;
