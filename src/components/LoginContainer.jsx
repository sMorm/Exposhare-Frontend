import React, { Component } from 'react'
import LoginForm from './Login/LoginForm.jsx'
import { svgBus } from '../shared/constants/links'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import './styles/LoginContainer.scss'

class LoginContainer extends Component {

  componentDidMount = () => {
    if(localStorage.jwtToken) this.props.history.push('/')
  }
  
  render() {
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

LoginContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(LoginContainer)