import React, { Component } from 'react'

import './styles/Header.scss'

export default class Header extends Component {
  render() {
    return (
      <div className="headerContainer">
        <h1>{this.props.title}</h1>
        <hr/>
        <br/><br/>
      </div>
    )
  }
}
