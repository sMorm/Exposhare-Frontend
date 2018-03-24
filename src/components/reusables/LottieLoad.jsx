import React, { Component } from 'react'
import Lottie from 'react-lottie'

import lottieFile from '../../shared/lottie/simple_loader.json'

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh)',
  width: '100%'
}
export default class LottieLoad extends Component {
  render() {
    const lottieOptions = { loop: true, autoplay: true, animationData: lottieFile }
    return (
      <div style={style}>
        <Lottie options={lottieOptions} width={200} height={200} />
      </div>
    )
  }
}
