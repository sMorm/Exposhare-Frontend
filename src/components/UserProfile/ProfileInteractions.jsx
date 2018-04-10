import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Apollo
import { Mutation } from 'react-apollo'
import UNFOLLOW_MUTATION from '../../graphql/Unfollow.graphql'
import FOLLOW_MUTATION from '../../graphql/Follow.graphql'
import QUERY_PROFILE_INFO from '../../graphql/ProfileInfo.graphql'


// Styles
import './styles/ProfileInteractions.scss'

export default class ProfileInteractions extends Component {

  updateCache = (cache, action) => {
    const { username, context_id } = this.props
    const { user } = cache.readQuery({ 
      query: QUERY_PROFILE_INFO,
      variables: { username, context_id }
    })
    let { followers } = user
    if(action === 'unfollowed')
      followers--
    else
      followers++
    cache.writeQuery({
      query: QUERY_PROFILE_INFO,
      variables: { username, context_id },
      data: { user: { ...user, is_following: !user.is_following, followers }}
    })
  }

  render() {
    const { is_following, follower, followee } = this.props
    const mutation = is_following ? UNFOLLOW_MUTATION : FOLLOW_MUTATION
    const buttonContent = is_following ? 'Following' : 'Follow'
    const buttonClass = is_following ? 'followingButton' : 'notFollowingButton'
    const updateType = is_following ? 'unfollowed' : 'following'
    return (
      <span className='profileInteractions'>
        <Mutation 
          mutation={mutation}
          update={ cache => this.updateCache(cache, updateType)}>
          {(mutate, { loading, error, data }) => {
            if(loading) return <button className='followLoading'>...</button>
            return (
              <button 
                onClick={() => mutate({ variables: { follower, followee } })}
                className={buttonClass}>
                {buttonContent}
              </button>
            )
          }}
        </Mutation> 
        <button>Message</button>
      </span>
    )
  }
}


ProfileInteractions.propTypes = {
  is_following: PropTypes.bool.isRequired,
  follower: PropTypes.number.isRequired,
  followee: PropTypes.number.isRequired,
  context_id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired
}
