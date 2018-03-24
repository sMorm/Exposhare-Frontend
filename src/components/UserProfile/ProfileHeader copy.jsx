import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/ProfileHeader.scss'
import Ionicon from 'react-ionicons'
import { withRouter } from 'react-router-dom'

import USER_QUERY from '../../graphql/User.graphql'
import { Query } from 'react-apollo'

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

    return (
      <Query query={USER_QUERY} variables={{ id }} options={{fetchPolicy: 'cache-first'}}>
        {({ loading, error, data }) => {
          if(loading) return <h1>loading</h1>
          if(error) return <h1>error</h1>
          console.log(data)
          let contentStyle = 'profileHeaderContent', showScrollButton = false
          if(this.state.isScrollingUp)
            contentStyle = 'profileHeaderContent stickyNav'
          if(window.pageYOffset > 200) {
            showScrollButton = (
              <button onClick={this.scrollToTop}>
                <Ionicon icon='ios-arrow-round-up' fontSize='28px' color='#fff'/>
                Back to Top
              </button>
            )
          }
          const { firstname, lastname, bio, followers, following, profile_picture, username } = data.user 
          const profilePic = (profile_picture === null) ? 'http://via.placeholder.com/50x50' : profile_picture
          return (
            <div className='container'>
              <div className='profileHeaderContainer'>
              <span className={contentStyle}>
                <span className='profileHeaderName'>
                  <img src={profilePic} alt={`${username}'s profile`} />
                  <span>
                    <h1>{`${firstname} ${lastname}`}</h1>
                    <h5>@{username}</h5>
                  </span>
                </span>
    
                <span className='profileInteractions'>
                  <button>Follow</button>
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
          </div>
          )
        }}
      </Query>
    )
  }
}

ProfileHeader.propTypes = {
  fullName: PropTypes.string,
  username: PropTypes.string,
  profilePicture: PropTypes.string
}

export default withRouter(ProfileHeader)