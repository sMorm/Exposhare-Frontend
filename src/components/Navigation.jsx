import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapStateToProps } from '../shared/utils/redux'
import { setCurrentUser } from '../actions/user'
import _ from 'lodash'

import LoggedIn from './Navigation/LoggedIn.jsx'
import Guest from './Navigation/Guest.jsx'

import './styles/Navigation.scss'

/**
 * The main navigation component, active
 * on every page. Depending on whether
 * the user is logged in, it renders
 * <LoggedIn /> or <Guest />.
 * */
class Navigation extends Component {

  state = {
    offset: 0,
    navContainerStyle: 'navigationContainer enter',
    loggedIn: false
  }

  /**
   * Mount event listener to handle scrolling.
   * When the user scrolls down, the navigation bar
   * should disappear, when scrolling up, it will
   * re-appear. See handleScroll() for logic
   */
  componentDidMount() {
    document.addEventListener('scroll', _.debounce(this.handleScroll, 5))
  }

  /**
   * Because the navigation bar will always be
   * active(at least for now), we'll never
   * really unmount, but let's have this here
   * just to be safe.
   */
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  /**
   * Get the current Y-Axis Offset. Check our
   * previous offset, if the current offset is
   * larger than the saved offset, that mean's
   * we're scrolling down, else we're scrolling
   * up.
   */
  handleScroll = event => {
    const offset = window.pageYOffset
    if(Math.abs(this.state.offset) > Math.abs(offset)) {
      // Scrolling Up, show
      this.setState({ navContainerStyle: 'navigationContainer enter'})
    } else {
      // Scrolling down, hide
      this.setState({ navContainerStyle: 'navigationContainer exit'})
    }
    this.setState({ offset })
  }
  
  /**
   * Clear token, update redux, redirect
   */
  logout = () => {
    localStorage.removeItem('jwtToken')
    this.props.dispatch(setCurrentUser({}))
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <div className={this.state.navContainerStyle}>
          <span className='navigationContent'>
            <Link to='/' className='navigationLogo'><h1>Working</h1></Link>
            {this.props.user.isAuthenticated 
              ? <LoggedIn logout={this.logout} /> 
              : <Guest/> 
            }
          </span>
        </div>
        <div className='navigationPlaceholder' />
      </div>
    )
  }
}

Navigation.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(connect(mapStateToProps)(Navigation))
