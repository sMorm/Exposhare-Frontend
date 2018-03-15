import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Lottie from 'react-lottie'

import lottieFile from '../../shared/lottie/picture.json'

import './styles/UploadZone.scss'

/**
 * This component lets the user pick
 * what photo they want to upload. On
 * completion, <EditZone /> will be 
 * rendered with the selected image.
 */
export default class UploadZone extends Component {
  render() {
    const lottieOptions = { loop: true, autoplay: true, animationData: lottieFile }
    let message = 'Drop, Tap, or Click!', uploadDropzoneContainerStyle = 'uploadDropzoneContainer'
    if(this.props.errorMessage !== null){
      message = this.props.errorMessage
      uploadDropzoneContainerStyle = 'uploadDropzoneContainer errorText'
    }
    return (
      <div className='uploadZoneContainer'>
        <div className='dropzonePrompt'>
          <Dropzone
          onDrop={this.props.onDrop}
          accept="image/*"
          className='uploadDropzone'
          activeClassName='uploadDropzoneActive'>
            <span className={uploadDropzoneContainerStyle}>
              <Lottie options={lottieOptions} height={300} width={300} />
              <p>{message}</p>
            </span>
          </Dropzone>
          <span className='dropzonePromptText'>
            <span>
              <h1>On a Desktop?</h1>
              <p>Drag a photo into the colored field, or click it to browse your computer for a photo you'd like to share to your feed.</p>
            </span>
            <span>
              <h1>Mobile Device?</h1>
              <p>Click the colored field to browse your device for photos you'd like to share.</p>
            </span>
          </span>
        </div>
      </div>
    )
  }
}
