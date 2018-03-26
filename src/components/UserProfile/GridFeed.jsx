import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'

import PostContainer from '../reusables/PostContainer.jsx'
import _ from 'lodash'

import './styles/GridFeed.scss'

//<img src={`https://s3.amazonaws.com/gui-project-database${post.image_url}`} alt=''/>
const FeedOptions = ({ toggleFeed }) => {
  return (
    <span className='gridFeedOptions'>
      <span onClick={() => toggleFeed('no-crop')}>
        No-Crop
      </span>
      <span onClick={() => toggleFeed('grid')}>
        Grid
      </span>
      <span onClick={() => toggleFeed('crop')}>
        Singles
      </span>
    </span>
  )
}
class GridFeed extends Component {
  state = {
    activeFeed: 'no-crop'
  }

  toggleFeed = activeFeed => {
    this.setState({ activeFeed })
  }

  render() {
    let feed = ''
    const { posts } = this.props
    console.log(posts)
    switch(this.state.activeFeed) {
      case 'no-crop':
        const items = [...posts, ...posts, ...posts, ...posts]
        const chunks = _.chunk(items, items.length/3)
        const noCropFeed = chunks.map((chunk, key) => {
          return (
            <span key={key} className='noCropContent'>
              {chunk.map((post, key) => {
                return (
                  <img 
                    key={key} 
                    src={`https://s3.amazonaws.com/gui-project-database${post.image_url}`} 
                    alt={post.content}
                  />
                )
              })}
            </span>
          )
        })
        feed = (
          <div className='noCropContainer'>
            {noCropFeed}
          </div>
        )
        break;
      case 'grid':
        const gridFeed = posts.map((post, key) => {
          return (
            <span key={key} className='gridContent'>
              <img 
                key={key} 
                src={`https://s3.amazonaws.com/gui-project-database${post.image_url}`} 
                alt={post.content}
              />
            </span>
          )
        })
        feed = (
          <div className='gridContainer'>
            {gridFeed}
          </div>
        )
        break;
      case 'crop':
        // return posts.map((post, key) => <PostContainer key={key} post={post} />)
        break;
    }
    return (
      <div>
        <FeedOptions toggleFeed={this.toggleFeed}/>
        {feed}
      </div>
    )
  }
}

GridFeed.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default GridFeed