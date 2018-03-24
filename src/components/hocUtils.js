import React, { Component } from 'react'
// wraps component with scroll listener, and scroll handler function
export function withScroll(WrappedComponent, handler) {
  return class extends Component {
    componentDidMount() {
      document.addEventListener('scroll', handler)
    }

    componentWillUnmount() {
      document.removeEventListener('scroll', handler)
    }
  }
}