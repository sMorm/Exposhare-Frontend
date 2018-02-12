import React, { Component } from 'react'

import LoginForm from './Login/LoginForm.jsx'

import './styles/LoginContainer.scss'
import busSVG from '../images/bus.svg'
export default class LoginContainer extends Component {
  render() {
    return (
      <div className='container'>
        <span className='signupContent'>
          <div className='signupImageContainer'>
            <span className='campContainer'>
              <img src={busSVG} alt=''/>
            </span>           
          </div>
          <LoginForm /> 
        </span>
        
      </div>
    )
  }
}
