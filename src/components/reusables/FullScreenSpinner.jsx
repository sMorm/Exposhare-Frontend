import React, { Component } from 'react'
import { RotatingPlane } from 'better-react-spinkit'

import './styles/FullScreenSpinner.scss'

export default class FullScreenSpinner extends Component {
  state = {
    index: 0
  }
  componentDidMount() {
    const { text } = this.props
    if(Array.isArray(text)) {
      this.interval = setInterval(() => {
        if(this.state.index !== text.length - 1)
          this.setState({ index: this.state.index + 1 })
        else
          clearInterval(this.interval)
      }, 2500)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { size, color, text, clear } = this.props
    const { index } = this.state
    return (
      <div className={clear ? 'fullScreenSpinnerContainer clear' :'fullScreenSpinnerContainer'}>
        <span className='fullScreenSpinnerContent'>
          <div>
            <span className='flexCenter'><RotatingPlane size={size || 100} color={color || 'salmon'}/></span>
            <h1>{Array.isArray(text) ? text[this.state.index] : text}</h1>
          </div>
        </span>
      </div>
    )
  }
}
