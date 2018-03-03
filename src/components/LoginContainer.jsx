import React, { Component } from 'react'
import LoginForm from './Login/LoginForm.jsx'
import { svgBus } from '../shared/constants/links'

import './styles/LoginContainer.scss'

export default class LoginContainer extends Component {
  render() {
    return (
      <div className='container'>
        <span className='signupContent'>
          <div className='signupImageContainer'>
            <span className='campContainer'>
              <img src={svgBus} alt='undraw.co' />
            </span>           
          </div>
          <LoginForm /> 
        </span>
      </div>
    )
  }
}
