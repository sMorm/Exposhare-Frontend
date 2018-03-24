import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import './styles/GridFeed.scss'

//<img src={`https://s3.amazonaws.com/gui-project-database${post.image_url}`} alt=''/>
class GridFeed extends Component {
  render() {
    const feed = this.props.posts.map((post, key) => {
      return (
        <span key={key} className='gridFeedContent'>
          <img src={`http://via.placeholder.com/200x200`} alt=''/>
        </span>
      )
    })
    return (
      <div className='gridFeedContainer'>
        {feed}
      </div>
    )
  }
}

GridFeed.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default GridFeed