// Node Modules
import React, { Component } from 'react'

// Import Components
import SignupForm from './SignupForm.jsx'

// Import images/styles
import { svgCamp } from '../../shared/constants/links'
import './styles/Signup.scss'

export default class Signup extends Component {
  render() {
    return (
      <div className='container'>
        <span className='signupContent'>
          <div className='signupImageContainer'>
            <span className='campContainer'>
              <img src={svgCamp} alt='undraw.co' />
            </span>
          </div>
          <SignupForm />
        </span>
      </div>
    )
  }
}
