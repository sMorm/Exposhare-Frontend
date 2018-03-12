import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { svgPolaroid } from '../../shared/constants/links'
import Lottie from 'react-lottie'

import Header from '../reusables/Header.jsx'

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
              Join the Community!
            </Link>
          </span>
          <img src={svgPolaroid} alt='undraw.co' />
        </div>

        <div className='secondWelcomeContainer'>
          <span className='secondWelcomeContent'>
            <img src='https://s3.amazonaws.com/sereymorm.com/media/street12.jpg' alt=''/>
            <span className='secondWelcomeText'>
              <p><strong>Photo Sharing</strong> Not just photographers.</p>
            </span>
          </span>
          <span className='secondWelcomeContent'>
            <img src='https://s3.amazonaws.com/sereymorm.com/media/street13.jpg' alt=''/>
            <span className='secondWelcomeText'>
              <p><strong>For Everyone</strong> Share photos with friends.</p>
            </span>
          </span>
        </div>

        <div className='discoverContainer'>
          <Header title='Discover' />
        </div>
        <div style={{height: '2000px'}}/>
      </div>
    )
  }
}
