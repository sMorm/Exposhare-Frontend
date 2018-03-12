import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Hamburger from './Hamburger.jsx'

import './styles/NavigationOptions.scss'

const LinkOptions = () => {
  return (
    <span className='navigationLinkContainer'>
      <Link to='/login' className='navigationLink'>LOGIN</Link>
      <Link to='/signup' className='navigationLink'>SIGNUP</Link>
    </span>
  )
}

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
