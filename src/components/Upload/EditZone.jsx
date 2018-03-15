import React, { Component, Fragment } from 'react'

import FilterPreviews from './FilterPreviews.jsx'
import filters from '../../shared/data/filters'
import CropModal from './CropModal.jsx'

import './styles/EditZone.scss'

/**
 * After the user has chosen a photo they want
 * to upload, this component gets rendered so
 * that the user is able to edit their photos
 * before it gets published.
 */
export default class EditZone extends Component {

  state = {
    cropModal: false,
    croppedImageData: null,
    filter: '',
    finalImg: ''
  }
  
  toggleCrop = () => this.setState({ cropModal: !this.state.cropModal })

  crop = data => {
    this.setState({ croppedImageData: data })
  }

  setFilter = (filter) =>  this.setState({ filter })

  save = () => {
    if(this.state.filter === '') {
      this.setState({ finalImg: this.img.src })
    } else {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const img = this.img // my <img /> in react
      canvas.width = this.img.naturalWidth
      canvas.height = this.img.naturalHeight
      context.filter = this.state.filter
      context.drawImage(this.img, 0, 0)
      const finalImg = canvas.toDataURL()
      this.setState({ finalImg })
    }
  }
  
  render() {
    const { width, height, data, src } = this.props.rawImage
    const { cropModal, croppedImageData, filter } = this.state
    let editZoneContainerStyle = 'editZoneContainer'
    if((width - height) > 100) {
      editZoneContainerStyle = 'editZoneContainer landscape'
    }
    let imagePreview = src
    if(croppedImageData !== null)
      imagePreview = croppedImageData
    return (
      <Fragment>
        <span className='editOptions'>
          <button onClick={this.toggleCrop}>Do Stuff</button>
          <button onClick={this.toggleCrop}>Crop Photo</button>
          <button onClick={this.props.cancel}>Change Photo</button>
        </span>
        <div className={editZoneContainerStyle}>
          <span className='previewContainer'>
            <img src={imagePreview} alt='raw source' style={{filter: this.state.filter }} ref={(img) => { this.img = img }} />
          </span>
          <span className='editContainer'>
            <h1>Apply Filter</h1>
            <FilterPreviews setFilter={this.setFilter} image={this.props.rawImage.src}/>
          </span>
        </div>
        {cropModal && <CropModal rawImage={this.props.rawImage} toggleCrop={this.toggleCrop} crop={this.crop}/>}
        <button onClick={this.save}>Save</button>
        <img src={this.state.finalImg} alt='s' />
      </Fragment>
    )
  }
}
