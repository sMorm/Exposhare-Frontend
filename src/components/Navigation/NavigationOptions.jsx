import React from 'react'
import { Link } from 'react-router-dom'

export const Guest = () => {
  return (
    <span className='navigationLinkContainer'>
      <Link to='/login' className='navigationLink'>LOGIN</Link>
      <Link to='/signup' className='navigationLink'>SIGNUP</Link>
    </span>
  )
}

export const LoggedIn = props => {
  return (
    <span className='navigationLinkContainer'>
      <Link to='/profile' className='navigationLink'>{props.user.info.firstname}</Link>
      <Link to='/' onClick={props.logout} className='navigationLink'>LOGOUT</Link>
    </span>
  )
}