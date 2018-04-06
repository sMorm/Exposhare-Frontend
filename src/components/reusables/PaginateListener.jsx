import React, { Component } from 'react'

export default class PaginateListener extends Component {
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)   
  }

  /**
   * http://blog.sodhanalibrary.com/2016/08/detect-when-user-scrolls-to-bottom-of.html#.WftmORNSyL4
   */
  handleScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
    const windowBottom = windowHeight + window.pageYOffset
    windowBottom >= docHeight && this.props.onLoadMore() // we've hit the bottom
  }

  render() {
    return <span />
  }
}
