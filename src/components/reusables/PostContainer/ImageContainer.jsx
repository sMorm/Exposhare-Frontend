import React, { Component } from 'react'
import moment from 'moment'

import NoProfilePicture from '../../reusables/NoProfilePicture.jsx'

// Helpers
import { generateImageLink, generateAvatarLink } from '../../../shared/utils/helpers'

// Styles
import './styles/ImageContainer.scss'

class ImageContainer extends Component {
  render() {
    const { profile_picture, pushToProfile, fullname, created_at,
      user_id, image_url, onImageLoad  } = this.props
    let profilePic = <NoProfilePicture name={fullname} size='50px' fontSize='20px' onClick={pushToProfile}/>
    if(profile_picture)
      profilePic = <img src={generateAvatarLink(user_id)} alt='avatar' onClick={pushToProfile} />
    return (
      <span className='postImageContainer'>
        <span className='userBubbleContainer'>
          <span>
            {profilePic}
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