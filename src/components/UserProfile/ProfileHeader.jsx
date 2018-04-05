import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/ProfileHeader.scss'
import Ionicon from 'react-ionicons'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapStateToProps } from '../../shared/utils/redux'

import FOLLOW_MUTATION from '../../graphql/Follow.graphql'
import { Mutation } from 'react-apollo'

class ProfileHeader extends Component {

  state = {
    isSticky: false,
    isScrollingUp: null
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


  render() {
    const id = this.props.match.params[0]
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
    const { firstname, lastname, bio, followers, following, profile_picture, username, id:context_id } = this.props.userInfo
    let profilePic = 'http://via.placeholder.com/50x50'
    if(profile_picture !== null) 
      profilePic = `https://s3.amazonaws.com/gui-project-database/${context_id}/profile_picture.png`
    
    return (
      <React.Fragment>
        <div className={containerStyle}>
        <span className='profileHeaderContent'>
          <span className='profileHeaderName'>
            <img src={profilePic} alt={`${username}'s profile`} />
            <span>
              <h1>{`${firstname} ${lastname}`}</h1>
              <h5>@{username}</h5>
            </span>
          </span>

          <span className='profileInteractions'>
            <Mutation mutation={FOLLOW_MUTATION} variables={{ followee: id, follower: this.props.user.info.id}}>
              {(newFollow, { data, loading, error}) => {
                if(error || data) return <button>Following</button>
                return <button onClick={newFollow}>Follow</button>
              }}
            </Mutation>
            <button>Message</button>
          </span>
        </span>

        <span className='profileHeaderStats'>
          <span>
            <h3>Posts</h3>
            <p>4</p>
          </span>
          <span>
            <h3>Followers</h3>
            <p>{followers}</p>
          </span>
          <span>
            <h3>Following</h3>
            <p>{following}</p>
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