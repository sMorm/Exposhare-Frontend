import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { ThreeBounce } from 'better-react-spinkit'
import { validateSignupForm } from '../../shared/utils/validate'

// Redux
import { connect } from 'react-redux'
import { mapStateToProps, dispatchAndRedirect } from '../../shared/utils/redux'

import { graphql } from 'react-apollo'
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
    isLoading: false,
    errors: {},
  }

  clearErrors = () => {
    this.setState({ errors: {} })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { signup, dispatch } = this.props
    const { push } = this.props.history
    const { firstname, lastname, email, password } = this.state
    const { isValid, errors } = validateSignupForm(this.state)    
    this.setState({ isLoading: true })
    
    if(isValid) {
      signup(firstname, lastname, email, password)
      .then(res => {
        const { token } = res.data.newUser
        dispatchAndRedirect({ token, dispatch, push })
      })
      .catch(err => {
        console.log(err)
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

SignupForm.propTypes = {
  signup: PropTypes.func.isRequired
}

const withMutations = graphql(SIGNUP_MUTATION, {
  props: ({ mutate }) => ({
    signup: (firstname, lastname, email, password) => { 
      return mutate({ variables: { firstname, lastname, email, password } })
    }
  })
})

export default withRouter(connect()(withMutations(SignupForm)))