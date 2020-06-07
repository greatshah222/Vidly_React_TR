import React from 'react';
import '../Modules/navBar.css';
import { NavLink, Link } from 'react-router-dom';

export default function NavBar({ numItem }) {
  return (
    <div className='navbar'>
      <ul>
        <NavLink className='link-navbar' to='/movies'>
          Movies
        </NavLink>
        <NavLink className='link-navbar' to='/customers'>
          Customers{' '}
        </NavLink>
        <NavLink className='link-navbar' to='/rental'>
          Rental
        </NavLink>
      </ul>
    </div>
  );
}
