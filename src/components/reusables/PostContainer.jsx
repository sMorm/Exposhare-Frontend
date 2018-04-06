import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import './styles/PostContainer.scss'

// Apollo
import { Mutation } from 'react-apollo'
import FEED_QUERY from '../../graphql/Feed.graphql'
import LIKE_MUTATION from '../../graphql/Like.graphql'
import UNLIKE_MUTATION from '../../graphql/Unlike.graphql'

// Lottie
import Lottie from 'react-lottie'
import lottieFile from '../../shared/lottie/love_explosion.json'

// Helpers
import { generateAvatarLink } from '../../shared/utils/helpers'

class PostContainer extends Component {

  pushToProfile = () => this.props.history.push(`/user/${this.props.post.user.username}`)

  render() {
    const { id:post_id, content, image_url, likes, liked, user: { firstname, lastname, profile_picture, id } } = this.props.post
    const { user_id } = this.props
    let profilePicURL = 'http://via.placeholder.com/100x100'
    if(profile_picture)
      profilePicURL = generateAvatarLink(id)
    const heart = 'https://s3.amazonaws.com/exposhare-statics/heart.png'
    const lottieOptions = { loop: false, autoplay: true, animationData: lottieFile }
    return (
      <Fragment>
        <div className='postContainer'>
          <span className='postImageContainer'>
            <span className='userBubbleContainer'>
              <img src={profilePicURL} alt='profile' onClick={this.pushToProfile}/>
              <p onClick={this.pushToProfile}>{`${firstname} ${lastname}`}</p>
            </span>
            <img src={`https://s3.amazonaws.com/gui-project-database${image_url}`} alt='' />
          </span>
          <span className='postContentContainer'>
            <h2>Description</h2>
            <p>{content}</p>
            <span className='postInteractionContainer'>
              <span className='postLikesContainer'>
                <span className='likeImage'>
                  {liked
                    ? (
                      <Mutation 
                        mutation={UNLIKE_MUTATION}
                        refetchQueries={[{query: FEED_QUERY, variables: { id: user_id, after: null } }]}
                        >
                        {(removeLike, { data, loading, error }) => {
                          if(loading) return <img src={heart} alt='heart' />
                          return (
                            <span onClick={() => removeLike({ variables: { user_id, post_id } })} >
                              <Lottie options={lottieOptions} width={60} height={60} />
                            </span>
                          )
                        }}
                      </Mutation>
                    )
                    : (
                      <Mutation 
                        mutation={LIKE_MUTATION}
                        refetchQueries={[{query: FEED_QUERY, variables: { id: user_id, after: null } }]}
                        >
                        {(newLike, { data, loading, error }) => {
                          if(loading) return <img src={heart} alt='heart' />
                          return (
                            <img src={heart} 
                              alt='heart'
                              onClick={() => newLike({ variables: { user_id, post_id } })}/>
                          )
                        }}
                      </Mutation>
                    )
                  }
                </span>
                <p>{likes} likes</p>
              </span>
            </span>     
          </span>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(PostContainer)