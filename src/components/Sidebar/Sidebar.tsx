import React from 'react';
import {CategoryData} from "../../types";
import {NavLink} from "react-router-dom";

interface Props {
  categories: CategoryData[];
}

const Sidebar: React.FC<Props> = (props) => {

  return (

    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sticky-top" style={{width: '280px'}}>
      <hr/>
      <span className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        Categories
      </span>
      <hr/>
      <ul className="nav nav-pills flex-column mb-auto">
        {props.categories.length >= 0 ? (
          <li>
            <NavLink to="/" className="nav-link text-white">All</NavLink>
          </li>
        ) : null}
        {props.categories.map((category) => (
          <li key={category.id}>
            <NavLink
              to={`quotes/${category.id}`}
              className="nav-link text-white"
            >
              {category.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default Sidebar;