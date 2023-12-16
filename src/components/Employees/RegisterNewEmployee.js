import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RegisterNewEmployee= () => {
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/registeremployee', {
        designation,
        email,
        firstName,
        lastName,
        phone,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(response.data.message);
      navigate('/employee');
    } catch (error) {
      alert('Error during registration');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <h3>Register New Employee Here</h3>
      </div>

      <div className='row'>
        <form onSubmit={handleSubmit} className='registration-form'>
     
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Last Name'/>
        
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='First Name'/>
         <br /><br />
   
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone'/>
        <br /><br />
   
            <input type="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder='Designation'/>
 <br /><br />
          <button type="submit">Register</button>
        </form>
        <div>
          <p>Already an Employee? <Link to="/employee">Employee List</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterNewEmployee;
