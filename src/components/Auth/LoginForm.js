import React, { useState} from 'react';
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ setAuthentication }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
 
   try {
      const response = await axios.post('http://localhost:5000/login', {
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
    <div className='container'>
      <div className='row'>
        <h3>Login Here</h3>
      </div>

      <div className='row'>
        <form onSubmit={handleSubmit}>
          <br />

            <input type="text" value={username} onChange={(e) => setUsername(e.target.value) } required placeholder='Username'/>
<br /><br />
  
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Password'/>
    <br /><br/>
          <button  className="submit-button" type="submit">Login</button>
        </form>
        <div>
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
