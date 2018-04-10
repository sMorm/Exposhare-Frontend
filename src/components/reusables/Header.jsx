import React, { Component } from 'react'

import './styles/Header.scss'

export default class Header extends Component {
  render() {
    const { title, fontSize } = this.props
    let size = '40px'
    if(fontSize) 
      size = `${fontSize}px`
    return (
      <div className="headerContainer">
        <h1 style={{ fontSize: size }}>{title}</h1>
        <hr/>
        <br/>
      </div>
    )
  }
}
