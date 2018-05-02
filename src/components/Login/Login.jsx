import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components
import LoginForm from './LoginForm.jsx'

// Styles/Media
import { svgBus } from '../../shared/constants/links'
import './styles/Login.scss'

class Login extends Component {
  render() {
    if(localStorage.jwtToken) this.props.history.push('/')
    return (
      <div className='container'>
        <span className='loginContent'>
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

Login.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(Login)