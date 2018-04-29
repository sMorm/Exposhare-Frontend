import React, { Component, Fragment } from 'react'
import Ionicon from 'react-ionicons'
import { withRouter, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import { mapStateToProps } from '../../shared/utils/redux'
import { Mutation } from 'react-apollo'

import POST_MUTATION from '../../graphql/NewPost.graphql'
import FilterPreviews from './FilterPreviews.jsx'
import filters from '../../shared/data/filters'
import CropModal from './CropModal.jsx'
import ResetPrompt from './ResetPrompt.jsx'
import Lightbox from '../reusables/Lightbox.jsx'

import './styles/EditZone.scss'

/**
 * After the user has chosen a photo they want
 * to upload, this component gets rendered so
 * that the user is able to edit their photos
 * before it gets published.
 */
class EditZone extends Component {

  state = {
    cropModal: false,
    isLandscape: false,
    resetPrompt: false,
    rechoosePrompt: false,
    lightbox: false,
    croppedImageData: null,
    filter: '',
    description: '',
    file: null,
    isLoading: false
  }

  componentDidMount() {
    // scroll into view on larger screens
    if(this.context.router.route.location.state)
      setTimeout(() => window.scroll({ top: 20, behavior: 'smooth' }), 200)
  }
  
  checkOrientation = () => {
    const { naturalHeight, naturalWidth } = this.preview
    if (naturalHeight > naturalWidth)
      this.setState({ isLandscape: false })
    else
      this.setState({ isLandscape: true })
  }
  
  toggleCrop = () => this.setState({ cropModal: !this.state.cropModal })
  toggleLightbox = () => this.setState({ lightbox: !this.state.lightbox })
  toggleReset = () => this.setState({ resetPrompt: !this.state.resetPrompt })
  toggleReselect = () => this.setState({ reselectPrompt: !this.state.reselectPrompt })
  onChange = e => this.setState({ [e.target.name]: e.target.value })
  crop = data => {
    this.setState({ croppedImageData: data })
    this.checkOrientation()
  }

  promptResponse = (promptAccept) => {
    if(promptAccept) // User clicked continue on modal
      this.setState({ filter: '', croppedImageData: null, resetPrompt: false })
    else
      this.setState({ resetPrompt: false })
  }

  reselectResponse = (promptAccept) => {
    if(promptAccept) // User clicked continue on modal
      this.context.router.history.goBack() // call function to reset everything
    else
      this.setState({ reselectPrompt: false })
  }

  setFilter = (filter) =>  {
    if(this.state.filter === filter)
      this.setState({ filter: '' }) 
    else
      this.setState({ filter })
  }

  onSubmit = newPost => {
    this.setState({ isLoading: true })
    const { filter, description } = this.state
    const { id } = this.props.user.info
    // Get the final image to upload
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = this.preview.naturalWidth
    canvas.height = this.preview.naturalHeight
    if(filter !== '')
      context.filter = filter
    context.drawImage(this.preview, 0, 0)
    canvas.toBlob((blob => {
      blob.lastModifiedDate = new Date()
      newPost({ variables: { file: blob, content: description, user_id: id }})
    }), 'image/jpeg', 0.4) // mime-type, quality 0.1 to 1.0
  }
  
  render() {
    // no image? redirect — not logged in? redirect
    if(!this.context.router.route.location.state || !this.props.user.isAuthenticated) {
      return <Redirect to='/upload'/>
    }
    // has image
    const { file } = this.context.router.route.location.state
    const { 
      cropModal, 
      croppedImageData,
      filter, 
      isLandscape, 
      lightbox, 
      resetPrompt, 
      reselectPrompt 
    } = this.state
    // different styles for portrait and landscape photos
    let editZoneContainerStyle = 'editZoneContainer'
    if (isLandscape)
      editZoneContainerStyle = 'editZoneContainer landscape'

    // check if the photo has been cropped, so we can render the right one
    let preview = file
    if (croppedImageData !== null)
      preview = croppedImageData
    return (
      <div className='container'>
        {cropModal && <CropModal file={file} close={this.toggleCrop} crop={this.crop} filter={this.state.filter}/>}
        {lightbox && <Lightbox image={preview} filter={filter} close={this.toggleLightbox} isLandscape={isLandscape}/> }
        {resetPrompt && <ResetPrompt response={this.promptResponse} description='This will clear applied filter and cropping.' />}
        {reselectPrompt && <ResetPrompt response={this.reselectResponse} description='Start from scratch & choose new photo to edit.' />}
        
        <div className={editZoneContainerStyle}>
          <span className='previewContainer'>
            <img 
              src={preview} 
              alt='raw source' 
              style={{ filter }}
              onLoad={this.checkOrientation} 
              onClick={ this.toggleLightbox }
              ref={ref => {this.preview = ref} }/>
          </span>
          <span className='editContainer'>
            <FilterPreviews setFilter={this.setFilter} image={preview} isLandscape={isLandscape}/>
          </span>
        </div>

        <div className='editToolContainer'>

          <span className='editToolbox'>
            <span className='editToolboxHeader'>
              <Ionicon icon='ios-cog-outline' fontSize='40px' color='black'/>
              &nbsp;Toolbox
            </span>
            <span className='editToolContent'>
              <button onClick={this.toggleLightbox}>
                <Ionicon icon='ios-expand' fontSize='30px' color='black' className='toolboxIcon'/>
                <p>Enlarge</p>
              </button>
              <button onClick={this.toggleCrop}>
                <Ionicon icon='ios-crop' fontSize='30px' color='black' className='toolboxIcon'/>
                <p>Crop</p>
              </button>
              <button onClick={this.toggleReset}>
                <Ionicon icon='ios-refresh-circle-outline' fontSize='30px' color='black' className='toolboxIcon'/>
                <p>Reset</p>
              </button>
              <button onClick={this.toggleReselect}>
                <Ionicon icon='ios-images-outline' fontSize='30px' color='black' className='toolboxIcon'/>
                <p>Re-select</p>
              </button>
            </span>
          </span>
          
          <span className='editDescription' >
            <span className='editToolboxHeader'>
              <Ionicon icon='ios-create-outline' fontSize='40px' color='black'/>
              &nbsp;Description
            </span>
            <span className='editDescriptionInput'>
              <textarea 
                type='text' 
                onChange={this.onChange} 
                name='description'
                placeholder='Write something about the image'
                rows={4}/>
            </span>
          </span>

        </div>
        <Mutation mutation={POST_MUTATION}>
          {(newPost, { data, error, loading }) => {
            if(loading){
              return (
                <span className='editSubmitButton'>
                  <button 
                  className='editSubmitButton'>
                    Uploading..
                  </button>
                </span>
              )
            }
            if(data) this.props.history.push('/')
            return (
              <span className='editSubmitButton'>
                <button 
                  onClick={() => this.onSubmit(newPost)} 
                  className='editSubmitButton'>
                  Create Post
                </button>
              </span>
            )
          }}
        </Mutation>

      </div>
    )
  }
}

EditZone.contextTypes = {
  router: PropTypes.object.isRequired,
}

EditZone.propTypes = {
  user: PropTypes.object.isRequired
}

export default withRouter(connect(mapStateToProps)(EditZone))