import React, { Component } from 'react'
import ProfileHeader from './UserProfile/ProfileHeader.jsx'

import './styles/UserProfileContainer.scss'

class UserProfileContainer extends Component {
  render() {
    return (
      <div className='container'>
        <ProfileHeader 
          fullName="Serey Morm" 
          username="SereyMorm" 
          profilePicture="http://via.placeholder.com/150x150"/>
      </div>
    )
  }
}

export default UserProfileContainer