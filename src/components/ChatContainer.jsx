import React, { Component } from 'react'
import Header from './reusables/Header.jsx'

export default class ChatContainer extends Component {
  render() {
    return (
      <div className='container'>
        <Header title='Chat' />
      </div>
    )
  }
}
