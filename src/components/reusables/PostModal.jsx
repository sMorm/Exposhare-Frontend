import React, { Component } from 'react'

import FullScreenSpinner from '../reusables/FullScreenSpinner.jsx'

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
    const { currentPost: { image_url, liked, id, created_at, 
      user: { firstname, lastname, username, profile_picture } },
      closeModal, isLandscape } = this.props

    return (
      <div className='postModalOverlay'>
        <div className='postModalContainer'>
          <span className='lightboxClose'>
            <span className='closeModal' onClick={closeModal}/>
          </span>
          <div className={isLandscape ? 'postModalContentLandscape' : 'postModalContentPortrait'}>
            <img src={generateImageLink(image_url)} alt={`${username}'s post`} />
          </div>
        </div>
      </div>
    )
  }
}
