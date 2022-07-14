import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
      <nav className="navbar navbar-dark bg-primary mb-3">
        <div className="container">
        <h1>LAB - WikiCountries</h1>
        <NavLink
          to="/"
          className="navbar-brand"
        >
          WikiCountries
        </NavLink>
        </div>
      </nav>


  );
};

export default Navbar;
