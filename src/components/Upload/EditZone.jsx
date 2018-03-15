import React, { Component, Fragment } from 'react'

import CropModal from './CropModal.jsx'

import './styles/EditZone.scss'

export default class EditZone extends Component {

  state = {
    cropModal: false,
    croppedImageData: null
  }
  
  toggleCrop = () => this.setState({ cropModal: !this.state.cropModal })

  crop = data => {
    this.setState({ croppedImageData: data })
  }
  
  render() {
    const { width, height, data } = this.props.rawImage
    const { cropModal, croppedImageData } = this.state
    let editZoneContainerStyle = 'editZoneContainer'
    if((width - height) > 100) {
      editZoneContainerStyle = 'editZoneContainer landscape'
    }
    let imagePreview = data
    if(croppedImageData !== null)
      imagePreview = croppedImageData
    return (
      <Fragment>
        <span className='editOptions'>
          <button onClick={this.toggleCrop}>Apply Filter</button>
          <button onClick={this.toggleCrop}>Crop Photo</button>
          <button onClick={this.props.cancel}>Change Photo</button>
        </span>
        <div className={editZoneContainerStyle}>
          <span className='previewContainer'>
            <img src={imagePreview} alt='raw source'/>
          </span>
          <span className='editContainer'>
            <h1>Edit</h1>
          </span>
        </div>
        {cropModal && <CropModal rawImage={this.props.rawImage} toggleCrop={this.toggleCrop} crop={this.crop}/>}
      </Fragment>
    )
  }
}
