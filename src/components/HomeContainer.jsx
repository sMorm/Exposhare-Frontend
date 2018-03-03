import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { mapStateToProps } from '../shared/utils/redux'

import GuestHome from './Home/GuestHome.jsx'
import UserHome from './Home/UserHome.jsx'

class HomeContainer extends Component {
  render() {
    return (
      <Fragment>
        {this.props.user.isAuthenticated 
          ? <UserHome id={this.props.user.info.id}/> 
          : <GuestHome/> 
        }
      </Fragment>
    )
  }
}

export default connect(mapStateToProps)(HomeContainer)