
import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EmployeeList from './components/Employees/EmployeeList.js';
import EmployeeDetails from './components/Employees/EmployeeDetails.js';
import RegisterNewEmployee from './components/Employees/RegisterNewEmployee.js';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import About from './components/About/About.js';
import LoginForm from './components/Auth/LoginForm';
import RegistrationForm from './components/Auth/RegistrationForm';
import './style.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginForm setAuthentication={handleLogin} />} />
          <Route path="/register" element={<RegistrationForm />} />
          {isLoggedIn ? (
            <>
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/employees/:empid" element={<EmployeeDetails />} />
              <Route path="/registeremployee" element={<RegisterNewEmployee />} />
            </>
          ) : (
            <Route  element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
  
}

export default App;
