import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { ThreeBounce } from 'better-react-spinkit'
import PropTypes from 'prop-types'
import { validateLoginForm } from '../../shared/utils/validate'
import { connect } from 'react-redux'
import { dispatchAndRedirect } from '../../shared/utils/redux'
import { setCurrentUser } from '../../actions/user'
import jwt from 'jsonwebtoken'

import { graphql, Mutation } from 'react-apollo'
import LOGIN_MUTATION from '../../graphql/Login.graphql'

import './styles/LoginForm.scss'

class LoginForm extends Component {
  
  state = {
    email: '',
    password: '',
    errors: {}
  }

  // don't allow spaces
  onChange = (e) => {
    const { errors } = this.state
    let value = e.target.value
    if(value.includes(" "))
      value = value.replace(/\s/g, "")
    delete errors[e.target.name] // remove error notification on change
    this.setState({ [e.target.name]: value, errors })
  }


  onSubmit = (e, loginUser) => {
    e.preventDefault()
    const { dispatch, authenticate } = this.props
    const { push } = this.props.history
    const { email, password } = this.state

    const { isValid, errors } = validateLoginForm(this.state)
    if(isValid) {
      loginUser({ variables: { email, password } })
      .catch(e => {
        // do stuff on error
      })
    } else {
      this.setState({ errors })
    }
  }

  render() {
    return (
      <Mutation mutation={LOGIN_MUTATION}>
        {(loginUser, { data, loading, error } ) => {
          if(data) {
            const { token } = data.loginUser
            localStorage.setItem('jwtToken', token)
            this.props.dispatch(setCurrentUser(jwt.decode(token)))
            this.props.history.push('/')
          }
          let errorMessage = ''
          if(error) errorMessage = (error.graphQLErrors.find(f => f)).message
          let formErrors = ''
          if( Object.entries(this.state.errors).length > 0) {
            formErrors = (
              <ul className='formErrorList'>
                {Object.entries(this.state.errors).map((e, key) => {
                  return <li key={key}>{e[1]}</li>
                })}
              </ul>
            )
          }
          return (
            <div className='loginFormContainer'>
              <form className='loginForm' onSubmit={e => this.onSubmit(e, loginUser)}>
                <h1>Login</h1>
                <input
                  type='email'
                  name='email'
                  placeholder='E-mail'
                  onChange={this.onChange}
                  value={this.state.email}
                  required/>
                <br/>
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={this.onChange}
                  value={this.state.password}
                  required/>
                <br/>
                <p className='errorText'>{errorMessage}</p>
                <button
                  type='submit'>
                  {loading ? <ThreeBounce color='white' size={14}/> : 'LOGIN' }
                </button>
                <p className='signupMember'>Not a member? <Link to='/signup'>Signup</Link></p>          
                {formErrors}
              </form>
            </div>
          )
        }}
    </Mutation>
    )
  }
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(connect()(LoginForm))