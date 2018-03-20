import React, { Component } from 'react'

import './styles/ResetPrompt.scss'

export default class ResetPrompt extends Component {
  render() {
    const { response, description } = this.props
    return (
      <div className='promptModalContainer'>
        <div className='promptModalContent'>
          <div className='promptModalDialog'>
            <h1>Are you sure?</h1>
            <p>{description}</p>
            <h2 className='continue' onClick={() => response(true)}>Continue</h2>
            <h2 onClick={() => response(false)}>Cancel</h2>
          </div>
        </div>
      </div>
    )
  }
}
