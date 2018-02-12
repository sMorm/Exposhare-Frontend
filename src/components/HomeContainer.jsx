import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './styles/HomeContainer.scss'

import polaroids from '../images/polaroids.svg'

class HomeContainer extends Component {
  render() {
    return (
      <div className='homeContainer'>
        <div className='welcomeContainer'>
          <span className='welcomeText'>
            <h1>Photo Sharing</h1>
            <p>For Everyone.</p>
            <Link to='/signup' className='welcomeSignupButton'>
              Join the Community
            </Link>
          </span>
          <img src={polaroids} alt='undraw.co' />
        </div>
      </div>
    )
  }
}

export default HomeContainer