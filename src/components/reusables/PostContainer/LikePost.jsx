import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Apollo
import { Mutation } from 'react-apollo'
import LIKE_MUTATION from '../../../graphql/Like.graphql'
import UNLIKE_MUTATION from '../../../graphql/Unlike.graphql'
import FEED_QUERY from '../../../graphql/Feed.graphql'

// Lottie
import Lottie from 'react-lottie'
import lottieFile from '../../../shared/lottie/love_explosion.json'

// Redux
import { connect } from 'react-redux'
import { mapStateToProps } from '../../../shared/utils/redux'

// Styles & Images
import { likeHeart } from '../../../shared/constants/links'
import './styles/LikePost.scss'


class LikePost extends Component {

  updateCache = cache => {
    const { index, liked, likes } = this.props
    const { id } = this.props.user.info

    // Read Cache
    let { userFeed } = cache.readQuery({
      query: FEED_QUERY,
      variables: { id: this.props.user.info.id, after: null }
    })

    // Make a copy of the feed, and the item to update
    let updatedFeed = userFeed, toUpdate = userFeed[index]
    toUpdate.liked = !liked
    if(this.props.liked)
      toUpdate.likes = String(Number(userFeed[index].likes) - 1)
    else
      toUpdate.likes = String(Number(userFeed[index].likes) + 1)
    updatedFeed[index] = toUpdate
    cache.writeQuery({
      query: FEED_QUERY,
      variables: { id: this.props.user.info.id, after: null },
      data: { userFeed: updatedFeed }
    })
  }
  
  render() {
    const { profile_id, post_id, likes, liked } = this.props
    const { id:user_id } = this.props.user.info
    const lottieOptions = { loop: false, autoplay: true, animationData: lottieFile }   
    return (
      <span className='likePostContainer'>
        <span>
          <Mutation 
            mutation={liked ? UNLIKE_MUTATION : LIKE_MUTATION}
            update={ cache => this.updateCache(cache)}>
              {(mutate, { data, loading, error }) => {
                if(loading) return <img src={likeHeart} alt='heart' />
                const mutateVariables = { variables: { user_id, post_id } }
                if(liked){
                  return (
                    <span onClick={() => mutate(mutateVariables)} >
                      <Lottie options={lottieOptions} width={60} height={64} />
                    </span>
                  )
                } else {
                  return (
                    <img src={likeHeart} alt='heart' onClick={() => mutate(mutateVariables)}/>
                  )
                }
              }
            }
          </Mutation>
        </span>
        <p>{likes} likes</p>
      </span>
    )
  }
}

LikePost.propTypes = {
  post_id: PropTypes.number.isRequired,
  likes: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(LikePost)