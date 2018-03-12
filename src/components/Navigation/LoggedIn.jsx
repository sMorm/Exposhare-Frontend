import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import Hamburger from './Hamburger.jsx'

// Already loaded in Guest.jsx
import './styles/LoggedIn.scss'

const Dropdown = (props) => {
  return (
    <span className='loggedInDropdownContainer'>
      <span className='dropdownTriangle'/>
      <Link to='/account' className='loggedInLinkDropdown' onClick={props.toggle}>Account</Link>
      <br/>
      <Link to='/' onClick={props.logout} className='loggedInLinkDropdown' onClick={props.toggle}>Logout</Link>
    </span>
  )
}
export default class LoggedIn extends Component {
  state = {
    showDropdown: false
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true)
  }

  toggleDropdown = () => this.setState({ showDropdown: !this.state.showDropdown }) 

  handleClickOutside = event => {
    if (!this.node.contains(event.target)){
      this.setState({ showDropdown: false })
    }
  }

  render() {
    let picture = 'https://via.placeholder.com/100x100'
    if(this.props.user.info.profile_picture)
      picture = this.props.user.info.profile_picture
    return (
      <Fragment>
        <span className='loggedInLinkContainer'>
          <Link to='/upload' className='loggedInLink'>Upload</Link>                    
          <Link to='/messages' className='loggedInLink'>Messages</Link>
          <span className='loggedInUserBubble' onClick={this.toggleDropdown} ref={(ref) => { this.node = ref }}>
            <img src={picture} alt='User Profile'/>
            <p>{this.props.user.info.firstname}</p>
          </span>
          {this.state.showDropdown && <Dropdown logout={this.props.logout} toggle={this.toggleDropdown}/>}
        </span>
        <Hamburger user={this.props.user.info.firstname} logout={this.props.logout} loggedIn/>
      </Fragment>
    )
  }
}
