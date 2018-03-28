import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// wraps component with scroll listener, and scroll handler function
export function withScroll(ToWrap) {
  return class extends Component {
    componentDidMount() {
      document.addEventListener('scroll', this.handler)
    }

    componentWillUnmount() {
      document.removeEventListener('scroll', this.handler)
    }

  }

}

// function withAuth(ToWrap) {
//   return class extends Component {
//     render() {
//       if(this.props.user.isAuthenticated)
//         return <ToWrap />
//       else
//         return <Redirect to='/' />
//     }
//   }
// }

// export default connect(mapStateToProps)(withAuth)