import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <span
          className="navbar-brand code fw-bold"
          role="button"
          onClick={() => navigate('/')}
        >
          Quotes Central
        </span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Main</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/add-quote" className="nav-link">Create</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;