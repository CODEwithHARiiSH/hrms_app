import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import axios from 'axios';
import registerImage from './register.jpg'

const RegisterNewEmployee= () => {
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/registeremployee`, {
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
      setDesignation('')
      setEmail('')
      setFirstName('')
      setLastName('')
      setPhone('')
      window.location.reload();
    } catch (error) {
      alert('Error during registration');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: `url(${registerImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    card: {
      width: '300px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    row: {
      textAlign: 'center',
    },
    registrationForm: {
      marginTop: '15px',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '15px',
      boxSizing: 'border-box',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
    },
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.row}>
          <h3>Register New Employee Here</h3>
        </div>
        <form onSubmit={handleSubmit} style={styles.registrationForm}>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Last Name"
            style={styles.input}
          />

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="First Name"
            style={styles.input}
          />
          <br /><br />
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Designation"
            style={styles.input}
          />
          <br /><br />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={styles.input}
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            style={styles.input}
          />
          <br /><br />

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        <div style={styles.row}>
          <p>
            Already an Employee? <Link to="/">Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterNewEmployee;
