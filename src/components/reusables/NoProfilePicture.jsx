import React, { Component } from 'react'

import './styles/NoProfilePicture.scss'
export default class NoProfilePicture extends Component {
  render() {
    const { size, name, fontSize } = this.props
    const firstInitial = this.props.name ? this.props.name[0] : 'S'
    return (
      <span 
        className='noProfilePicture'
        style={size && {height: size, width: size, fontSize }}>
        {firstInitial}
      </span>
    )
  }
}
