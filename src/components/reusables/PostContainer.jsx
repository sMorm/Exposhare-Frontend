import React, { Component, Fragment } from 'react'
import Lottie from 'react-lottie'
import { withRouter } from 'react-router-dom'
import './styles/PostContainer.scss'

import { Mutation } from 'react-apollo'
import LIKE_MUTATION from '../../graphql/Like.graphql'
import UNLIKE_MUTATION from '../../graphql/Unlike.graphql'

import lottieFile from '../../shared/lottie/love_explosion.json'

class PostContainer extends Component {
  state = {
    liked: false
  }

  likePicture = () => this.setState({ liked: !this.state.liked })

  pushToProfile = () => this.props.history.push(`/user/${this.props.post.user.id}`)

  render() {
    const { id:post_id, content, image_url, likes, liked, user: { firstname, lastname, profile_picture } } = this.props.post
    const { user_id } = this.props
    const profilePicURL = profile_picture === null ? 'http://via.placeholder.com/100x100' : profile_picture
    const heart = 'https://s3.amazonaws.com/exposhare-statics/heart.png'
    const lottieOptions = { loop: false, autoplay: true, animationData: lottieFile }
    let likeMutation
    if(liked) {
      likeMutation = (
        <Mutation mutation={UNLIKE_MUTATION} variables={{ user_id , post_id }}>
          {(unlike, { data, loading, error }) => (
            <Lottie options={lottieOptions} width={60} height={60} onClick={unlike}/>
          )}
        </Mutation>
      )
    } else {
      likeMutation = (
        <Mutation mutation={LIKE_MUTATION}>
          {(newLike, { data, loading, error }) => {
            if(error) console.log(error.graphqlErrors)
            if(data) console.log(data)
            return <img src={heart} alt='heart' onClick={() => {
              newLike({ variables: { user_id , post_id } })
              .catch(e => console.log(e.graphqlErrors))
            }} />
          }}
        </Mutation>
      )
    }
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
                <span className='likeImage' onClick={this.likePicture}>
                 {likeMutation}
                </span>
                <p>{likes} likes</p>
              </span>
            </span>     
          </span>
        </div>
        <br/><br/><br/>
      </Fragment>
    )
  }
}

export default withRouter(PostContainer)