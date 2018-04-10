import React, { Component } from 'react'
import Header from '../reusables/Header.jsx'
import Cropper from 'react-cropper'
import Lottie from 'react-lottie'

import FullScreenSpinner from '../reusables/FullScreenSpinner.jsx'

import './styles/CropModal.scss'
import 'cropperjs/dist/cropper.css' // bootstrap react-cropper css
import lottieFile from '../../shared/lottie/simple_loader.json'

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
    loading: false,
    changeRatio: 1
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

  changeRatio = cropRatio => this.setState({ cropRatio })

  // props: close, function to close modal, file: image file, squareRatio: boolean
  render() {
    const { loading, cropRatio } = this.state
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
            aspectRatio={this.props.squareRatio ? 1 : cropRatio }
            ref='cropper'/>
          <span className='cropModalOptions'>
            <button onClick={() => this.changeRatio(NaN)}>Original</button>
            <button onClick={() => this.changeRatio(1)}>1:1</button>
            <button onClick={() => this.changeRatio(8/10)}>8:10</button>
            <button onClick={() => this.changeRatio(4/3)}>4:3</button>
          </span>
          <span className='cropModalButton'>
            <button onClick={this.crop}>Crop</button>
          </span>
        </div>
        {loading && <FullScreenSpinner size={100} color='salmon' text={'Cropping..'} clear/>}
      </div>
    )
  }
}