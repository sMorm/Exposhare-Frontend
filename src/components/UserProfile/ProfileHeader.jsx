import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/ProfileHeader.scss'
import Ionicon from 'react-ionicons'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapStateToProps } from '../../shared/utils/redux'

import FollowModal from '../reusables/FollowModal.jsx'

import { Mutation } from 'react-apollo'

import ProfileInteractions from './ProfileInteractions.jsx'

class ProfileHeader extends Component {

  state = {
    isSticky: false,
    isScrollingUp: null,
    toggleFollowers: false,
    toggleFollowings: false
  }

  componentDidMount = () => {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = event => {
    const offset = window.pageYOffset
    if(this.state.offset > offset && offset > 78) {
      // Scrolling Up, offset 0
      this.setState({ isScrollingUp: true })
    } else {
      // Scrolling down, offset size of nav
      this.setState({ isScrollingUp: false })
    }
    this.setState({ offset })
  }

  scrollToTop = () => {
    window.scrollBy({
      top: 0 - (window.pageYOffset),
      behavior: 'smooth'
    })
  }

  toggleFollowers = () => this.setState({ toggleFollowers: true })
  toggleFollowings = () => this.setState({ toggleFollowings: true })
  close = () => this.setState({ toggleFollowings: false, toggleFollowers: false })



  render() {
    // const followee = this.props.match.params[0]
    let containerStyle = 'profileHeaderContainer', showScrollButton = false
    if(this.state.isScrollingUp)
      containerStyle = 'profileHeaderContainer stickyNav'
    if(window.pageYOffset > 200) {
      showScrollButton = (
        <button onClick={this.scrollToTop}>
          <Ionicon icon='ios-arrow-round-up' fontSize='28px' color='#fff'/>
          Back to Top
        </button>
      )
    }
    const { firstname, lastname, bio, followers, following, is_following,
      profile_picture, username, id } = this.props.userInfo
    const { context_id } = this.props
    const { toggleFollowers, toggleFollowings } = this.state
    let viewingSelf = false
    if(id === this.props.user.info.id) viewingSelf = true
    let profilePic = 'http://via.placeholder.com/50x50'
    if(profile_picture !== null) 
      profilePic = `https://s3.amazonaws.com/gui-project-database/${id}/profile_picture.png`
    return (
      <React.Fragment>
        {toggleFollowers && <FollowModal type='followers' id={id} close={this.close}/>}
        {toggleFollowings && <FollowModal type='followings' id={id} close={this.close}/>}
        <div className={containerStyle}>
        <span className='profileHeaderContent'>
          <span className='profileHeaderName'>
            <img src={profilePic} alt={`${username}'s profile`} />
            <span>
              <h1>{`${firstname} ${lastname}`}</h1>
              <h5>@{username}</h5>
            </span>
          </span>
          {!viewingSelf && (
            <ProfileInteractions 
              is_following={is_following}
              follower={this.props.user.info.id}
              followee={id} 
              username={username}
              context_id={context_id} />
            )
          }
        </span>

        <span className='profileHeaderStats'>
          <span>
            <h3>Posts</h3>
            <p>4</p>
          </span>
          <span>
            <h3>Followers</h3>
            <p onClick={this.toggleFollowers}>{followers}</p>
          </span>
          <span>
            <h3>Following</h3>
            <p onClick={this.toggleFollowings}>{following}</p>
          </span>
          <span>
            <h3>Likes</h3>
            <p>445</p>
          </span>
        </span>

        </div>
      <span className='profileHeaderUtility'>
        {showScrollButton}
      </span>
    </React.Fragment>
    )
  }
}

ProfileHeader.propTypes = {
  fullName: PropTypes.string,
  username: PropTypes.string,
  profilePicture: PropTypes.string
}

export default connect(mapStateToProps)(withRouter(ProfileHeader))