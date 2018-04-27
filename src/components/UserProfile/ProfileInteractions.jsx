import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Apollo
import { Mutation } from 'react-apollo'
import UNFOLLOW_MUTATION from '../../graphql/Unfollow.graphql'
import FOLLOW_MUTATION from '../../graphql/Follow.graphql'
import QUERY_PROFILE_INFO from '../../graphql/UserInfo.graphql'
import CONVERSATION_MUTATION from '../../graphql/NewConversation.graphql'

// Components
import MessageModal from './MessageModal.jsx'

// Styles
import './styles/ProfileInteractions.scss'

class ProfileInteractions extends Component {
  state = {
    messageModal: false,
    conversationId: 8,
  }

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

  toggleMessage = () => this.setState({ messageModal: !this.state.messageModal })

  newConversation = (mutate, user1, user2) => () => {
    mutate({ variables: { user1, user2 }})
    .then(res => {
      this.setState({ conversationId: res.data.newConversation.id, messageModal: true })
    })
  }

  render() {
    const { messageModal, conversationId } = this.state
    const { is_following, follower, followee } = this.props
    const mutation = is_following ? UNFOLLOW_MUTATION : FOLLOW_MUTATION
    const buttonContent = is_following ? 'Following' : 'Follow'
    const buttonClass = is_following ? 'followingButton' : 'notFollowingButton'
    const updateType = is_following ? 'unfollowed' : 'following'
    return (
      <React.Fragment>
        {(messageModal && conversationId !== null) && <MessageModal conversation_id={this.state.conversationId} user_id={follower}/>}      
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
          <Mutation mutation={CONVERSATION_MUTATION}>
            {(mutate, { loading, error, data }) => {
              if(loading) return <button>...</button>
              if(error) console.log(error)
              return (
                <button onClick={this.newConversation(mutate, follower, followee)}>
                  Message
                </button>
              )
            }}
          </Mutation>
        </span>
      </React.Fragment>
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

export default withRouter(ProfileInteractions)