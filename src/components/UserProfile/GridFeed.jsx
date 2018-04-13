import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'
import PostContainer from '../reusables/PostContainer/PostContainer.jsx'
import _ from 'lodash'

import FullScreenSpinner from '../reusables/FullScreenSpinner.jsx'
import PostModal from '../reusables/PostModal.jsx'
import PaginateListener from '../reusables/PaginateListener.jsx'
import { Query } from 'react-apollo'
import QUERY_USER_POSTS from '../../graphql/UserPosts.graphql'

import './styles/GridFeed.scss'

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
    activeFeed: 'no-crop',
    postModal: false,
    currentPost: {},
    isLoadingMore: false
  }

  toggleFeed = activeFeed => this.setState({ activeFeed })

  /**
   * Expands photo to show more information, in a modal
   */
  openPostModal = (e, post) => { 
    const { naturalHeight, naturalWidth } = e.target
    if (naturalHeight > naturalWidth)
      this.setState({ postModal: true, currentPost: post, isLandscape: false })
    else
      this.setState({ postModal: true, currentPost: post, isLandscape: true })
  }

  closePostModal = () => this.setState({ postModal: false, currentPost: {} })

  mapFeed = userPosts => {
    return (
      <div className='gridFeedContainer'>
        {userPosts.map((post, key) => (
          <img 
            key={key} 
            src={`https://s3.amazonaws.com/gui-project-database${post.image_url}`} 
            alt={post.content}
            onClick={e => this.openPostModal(e, post)}
            ref={`post${key}`}
            />
        ))}
      </div>
    )
  }

  render() {
    const { id, context_id } = this.props
    const { currentPost, postModal, isLandscape } = this.state
    return (
      <div>
        {postModal && <PostModal currentPost={currentPost} closeModal={this.closePostModal} isLandscape={isLandscape}/>}
        <Query query={QUERY_USER_POSTS} variables={{ id, context_id, after: null }}> 
          {({ data, loading, error, fetchMore }) => {
            if(error) console.log(error)
            if(loading) return <FullScreenSpinner size={100} color='salmon' text='Grabbing the Photos..' />
            if(!loading && data) {
              const { userPosts } = data
              const mapFeed = this.mapFeed(userPosts)
              return (
                <div>
                  {mapFeed}
                  <PaginateListener onLoadMore={() => {
                    fetchMore({
                      variables: {
                        after: userPosts[userPosts.length-1].id,
                      },
                      updateQuery: (prev, {fetchMoreResult}) => {
                        if(!fetchMoreResult) return prev
                        return Object.assign({}, prev, {
                          userPosts: [...prev.userPosts, ...fetchMoreResult.userPosts]
                        })
                      }
                    })
                  }}/>
                </div>
              )
            }
            return <p>There's nothing here ):</p>
          }}
        </Query>      
      </div>
    )
  }
}

GridFeed.propTypes = {
  id: PropTypes.number.isRequired,
  context_id: PropTypes.number.isRequired
}

export default GridFeed