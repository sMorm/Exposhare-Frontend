import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { ThreeBounce } from 'better-react-spinkit'
import './styles/LoginForm.scss'
import PropTypes from 'prop-types'
import { validateLoginForm } from '../../shared/utils/validate'
import { connect } from 'react-redux'
import { dispatchAndRedirect } from '../../shared/utils/redux'

import { graphql } from 'react-apollo'
import LOGIN_MUTATION from '../../graphql/Login.graphql'
class LoginForm extends Component {
  
  state = {
    email: '',
    password: '',
    isLoading: false
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onSubmit = e => {
    e.preventDefault()
    const { dispatch, authenticate } = this.props
    const { push } = this.props.history
    const { email, password } = this.state

    this.setState({ isLoading: true })
    const { isValid, errors } = validateLoginForm(this.state)
    if(isValid) {
      authenticate({ email, password })
      .then(res => {
        const { token } = res.data.authenticate
        dispatchAndRedirect({ token, dispatch, push })
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
            name='email'
            placeholder='E-mail'
            onChange={this.onChange}
            value={this.state.email}/>
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

LoginForm.propTypes = {
  authenticate: PropTypes.func.isRequired
}

const withMutations = graphql(LOGIN_MUTATION, {
  props: ({ mutate }) => ({
    authenticate: ({ email, password }) => {
      return mutate({ variables: { email, password } })
    }
  })
})

export default withRouter(connect()(withMutations(LoginForm)))