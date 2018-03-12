import React, { Component, Fragment } from 'react'
import Lottie from 'react-lottie'

import './styles/PostContainer.scss'

import lottieFile from '../../shared/lottie/love_explosion.json'

export default class PostContainer extends Component {
  state = {
    liked: false
  }

  likePicture = () => this.setState({ liked: !this.state.liked })

  render() {
    const { content, image_url, likes } = this.props.post
    const profile_picture = 'http://via.placeholder.com/100x100'
    const heart = 'https://s3.amazonaws.com/exposhare-statics/heart.png'
    const lottieOptions = { loop: false, autoplay: true, animationData: lottieFile }
    return (
      <Fragment>
        <div className='postContainer'>
          <span className='postImageContainer'>
            <span className='userBubbleContainer'>
              <img src={profile_picture} alt='profile' />
              <p>Serey Morm</p>
            </span>
            <img src={`https://s3.amazonaws.com/gui-project-database${image_url}`} alt='' />
          </span>
          <span className='postContentContainer'>
            <h2>Description</h2>
            <p>{content}</p>
            <span className='postInteractionContainer'>
              <span className='postLikesContainer'>
                <span className='likeImage' onClick={this.likePicture}>
                  {this.state.liked
                    ? <Lottie options={lottieOptions} width={60} height={60} />
                    : <img src={heart} alt='heart'/>
                  }
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
