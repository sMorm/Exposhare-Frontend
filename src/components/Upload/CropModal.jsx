import React, { Component } from 'react'
import Header from '../reusables/Header.jsx'
import Cropper from 'react-cropper'
import Lottie from 'react-lottie'

import './styles/CropModal.scss'
import 'cropperjs/dist/cropper.css' // bootstrap react-cropper css
import lottieFile from '../../shared/lottie/simple_loader.json'

/**
 * Full-screen loading component
 */
const Loading = () => {
  const lottieOptions = { loop: true, autoplay: true, animationData: lottieFile }
  return (
    <div className='cropModalLoading'>
      <span className='cropModalLoadingContent'>
        <Lottie options={lottieOptions} width={300} height={300} />
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

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeypress)
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeypress)
  }

  handleKeypress = e => e.key === 'Escape' && this.props.close()

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
      this.props.close()
    }, 500)
  }

  // props: close, function to close modal, file: image file, squareRatio: boolean
  render() {
    return (
      <div className='cropModalContainer'>
        <div className='modalContent'>
          <span className='modalHeader'>
            <Header title='Crop & Resize' />
            <span className='closeModal' onClick={this.props.close}/>
          </span>
          <Cropper
            ref='cropper'
            src={this.props.file}
            style={{height: 'calc(100vh - 300px)', width: '100%'}}
            guides={false}
            aspectRatio={this.props.squareRatio ? 1 : null}
            ref='cropper'/>
          <span className='cropModalButtons'>
            <button onClick={this.crop}>Make crop</button>
          </span>
        </div>
        {this.state.loading && <Loading />}
      </div>
    )
  }
}