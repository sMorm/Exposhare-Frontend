import React, { Component } from 'react'
import Lottie from 'react-lottie'
import lottieFile from '../../shared/lottie/crying.json'
import { Link } from 'react-router-dom'
import Ionicon from 'react-ionicons'

import './styles/NotFound.scss'

export default class NotFound extends Component {
  render() {
    const lottieOptions = { loop: true, autoplay: true, animationData: lottieFile }
    return (
      <div className='notFoundContainer'>
        <div className='notFoundLottie'>
          <Lottie options={lottieOptions} height='100%' width='100%' />
        </div>
        <h1>The page you're looking for was not found.</h1>
        <div className='notFoundRedirect'>
          <Link to='/' className='suggestSearchLink'>
            <h3>Home</h3>
            <Ionicon icon='ios-arrow-forward' fontSize='24px' color='salmon'/>
          </Link>
        </div>
      </div>
    )
  }
}
