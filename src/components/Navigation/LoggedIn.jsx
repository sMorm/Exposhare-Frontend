import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapStateToProps } from '../../shared/utils/redux'

// Components
import Hamburger from './Hamburger.jsx'

// Already loaded in Guest.jsx
import './styles/LoggedIn.scss'

/**
 * 
 * @param {toggle} props
 * toggles the function that closes
 * the dropdown menu. 
 */
const Dropdown = (props) => {
  return (
    <span className='loggedInDropdownContainer'>
      <span className='dropdownTriangle'/>
      <Link to={`/user/${props.username}`} className='loggedInLinkDropdown' onClick={props.toggle}>Account</Link>
      <br/>
      <Link to={'/edit-profile'} className='loggedInLinkDropdown' onClick={props.toggle}>Settings</Link>
      <br/>
      <span className='loggedInLinkDropdown' onClick={props.logout}>Logout</span>
    </span>
  )
}

class LoggedIn extends Component {

  state = {
    showDropdown: false,
    profile_picture: 'https://via.placeholder.com/100x100'
  }

  /**
   * Add/Remove event listener for clicks
   * outside of the dropdown menu in the
   * navigation bar
   */
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true)
    const { profile_picture, id } = this.props.user.info
    if(profile_picture) 
      this.setState({ profile_picture: `https://s3.amazonaws.com/gui-project-database/${id}/profile_picture.png?t=${+ new Date().getTime()}` })
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true)
  }

  toggleDropdown = () => this.setState({ showDropdown: !this.state.showDropdown }) 

  handleClickOutside = event => {
    if(event.target.innerHTML === 'Logout')
      this.props.logout()
    else if (!this.node.contains(event.target)){
      this.setState({ showDropdown: false })
    }
  }

  render() {
    const { firstname, profile_picture, id, username } = this.props.user.info // redux info
    const { logout } = this.props
    const dropDownMenu = this.state.showDropdown && <Dropdown logout={logout} toggle={this.toggleDropdown} username={username}/>
    return (
      <Fragment>
        <span className='loggedInLinkContainer'>
          <Link to='/search' className='loggedInLink'>Search</Link>
          <Link to='/upload' className='loggedInLink'>Upload</Link>                    
          <Link to='/messages' className='loggedInLink'>Messages</Link>
          <span className='loggedInUserBubble' onClick={this.toggleDropdown} ref={(ref) => { this.node = ref }}>
            <img src={this.state.profile_picture} alt='User Profile'/>
            <p>{firstname}</p>
          </span>
          {dropDownMenu}
        </span>
        <Hamburger user={firstname} logout={logout} loggedIn/>
      </Fragment>
    )
  }
}

LoggedIn.propTypes = {
  logout: PropTypes.func.isRequired // from /components/Navigation.jsx
}

export default connect(mapStateToProps)(LoggedIn)