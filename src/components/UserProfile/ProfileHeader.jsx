import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/ProfileHeader.scss'

export default class ProfileHeader extends Component {
  render() {
    return (
      <div className='profileHeaderContainer'>
        <img src={this.props.profilePicture} alt={`${this.props.username}'s profile`} />
        <h1>{this.props.fullName}</h1>
        <h5>@{this.props.username}</h5>
      </div>
    )
  }
}

ProfileHeader.propTypes = {
  fullName: PropTypes.string,
  username: PropTypes.string,
  profilePicture: PropTypes.string
}
