import React, { Component } from 'react'
import Lottie from 'react-lottie'
import lottieFile from '../../shared/lottie/cycling.json'

import './styles/NotFound.scss'

export default class NotFound extends Component {
  render() {
    const lottieOptions = { loop: true, autoplay: true, animationData: lottieFile }
    return (
      <div className='notFoundContainer'>
        <Lottie options={lottieOptions} height={600} width={600} />
        <h1>This page doesn't exist ):</h1>
      </div>
    )
  }
}
