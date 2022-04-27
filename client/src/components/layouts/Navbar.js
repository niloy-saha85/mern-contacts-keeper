import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const Nav = () => {
  const auth = useAuth();
  const { isAuthenticated, doLogout, user } = auth;

  const onLogout = (e) => {
    e.preventDefault();
    doLogout();
  }

  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/#">Contacts Keeper</a>
      {/* <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
      <ul className="navbar-nav px-3" style={{flexDirection: 'row'}}>
        {user && <li className="nav-item text-nowrap mr-2">
          <a href='/#' onClick={onLogout} className="nav-link" >Hi! {user.name}</a>
        </li>}
        <li className="nav-item text-nowrap">
          {!isAuthenticated && <NavLink to={`/login`} className="nav-link" >Login</NavLink>}
          {isAuthenticated && <FontAwesomeIcon icon={faSignOut} onClick={onLogout} className="nav-link mt-1 ml-5" style={{cursor: 'pointer'}} />}
          {/* <a className="nav-link" href="/#">Sign out</a> */}
        </li>
      </ul>
    </nav>
  )
}

export default Nav;