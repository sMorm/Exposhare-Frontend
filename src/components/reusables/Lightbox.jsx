import React, { Component } from 'react'
import Header from './Header.jsx'

import './styles/Lightbox.scss'

export default class Lightbox extends Component {
  
  componentDidMount = () => {
    document.addEventListener('keydown', this.handleKeypress)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeypress)
  }
  
  handleKeypress = e => e.key === 'Escape' && this.props.close()
  
  render() {
    const { image, filter, close, isLandscape } = this.props
    const contentStyle = isLandscape ? 'lightboxContent-landscape' : 'lightboxContent'
    return (
      <div className='lightboxContainer'>
        <div className={contentStyle}>
          <span className='lightboxClose'>
            <span className='closeModal' onClick={close}/>
          </span>
          <img src={image} style={{ filter }} alt='lightbox' ref={img => this.img = img}/>
          <p><strong>Esc</strong> to exit</p>
        </div>
      </div>
    )
  }
}
