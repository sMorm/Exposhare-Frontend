import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Hamburger from './Hamburger.jsx'

import './styles/NavigationOptions.scss'

// Navigation link options for guest users
const LinkOptions = () => {
  return (
    <span className='navigationLinkContainer'>
      <Link to='/login' className='navigationLink'>LOGIN</Link>
      <Link to='/signup' className='navigationLink'>SIGNUP</Link>
    </span>
  )
}

/**
 * Hamburger is the hamburger menu rendered on
 * smaller devices
 */
export default class Guest extends Component {
  render() {
    return (
      <span>
        <Hamburger guest/>
        <LinkOptions />
      </span>
    )
  }
}
