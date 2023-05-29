import React from 'react';
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ color }) => {
  const location = useLocation();

  return (
    <div className="custom-navbar" style={{backgroundColor: location.pathname === '/' ? 'transparent' : "white",  paddingTop: '20px'}}>
      <Link 
        style={{ 
          color: color, textDecoration: "none"}} to="/"
      >
        Today's Seoul
      </Link>
    </div>
  );
};

export default Navbar;
