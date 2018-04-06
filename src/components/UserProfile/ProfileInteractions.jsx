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
    return (
      <span className='profileInteractions'>
        {is_following
          ? <Mutation 
            mutation={UNFOLLOW_MUTATION}
            update={ cache => this.updateCache(cache, 'unfollowed') } >
              {(removeFollow, { data, loading, error}) => {
                if(loading) 
                  return <button className='followLoading'>...</button>
                return (
                  <button 
                    onClick={() => removeFollow({ variables: { follower, followee } })}
                    className='followingButton'>
                  Following
                  </button>
                )
              }}
            </Mutation>
          :  <Mutation 
              mutation={FOLLOW_MUTATION}
              update={ cache => this.updateCache(cache, 'following')} >
              {(newFollow, { data, loading, error}) => {
                if(loading) 
                  return <button className='followLoading'>...</button>
                return (
                  <button 
                  onClick={() => newFollow({ variables: { follower, followee } })}
                  className='notFollowingButton'>
                  Follow
                  </button>
                )
              }}
            </Mutation>
          } 
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
