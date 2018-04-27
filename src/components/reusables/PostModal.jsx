import React, { Component } from 'react'

import FullScreenSpinner from '../reusables/FullScreenSpinner.jsx'
import PostInteractions from '../reusables/PostContainer/PostInteractions.jsx'
import { generateImageLink } from '../../shared/utils/helpers'

import './styles/PostModal.scss'
export default class PostModal extends Component {
  
  state = {
    loading: true
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.handleKeypress)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeypress)
  }
  
  handleKeypress = e => e.key === 'Escape' && this.props.closeModal()

  render() {
    const { currentPost: { image_url, liked,likes, id:post_id, created_at, content, comments,
      user: { id:profile_id, firstname, lastname, username, profile_picture } },
      closeModal, isLandscape, refetch, index } = this.props
    
    return (
      <div className='postModalOverlay'>
        <div className='postModalContainer'>
          <span className='lightboxClose'>
            <span className='closeModal' onClick={closeModal}/>
          </span>
          <div className={isLandscape ? 'postModalContentLandscape' : 'postModalContentPortrait'}>
            <img src={generateImageLink(image_url)} alt={`${username}'s post`} />
            <PostInteractions
              content={content}
              comments={comments}
              likes={likes}
              liked={liked}
              post_id={post_id}
              profile_id={profile_id}
              refetch={refetch}
              index={index}
              profile
              />
          </div>
        </div>
      </div>
    )
  }
}

// content, likes, liked, comments, post_id, profile_id, containerHeight, refetch