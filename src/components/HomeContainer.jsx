import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { mapStateToProps } from '../shared/utils/redux'

import GuestHome from './Home/GuestHome.jsx'
import UserHome from './Home/UserHome.jsx'

class HomeContainer extends Component {
  render() {
    if(this.props.user.isAuthenticated)
      return <UserHome id={this.props.user.info.id}/>
    else
      return <GuestHome/> 
  }
}

export default connect(mapStateToProps)(HomeContainer)