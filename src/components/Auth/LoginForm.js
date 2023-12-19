import React, { useState} from 'react';
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';
import './auth.css';


const LoginForm = ({ setAuthentication }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
 
   try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.message === 'true'){
        alert("login successfully");
        localStorage.setItem('authToken', 'hrms');
        setAuthentication(true); 
        navigate('/employees');
      }
      else {
        alert("login failed ,try again");
        setPassword('')
        setUsername('')
      }
    } catch (error) {
      alert('failed to login check credentials');
    }
   
  };


  return (
    <div className='image'>
    <div className='login_container'>
      <div className='login_card'>
      <h3 style={{ textAlign: 'center' }}>Login Here</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="Username"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="Password"
          />
        </div>
        <button style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }} type="submit">
          Login
        </button>
      </form>
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  </div>
  </div>
  );
};

export default LoginForm;
