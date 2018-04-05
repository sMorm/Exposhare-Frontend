import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ProfileHeader from './UserProfile/ProfileHeader.jsx'
import GridFeed from './UserProfile/GridFeed.jsx'
import LottieLoad from './reusables/LottieLoad.jsx'
import { connect } from 'react-redux'
import { mapStateToProps } from '../shared/utils/redux'
import QUERY_PROFILE_INFO from '../graphql/ProfileInfo.graphql'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import './styles/UserProfileContainer.scss'

class UserProfileContainer extends Component {
  render() {
    const username = this.props.match.params[0]
    const { id:context_id } = this.props.user.info
    return (
      <Query query={QUERY_PROFILE_INFO} variables={{ username, context_id }} >
        {({ loading, error, data }) => {
          if(loading) return <h1>loading</h1>
          if(error) return <h1>error: fetch profile info</h1>
          const { user } = data
          if(data) {
            return (
              <div className='container'>
                <ProfileHeader userInfo={user} />
                <GridFeed id={data.user.id} context_id={context_id} />
              </div>
            )
          }
        }}
      </Query>
    )
    }
  }

  export default connect(mapStateToProps)(withRouter(UserProfileContainer))

  // <GridFeed id={user.id} context_id={context_id} />
  // <GridFeed 
  // posts={userPosts} 
  // user={user}
  // onLoadMore={() => {
  //   fetchMore({
  //     variables: {
  //       after: userPosts[userPosts.length-1].id
  //     },
  //     updateQuery: (prev, {fetchMoreResult}) => {
  //       if(!fetchMoreResult) return prev
  //       return Object.assign({}, prev, {
  //         userPosts: [...prev.feed, ...fetchMoreResult.feed]
  //       })
  //     }
  //   })
  // }}/>