import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

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
      <Link to={`/user/${props.user_id}`} className='loggedInLinkDropdown' onClick={props.toggle}>Account</Link>
      <br/>
      <Link to={'/settings'} className='loggedInLinkDropdown' onClick={props.toggle}>Settings</Link>
      <br/>
      <span className='loggedInLinkDropdown' onClick={props.logout}>Logout</span>
    </span>
  )
}

export default class LoggedIn extends Component {

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
    const { profile_picture } = this.props.user.info
    if(profile_picture) this.setState({ profile_picture })
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
    return (
      <Fragment>
        <span className='loggedInLinkContainer'>
          <Link to='/search' className='loggedInLink'>Search</Link>
          <Link to='/upload' className='loggedInLink'>Upload</Link>                    
          <Link to='/messages' className='loggedInLink'>Messages</Link>
          <span className='loggedInUserBubble' onClick={this.toggleDropdown} ref={(ref) => { this.node = ref }}>
            <img src={this.state.profile_picture} alt='User Profile'/>
            <p>{this.props.user.info.firstname}</p>
          </span>
          {this.state.showDropdown && <Dropdown logout={this.props.logout} toggle={this.toggleDropdown} user_id={this.props.user.info.id}/>}
        </span>
        <Hamburger user={this.props.user.info.firstname} logout={this.props.logout} loggedIn/>
      </Fragment>
    )
  }
}
