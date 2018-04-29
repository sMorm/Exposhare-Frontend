import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import Cropper from 'react-cropper'
import Dropzone from 'react-dropzone'

// Helper functions
import { getGreetingMessage, dataURItoBlob } from '../../shared/utils/helpers'
import { mapStateToProps } from '../../shared/utils/redux'

// Lottie
import Lottie from 'react-lottie'
import swingLottie from '../../shared/lottie/swing.json'
import emojiLottie from '../../shared/lottie/emoji_tongue.json'

// Apollo
import { Mutation } from 'react-apollo'
import PROFILE_MUTATION from '../../graphql/UpdateInfo.graphql'
import QUERY_PROFILE from '../../graphql/UserInfo.graphql'
import { client } from '../../shared/utils/apollo'
// Redux
import { setCurrentUser } from '../../actions/user';

// Components & Styling
import CropModal from '../Upload/CropModal.jsx'


class Settings extends Component {
  state = {
    redirect: false,
    profilePic: null,
    cropModal: false,
    croppedImage: null,
    bio: '',
    errorMessage: '',
  }

  // Query for the latest bio, else fall back to redux bio
  componentDidMount() {
    const { bio, username, id:context_id } = this.props.user.info
    client.query({ query: QUERY_PROFILE, variables: { username, context_id } })
    .then(res => {
      if(res.data.user.bio) 
        this.setState({ bio: res.data.user.bio })
      else
        this.setState({ bio }) 
    })
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onDrop = (acceptedFiles, rejectedFiles) => {
    if(rejectedFiles.length > 0) {
      this.setState({ errorMessage: 'File not supported!'})
    } else {
      const file = acceptedFiles.find(f => f)
      this.setState({ profilePic: file.preview, cropModal: true })
    }
  }

  recrop = () => this.setState({ cropModal: true })

  changePhoto = () => this.setState({ profilePic: null, croppedImage: null })

  finishCrop = croppedImage => this.setState({ croppedImage })

  toggleCrop = () => this.setState({ cropModal: !this.state.cropModal })

  redirect = () => this.setState({ redirect: true })

  saveProfile = updateInfo => {
    const { croppedImage, bio } = this.state
    const { id } = this.props.user.info
    const profile_picture = croppedImage ? dataURItoBlob(croppedImage) : null
    updateInfo({ variables: { id, bio, profile_picture  }})
    .then(res => this.props.history.push('/'))
  }

  render() {
    const { cropModal, profilePic, errorMessage, croppedImage } = this.state
    if(!this.props.user.isAuthenticated) 
      return <Redirect to='/' />
    const balloonOptions = { loop: true, autoplay: true, animationData: swingLottie }
    const pictureOptions = { loop: true, autoplay: true, animationData: emojiLottie }
    const { firstname, lastname, bio, id, username } = this.props.user.info
    return (
      <React.Fragment>
        {cropModal && (
          <CropModal 
            file={profilePic} 
            close={this.toggleCrop}
            crop={this.finishCrop}
            squareRatio/> 
        )}
        <div className='getStartedContainer'>
          <div className='getStartedContent'>
            <div className='getStartedGreeting'>
              <h1>{getGreetingMessage(firstname)} —</h1>
              <p>On this page you can update your profile picture, and edit your bio to let other users learn more about you.</p>
            </div>
            <div className='editBioContainer'>
              <h2>Your bio —</h2>
              <textarea 
                name='bio'
                type='text' 
                onChange={this.onChange}
                value={this.state.bio}
                column={8}/>
            </div>
            <div className='editProfilePictureContainer'>
              <h2>{croppedImage === null ? 'Profile Picture' : 'Looking Good!'}</h2>
              {croppedImage !== null
                ? (
                  <div className='cropPreviewContainer'>
                    <span className='cropPreviewContent'>
                      <img src={croppedImage} alt='preview' />
                      <span>
                        <h4>{firstname} {lastname}</h4>
                        <h5>@{username}</h5>
                      </span>
                    </span>
                    <span className='cropPreviewOptions'>
                      <h3 onClick={this.recrop}>Re-crop</h3>
                      <h3 onClick={this.changePhoto}>Change Photo</h3>
                    </span>
                  </div>
                )
                : (
                  <Dropzone
                    onDrop={this.onDrop}
                    accept="image/*"
                    className='uploadDropzone'
                    activeClassName='uploadDropzoneActive'
                    multiple={false}>
                      <span className='uploadDropzoneContainer'>
                        <Lottie options={pictureOptions} height={150} width={150} />
                        <p>Add Profile Photo</p>
                      </span>
                  </Dropzone>
                )
              }

            </div>
            <Mutation mutation={PROFILE_MUTATION}>
              {(updateInfo, {data, loading, error }) => {
                if(error) return <p>upload error</p>
                if(loading) return <button>Saving...</button>
                return (
                  <button onClick={() => this.saveProfile(updateInfo)}>
                    All set? Save my profile.
                  </button>
                )
              }}
            </Mutation>
          </div>
          <div className='getStartedLottie'>
            <Lottie options={balloonOptions} height={'100%'} width={'100%'} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps)(withRouter(Settings))