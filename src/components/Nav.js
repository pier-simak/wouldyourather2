import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Nav (props) {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/new' activeClassName='active'>
            New Tweet
          </NavLink>
        </li>
        {props.loggedIn === false ? null : (
          <li>
            <NavLink to='/logout' activeClassName='active'>
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}