import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { RotatingPlane } from 'better-react-spinkit'

// Components
import ImageContainer from './ImageContainer.jsx'
import PostInteractions from './PostInteractions.jsx'

// Helpers
import { generateImageLink, generateAvatarLink } from '../../../shared/utils/helpers'

import './styles/PostContainer.scss'
import { likeHeart } from '../../../shared/constants/links'


class PostContainer extends Component {
  state = {
    containerHeight: 200,
    imageLoaded: false
  }

  pushToProfile = () => this.props.history.push(`/user/${this.props.post.user.username}`)

  // setImageContainerHeight = () => setTimeout(() => this.setState({ containerHeight: this.refs.container.clientHeight }), 25)
  
  onLoad = () => setTimeout(() => this.setState({ imageLoaded: true }), 250)

  render() {
    const { id:post_id, content, created_at, image_url, likes, liked, comments,
      user: { firstname, lastname, profile_picture, id } } = this.props.post
    const { user_id, refetch, index } = this.props
    const { containerHeight, imageLoaded } = this.state

    if(!imageLoaded) {
      return (
        <div className='postContainer' ref='container'>
          <div className='postLoadingContainer'>
            <RotatingPlane size={50} color='#ccc' />
          </div>
          <img src={generateImageLink(image_url)} alt='' className='hide' onLoad={this.onLoad}/>
        </div>
      )
    }

    return (
      <div className='postContainer' ref='container'>
        <ImageContainer 
          profile_picture={profile_picture}
          fullname={`${firstname} ${lastname}`}
          image_url={image_url}
          created_at={created_at}
          pushToProfile={this.pushToProfile}
          onImageLoad={() => this.setState({ imageLoaded: true })}
          user_id={id}/>
        <PostInteractions
          content={content}
          likes={likes} 
          liked={liked}
          comments={comments}
          user_id={user_id}
          post_id={post_id}
          containerHeight={containerHeight}
          refetch={refetch}
          index={index}/>
      </div>
    )
  }
}

export default withRouter(PostContainer)