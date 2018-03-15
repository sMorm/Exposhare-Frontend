import React, { Component } from 'react'
import Header from './reusables/Header.jsx'
import Lottie from 'react-lottie'

import UploadZone from './Upload/UploadZone.jsx'
import EditZone from './Upload/EditZone.jsx'

import lottieFile from '../shared/lottie/simple_loader.json'

/**
 * The upload page. See <EditZone /> and <UploadZone />
 * for more info on the upload flow.
 */
export default class UploadContainer extends Component {
  state = {
    errorMessage: null, // On unsupported image uploaded
    rawImage: null, // { src, width, height, data }
    loading: false
  }

  /**
   * On image upload, check if it's a valid image,
   * get dimensions for the image, update state
   * with the image data for rendering/editing
   */
  onDrop = (acceptedFiles, rejectedFiles) => {
    if(rejectedFiles.length > 0) {
      this.setState({ errorMessage: 'File not supported!'})
    } else {
      this.setState({ loading: true })
      const file = acceptedFiles.find(f => f)
      const image = new Image()
    
      image.onload = () => { // get image dimensions
        let fr = new FileReader()
        fr.readAsDataURL(file)
        fr.onload = () => {
          setTimeout(() => this.setState( { 
            rawImage: { src: file.preview, width: i.width, height: i.height, data: reader.result },
            loading: false
          }), 1000)
        }
      }
      image.src = file.preview
    }

  }

  // If user wants to upload a different photo
  cancel = () => this.setState({ errorMessage: null, rawImage: null })

  render() {
    const { errorMessage, rawImage, loading } = this.state
    const lottieOptions = { loop: true, autoplay: true, animationData: lottieFile }
    if(loading) {
      return <Lottie options={lottieOptions} height={300} width={300} />
    } else {
      return (
        <div className='container'>
          <Header title='Upload'/>
          {rawImage && <EditZone rawImage={rawImage} cancel={this.cancel}/>}
          {rawImage === null && <UploadZone onDrop={this.onDrop} errorMessage={errorMessage} />}
        </div>
      )
    }
  }
}
