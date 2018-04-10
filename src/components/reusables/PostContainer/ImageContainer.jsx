import React, { Component } from 'react'
import moment from 'moment'

// Helpers
import { generateImageLink } from '../../../shared/utils/helpers'

// Styles
import './styles/ImageContainer.scss'

class ImageContainer extends Component {
  render() {
    const { profilePicURL, pushToProfile, fullname, created_at, image_url, onImageLoad  } = this.props
    return (
      <span className='postImageContainer'>
        <span className='userBubbleContainer'>
          <span>
            <img src={profilePicURL} alt='profile' onClick={pushToProfile}/>
            <h3 onClick={pushToProfile}>{fullname}</h3>
          </span>
          <p>{moment(created_at).fromNow()}</p>
        </span>
        <img src={generateImageLink(image_url)} alt='' onLoad={onImageLoad}/>
      </span>
    )
  }
}

export default ImageContainer