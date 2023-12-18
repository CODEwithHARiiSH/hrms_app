import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, NavDropdown } from 'react-bootstrap';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <BootstrapNavbar bg="info" expand="lg">
      <div className="container-fluid">
        <Link to={'/'} className="navbar-brand">HRMS</Link>
        {isLoggedIn ? (
          <>
            <span className="navbar-brand">Welcome</span>
            <Nav>
              <NavDropdown title="Employees" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/employees">
                  Employee List
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/registeremployee">
                  Register new Employee
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <button onClick={handleLogout} className="navbar-brand">Logout</button>
          </>
        ) : (
          <>
            <Link to={"/login"} className="navbar-brand">Login</Link>
            <Link to={"/register"} className="navbar-brand">Register</Link>
          </>
        )}
        <Link to={"/about"} className="navbar-brand">About</Link>
      </div>
    </BootstrapNavbar>
  );
};

export default Navbar;
