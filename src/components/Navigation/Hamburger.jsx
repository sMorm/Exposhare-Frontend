import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Ionicon from 'react-ionicons'
import { mapStateToProps } from '../../shared/utils/redux'
import { setCurrentUser } from '../../actions/user'
import './styles/Hamburger.scss'

/**
 * Hamburger menu to render links for users that 
 * aren't logged in.
 */
const GuestOptions = () => {
  return (
    <div className='hamburgerLinkContainer'>
      <div className='hamburgerLinkContent'>
        <Link to='/login' className='hamburgerLink'>
          LOGIN
          <Ionicon icon='ios-create-outline' fontSize='30px' color='black'/>
        </Link>
        <Link to='/signup' className='hamburgerLink'>
          SIGNUP
          <Ionicon icon='ios-happy-outline' fontSize='30px' color='black'/>
        </Link>
      </div>
    </div>
  )
}

/**
 * Hamburger menu to render links for users that 
 * are logged in.
 */
const LoggedInOptions = (props) => {
  return (
    <div className='hamburgerLinkContainer'>
      <div className='hamburgerLinkContent'>
        <Link to='/' className='hamburgerLink'>
          HOME
          <Ionicon icon='ios-home-outline' fontSize='30px' color='black'/>
        </Link>
        <Link to={`/user/${props.userId}`} className='hamburgerLink'>
          PROFILE
          <Ionicon icon='ios-happy-outline' fontSize='30px' color='black'/>
        </Link>
        <Link to='/search' className='hamburgerLink'>
          SEARCH
          <Ionicon icon='ios-search-outline' fontSize='30px' color='black'/>
        </Link>
        <Link to='/upload' className='hamburgerLink'>
          UPLOAD
          <Ionicon icon='ios-photos-outline' fontSize='30px' color='black'/>
        </Link>
        <span className='hamburgerLink' onClick={props.logout}>
          LOGOUT
          <Ionicon icon='ios-exit-outline' fontSize='30px' clock='black' />
        </span>
      </div>
    </div>
  )
}

class Hamburger extends Component {
  state = {
    hamburgerStyle: 'hamburger', // hamburger menu style class
    navOverlay: 'navOverlay', // overlay class
    showMenu: false
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => this.setState({ showMenu: false, hamburgerStyle: 'hamburger' })

  /**
   * Toggles classes for hamburger menu on open,
   * setTimeout is used to debounce the animation
   */
  toggle = () => {
    if(this.state.hamburgerStyle === 'hamburger')
      this.setState({ hamburgerStyle: 'hamburger open', showMenu: true})
    else {
      this.setState({ hamburgerStyle: 'hamburger', navOverlay: 'navOverlay overlayLeave'})
      setTimeout(() => this.setState({  showMenu: false, navOverlay: 'navOverlay' }), 250)
    }
  }

  logout = () => {
    localStorage.removeItem('jwtToken')
    this.props.dispatch(setCurrentUser({}))
    this.props.history.push('/')
  }

  render() {
    return (
      <Fragment>
        <div className={this.state.hamburgerStyle} onClick={this.toggle}>
          <span className="hamburger__top-bun"/>
          <span className="hamburger__bottom-bun"/>
        </div>
        {this.state.showMenu && (
          <span className={this.state.navOverlay}>
            <span className='overlayContent'>
              <span onClick={this.toggle}>
                {this.props.guest ? <GuestOptions /> : <LoggedInOptions logout={this.logout} userId={this.props.user.info.id}/>}
              </span>
            </span>
          </span>
        )}
      </Fragment>
    )
  }
}

export default withRouter(connect(mapStateToProps)(Hamburger))