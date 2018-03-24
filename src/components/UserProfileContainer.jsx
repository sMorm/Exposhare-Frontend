import React, { Component } from 'react'

import ProfileHeader from './UserProfile/ProfileHeader.jsx'
import GridFeed from './UserProfile/GridFeed.jsx'
import LottieLoad from './reusables/LottieLoad.jsx'
import GET_POSTS from '../graphql/User.graphql'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import './styles/UserProfileContainer.scss'

class UserProfileContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <ProfileHeader />
        <div style={{height: '2000px'}}/>
      </React.Fragment>
    )
    }
  }

export default UserProfileContainer