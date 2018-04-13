import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapStateToProps } from '../../shared/utils/redux'

// Components
import Hamburger from './Hamburger.jsx'
import NoProfilePicture from '../reusables/NoProfilePicture.jsx'

// Apollo
import QUERY_PROFILE from '../../graphql/UserInfo.graphql'
import { Query } from 'react-apollo'

// Helpers
import { generateAvatarLink } from '../../shared/utils/helpers'

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
      <Link to={`/user/${props.username}`} className='loggedInLinkDropdown' onClick={props.toggle}>Profile</Link>
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
    profile_picture: null
  }

  /**
   * Add/Remove event listener for clicks
   * outside of the dropdown menu in the
   * navigation bar
   */
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true)
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
    const { firstname, profile_picture, id:context_id, username } = this.props.user.info // redux info
    const { logout } = this.props
    const dropDownMenu = this.state.showDropdown && <Dropdown logout={logout} toggle={this.toggleDropdown} username={username}/>
    let hasPic = false
    return (
      <Fragment>
        <span className='loggedInLinkContainer'>
          <Link to='/search' className='loggedInLink'>Search</Link>
          <Link to='/upload' className='loggedInLink'>Upload</Link>                    
          <Link to='/messages' className='loggedInLink'>Messages</Link>
          <span className='loggedInUserBubble' onClick={this.toggleDropdown} ref={(ref) => { this.node = ref }}>
            <Query query={QUERY_PROFILE} variables={{ username, context_id }} >
              {({ loading, data, error }) => {
                let avatar = <NoProfilePicture name={firstname} size='40px'/>
                if(!loading && data.user.profile_picture !== null)
                  avatar =  <img src={generateAvatarLink(context_id)} alt={firstname}/>
                return avatar
              }}
            </Query>  
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
  logout: PropTypes.func.isRequired // from ./Navigation.jsx
}

export default connect(mapStateToProps)(LoggedIn)