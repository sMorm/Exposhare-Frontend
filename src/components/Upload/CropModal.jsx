import React, { Component } from 'react'
import Header from '../reusables/Header.jsx'
import Cropper from 'react-cropper'

import './styles/CropModal.scss'
import 'cropperjs/dist/cropper.css' // bootstrap react-cropper css

/**
 * Full-screen loading component
 */
const Loading = () => {
  return (
    <div className='cropModalLoading'>
      <span className='cropModalLoadingContent'>
        <h1>Snip snip hehe...</h1>
      </span>
    </div>
  )
}

/**
 * This modal gets rendered when the user wants
 * to crop their photo. The loading component
 * gets rendered full-screened because when the
 * image canvas gets cropped, all components
 * are blocked from rendering because it's an
 * intensive process.
 */
export default class CropModal extends Component {
  state = {
    loading: false
  }

  /**
   * The reason why we want to start the loading first is 
   * because sometimes when the client tries to crop a canvas
   * that's too big, it will lag and block the loading component
   * from rendering.
   */
  crop = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.props.crop(this.refs.cropper.getCroppedCanvas().toDataURL())
      this.props.toggleCrop()
    }, 500)
  }

  render() {
    return (
      <div className='cropModalContainer'>
        <div className='modalContent'>
          <span className='modalHeader'>
            <Header title='Crop & Resize' />
            <span className='closeModal' onClick={this.props.toggleCrop}/>
          </span>
          <Cropper
            ref='cropper'
            src={this.props.rawImage.src}
            style={{height: 'calc(100vh - 300px)', width: '100%'}}
            guides={false}/>
          <span className='cropModalButtons'>
            <button onClick={this.crop}>Make crop</button>
          </span>
        </div>
        {this.state.loading && <Loading />}
      </div>
    )
  }
}