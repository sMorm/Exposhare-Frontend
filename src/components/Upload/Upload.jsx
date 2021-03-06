import React, { Component } from 'react'
import Lottie from 'react-lottie'
import ImageCompressor from 'image-compressor.js'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Header from '../reusables/Header.jsx'
import UploadZone from './UploadZone.jsx'
import EditZone from './EditZone.jsx'

import FullScreenSpinner from '../reusables/FullScreenSpinner.jsx'

/**
 * The upload page. See <EditZone /> and <UploadZone />
 * for more info on the upload flow.
 */
class Upload extends Component {
  state = {
    errorMessage: null, // On unsupported image uploaded
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
      const compressor = new ImageCompressor()
      const options = { quality: 0.5, convertSize: '2000000'} // convert all over 2mb
      compressor.compress(file, options)
      .then(blob => {
        const fr = new FileReader()
        fr.readAsDataURL(blob); 
        fr.onloadend = () => {          
          this.setState({ loading: false })
          this.context.router.history.push({
            pathname: '/upload/edit/',
            state: { file: fr.result }
          })
        }
      })
      .catch(err => {
        this.setState({ errorMessage: 'Failed to Compress', loading: false } )
      })
    }
  }


  render() {
    const { errorMessage, loading, file } = this.state
    if(loading) {
      return <FullScreenSpinner size={100} color='salmon' text={['Compressing..', 'Beep Boop', `Beefy file..`, 'Hmm..']} clear/>
    } else {
      return (
        <div className='container'>
          <Header title='Upload' />
          <UploadZone onDrop={this.onDrop} errorMessage={errorMessage} />
        </div>
      )
    }
  }
}

Upload.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(Upload)