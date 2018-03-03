import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { svgPolaroid } from '../../shared/constants/links'

import './styles/GuestHome.scss'

export default class GuestHome extends Component {
  render() {
    return (
      <div className='guestHomeContainer'>
        <div className='welcomeContainer'>
          <span className='welcomeText'>
            <h1>Photo Sharing</h1>
            <p>For Everyone.</p>
            <Link to='/signup' className='welcomeSignupButton'>
              Join the Community
            </Link>
          </span>
          <img src={svgPolaroid} alt='undraw.co' />
        </div>
        <div style={{height: '2000px'}}/>
      </div>
    )
  }
}
