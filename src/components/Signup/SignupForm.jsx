import React, { Component } from 'react'
import PropTypes from 'prop-types'
import jwt from 'jsonwebtoken'
import { Link, withRouter } from 'react-router-dom'
import { ThreeBounce } from 'better-react-spinkit'
import { validateSignupForm } from '../../shared/utils/validate'
import { setCurrentUser } from '../../actions/user'

// Redux
import { connect } from 'react-redux'
import { mapStateToProps, dispatchAndRedirect } from '../../shared/utils/redux'

import { Mutation } from 'react-apollo'
import SIGNUP_MUTATION from '../../graphql/Signup.graphql'

import './styles/SignupForm.scss'

class SignupForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {},
  }

  componentDidMount = () => {
    if(localStorage.jwtToken)
      this.props.history.push('/')
  }
  

  clearErrors = () => {
    this.setState({ errors: {} })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e, newUser) => {
    e.preventDefault()
    const { firstname, lastname, email, password, username } = this.state
    const { isValid, errors } = validateSignupForm(this.state)    
    const bio = ''
    
    if(isValid) {
      newUser({ variables: { firstname, lastname, email, password, bio, username } })
    } else {
      this.setState({ errors })
    }
  }

  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION}>
        {(newUser, { data, error, loading }) => {
          if(error) {
            return <h1>server error</h1> // graphql server error
          }
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
          if(data) {
            const { token } = data.newUser
            localStorage.setItem('jwtToken', token)
            this.props.dispatch(setCurrentUser(jwt.decode(token)))
            this.props.history.push('/get-started')
          }
          return (
            <div>
              <form className='signupForm' onSubmit={(e) => this.onSubmit(e, newUser)}>
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
                  {loading ? <ThreeBounce color='white' size={18}/> : 'SIGNUP' }
                </button>
                {formErrors}
              </form>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

// <div className='mediaDivider'>
//   <hr/><p>OR</p>
// </div> if we decide to do social logins, 
// add to end of form

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(connect()(SignupForm))