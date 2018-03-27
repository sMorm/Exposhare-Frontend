import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '../shared/utils/redux'
import { getGreetingMessage } from '../shared/utils/helpers'
import { Redirect } from 'react-router-dom'
import Lottie from 'react-lottie'
import Cropper from 'react-cropper'
import lottieFile from '../shared/lottie/balloons.json'

import './styles/GetStarted.scss'

class GetStarted extends Component {
  state = {
    redirect: false,
    bio: ''
  }
  componentDidMount() {
    if(this.props.user.isAuthenticated) {
      const { bio } = this.props.user.info
      this.setState({ bio })
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  redirect = () => this.setState({ redirect: true })

  render() {
    // if(!this.props.user.isAuthenticated || this.state.redirect || this.props.user.info.profile_picture !== null || this.props.user.info.bio) 
    //   return <Redirect to='/' />
    const { firstname, lastname, bio, id } = this.props.user.info
    const lottieOptions = { loop: true, autoplay: true, animationData: lottieFile }
    return (
      <div className='getStartedContainer'>
        <div className='getStartedContent'>
          <div className='getStartedGreeting'>
            <h1>{getGreetingMessage(firstname)} —</h1>
            <p>Thanks for joining us, let's get started with setting up your profile. Let's start by telling us a bit about yourself which will serve as your profile bio.</p>
            <h3 onClick={this.redirect}>I don't want to do this right now.</h3>
          </div>
          <div className='editBioContainer'>
            <h2>Tell us something about yourself.</h2>
            <textarea 
              name='bio'
              type='text' 
              onChange={this.onChange}
              value={this.state.bio}
              column={8}/>
           </div>
          <div className='editProfilePictureContainer'>
            <h2>Profile Picture</h2>
              <Cropper
                ref='cropper'
                src='http://via.placeholder.com/300x300'
                style={{ width: '300px', height: '300px'}}
                aspectRatio={1}
                guides={false}
                ref='cropper'/>
          </div>
          <button>All set? Take me away!</button>
        </div>
        <div className='getStartedLottie'>
          <Lottie options={lottieOptions} height={'100%'} width={'100%'} />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(GetStarted)