import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import './styles/Navigation.scss'

class Navigation extends Component {

  state = {
    offset: 0,
    navContainerStyle: 'navigationContainer enter'
  }

  /**
   * Mount event listener to handle scrolling.
   * When the user scrolls down, the navigation bar
   * should disappear, when scrolling up, it will
   * re-appear. See handleScroll() for logic
   */
  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)
  }

  /**
   * Because the navigation bar will always be
   * active(at least for now), we'll never
   * really unmount, but let's have this here
   * just to be safe.
   */
  componentWillUnmount() {
    document.removeEventListener('scroll')
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
    if(this.state.offset > offset) {
      // Scrolling Up, show
      this.setState({ navContainerStyle: 'navigationContainer enter'})
    } else {
      // Scrolling down, hide
      this.setState({ navContainerStyle: 'navigationContainer exit'})
    }
    this.setState({ offset })
  }

  render() {
    return (
      <div>
        <div className={this.state.navContainerStyle}>
          <span className='navigationContent'>
            <Link to='/' style={{textDecoration: 'none'}}><h1>Exposhare</h1></Link>
            <span className='navigationLinkContainer'>
              <Link to='/login' className='navigationLink'>LOGIN</Link>
              <Link to='/signup' className='navigationLink'>SIGNUP</Link>
            </span>
          </span>
        </div>
        <div className='navigationPlaceholder' />
      </div>
    )
  }
}

const AuthRoute = withRouter(() => {
  return localStorage.jwtToken 
  ? (
    <span className='navigationLinkContainer'>
      <Link to='/profile' className='navigationLink'>{localStorage.firstname}</Link>
      <Link to='/' onClick={logout()} className='navigationLink'>LOGOUT</Link>
    </span>
  ) 
  : (
    <span className='navigationLinkContainer'>
      <Link to='/login' className='navigationLink'>LOGIN</Link>
      <Link to='/signup' className='navigationLink'>SIGNUP</Link>
    </span>
  )
})

export default Navigation
