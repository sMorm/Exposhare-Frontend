import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

// Redux
import { connect } from 'react-redux'
import { mapStateToProps } from '../../shared/utils/redux'

// Components
import GuestHome from './GuestHome.jsx'
import UserHome from './UserHome.jsx'

/**
 * Display different pages for users who are logged
 * in and guests users
 */
class Home extends Component {
  render() {
    if(this.props.user.isAuthenticated)
      return <UserHome id={this.props.user.info.id}/>
    else
      return <GuestHome/> 
  }
}

export default connect(mapStateToProps)(withRouter(Home))