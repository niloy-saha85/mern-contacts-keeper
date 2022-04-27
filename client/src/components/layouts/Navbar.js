import React from 'react'
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Nav = () => {
  const auth = useAuth();
  const { isAuthenticated, doLogout } = auth;

  const onLogout = (e) => {
    e.preventDefault();
    doLogout();
  }

  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/#">Contacts Keeper</a>
      {/* <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          {!isAuthenticated && <NavLink to={`/login`} className="nav-link" >Login</NavLink>}
          {isAuthenticated && <a href='/#' onClick={onLogout} className="nav-link" >Logout</a>}
          {/* <a className="nav-link" href="/#">Sign out</a> */}
        </li>
      </ul>
    </nav>
  )
}

export default Nav;