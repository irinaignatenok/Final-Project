import React from 'react';
import { Link, NavLink } from 'react-router-dom';





const Navbar = (props) => {
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container nav-container">
        <Link className="brand-logo" to="/"><i class="fas fa-house-user"></i></Link>
        <ul className="right">
          <li><NavLink exact to="/">Realtor</NavLink></li>
          <li><NavLink to='/buy'>Buy</NavLink></li>
          <li><NavLink to='/rent'>Rent</NavLink></li>
          <li><NavLink to='/saved'>Saved</NavLink></li>
          <li><NavLink to='/sell'>Sell</NavLink></li> 
        </ul>
      </div>
    </nav> 
  )
}

export default Navbar;




