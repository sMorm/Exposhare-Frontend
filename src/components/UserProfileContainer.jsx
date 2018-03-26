import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ProfileHeader from './UserProfile/ProfileHeader.jsx'
import GridFeed from './UserProfile/GridFeed.jsx'
import LottieLoad from './reusables/LottieLoad.jsx'
import GET_PROFILE from '../graphql/Profile.graphql'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import './styles/UserProfileContainer.scss'

class UserProfileContainer extends Component {
  render() {
    const id = this.props.match.params[0]
    return (
      <Query query={GET_PROFILE} variables={{ id }} >
        {({ loading, error, data }) => {
          if(loading) return <h1>loading</h1>
          if(error) return <h1>error in userprofilecontainer</h1>
          const { user, userPosts } = data
          return (
            <div className='container'>
              <ProfileHeader user={user} />
              <GridFeed posts={userPosts} user={user}/>
            </div>
          )
        }}
      </Query>
    )
    }
  }

export default withRouter(UserProfileContainer)