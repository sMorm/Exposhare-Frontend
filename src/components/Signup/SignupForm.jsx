import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ThreeBounce } from 'better-react-spinkit'
import Validator from 'validator'
// import { connect } from 'react-redux'

// import { signup } from '../../actions/signup'

import './styles/SignupForm.scss'
class SignupForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isLoading: false,
    errors: {},
  }

  validateForm(data) {
    let errors = {}
    let isValid = true

    if(Validator.isEmpty(data.username))
      errors.username = 'A username is required'
    if(Validator.isEmpty(data.password))
      errors.password = 'Password required to signup'
    if(data.confirmPassword != data.password)
      errors.password = 'Please confirm your password'
    if(data.password.length < 8 )
      errors.password = 'Password size must be greater than 8.'
    if(data.password !== data.confirmPassword) {
      isValid = false
      errors.confirmPassword = "Passwords do not match."
    }
    if(errors.password || errors.username)
      isValid = false

    return {
      errors,
      isValid
    }
  }

  clearErrors = () => {
    this.setState({ errors: {} })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({ isLoading: true })
    const { isValid, errors } = this.validateForm(this.state)
    if(isValid) {
      this.props.signup(this.state)
      .then(res => {
        // console.log(res)
        this.context.router.history.push('/')
      })
      .catch(err => {
        console.log(err)
        this.setState({err, isLoading: false})
      })
      
    } else {
      this.setState({ errors, isLoading: false })
    }
  }

  render() {
    return (
      <div>
        <form className='signupForm' onSubmit={this.onSubmit}>
          <h1>Signup</h1>
          <span className='signupNames'>
            <span className='signupLabel'>
              <label>{this.state.errors.firstName}</label>
              <input
                name='firstname'
                type='text'
                placeholder='First Name'
                onChange={this.onChange}
                value={this.state.firstname}/>
            </span>
            <span className='signupLabel'>
              <label>{this.state.errors.lastName}</label>
              <input
                name='lastname'
                type='text'
                placeholder='Last Name'
                onChange={this.onChange}
                value={this.state.lastname}/>
            </span>
          </span>
          <br/>
          <div className='signupSingles'>
            <input
              name='username'
              type='text'
              placeholder='Username'
              onChange={this.onChange}
              value={this.state.username}/>
            <input
              name='email'
              type='email'
              placeholder='Email'
              onChange={this.onChange}
              value={this.state.email}/>
          </div>
          <br/>
          <div className='signupSingles'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              onChange={this.onChange}
              value={this.state.password}/>
            <input
              name='confirmPassword'
              type='password'
              placeholder='Confirm Password'
              onChange={this.onChange}
              value={this.state.confirmPassword}/>
          </div>
          <br/>
          <p className='signupMember'>Already a member? <Link to='/login'>Login</Link></p>
          <button
            type='submit'>
            {this.state.isLoading ? <ThreeBounce color='white' size={18}/> : 'SIGNUP' }
          </button>
          <div className='mediaDivider'>
            <hr/><p>OR</p>
          </div>
        </form>
      </div>
    )
  }
}

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SignupForm