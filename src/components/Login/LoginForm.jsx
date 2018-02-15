import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ThreeBounce } from 'better-react-spinkit'
import './styles/LoginForm.scss'
import Validator from 'validator'

import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { mapStateToProps } from '../../utils/redux'

// import { login } from '../../actions/login'

// Apollo Client
import { client } from '../../shared/utils/apollo'
import gql from 'graphql-tag'
class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isLoading: false
  }

  componentWillMount = () => {
    client.query({
      query: gql`
        query {
          person(id: "10", personID: "10") {
            name
          }
        }
      `
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  }
  

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  validateForm(data) {
    let errors = {}
    let isValid = true

    if(Validator.isEmpty(data.username))
      errors.username = 'A username is required'
    if(Validator.isEmpty(data.password))
      errors.password = 'Password required to login'
    if(errors.password || errors.username)
      isValid = false

    return {
      errors,
      isValid
    }
  }

  onSubmit = e => {
    e.preventDefault()
    this.setState({ isLoading: true })
    const { isValid, errors } = this.validateForm(this.state)
    if(isValid) {
      this.props.login(this.state)
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
        <form className='loginForm' onSubmit={this.onSubmit}>
          <h1>Login</h1>
          <input
            type='text'
            name='username'
            placeholder='Username'
            onChange={this.onChange}
            value={this.state.username}/>
          <br/>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={this.onChange}
            value={this.state.password}/>
          <br/>
          <p className='signupMember'>Not a member? <Link to='/signup'>Signup</Link></p>          
          <button
            type='submit'>
            {this.state.isLoading ? <ThreeBounce color='white' size={14}/> : 'LOGIN' }
          </button>
          <div className='mediaDivider'>
            <hr/>
            <p>OR</p>
          </div>
        </form>
      </div>
    )
  }
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default LoginForm