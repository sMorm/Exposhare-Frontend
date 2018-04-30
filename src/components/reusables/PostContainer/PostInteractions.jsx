import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Components
import LikePost from './LikePost.jsx'
import CommentPost from './CommentPost.jsx'

// Apollo
import { Mutation } from 'react-apollo'
import FEED_QUERY from '../../../graphql/Feed.graphql'
import COMMENT_MUTATION from '../../../graphql/NewComment.graphql'

// Helpers 
import { generateAvatarLink } from '../../../shared/utils/helpers'

// Styles/Image Links
import './styles/PostInteractions.scss'

class PostInteractions extends Component {

  render() {
    const { content, likes, liked, comments, post_id, profile_id, containerHeight, refetch, index, profile } = this.props
    return (
      <span className='postContentContainer' >
        <span className='postDescription'>
          <span>
            <h2>Description</h2>
            <p>{content}</p>
          </span>
          
          <LikePost
            post_id={post_id}
            likes={likes}
            liked={liked} 
            profile_id={profile_id}
            refetch={refetch}
            index={index}
            profile/>
        
          <CommentPost
            comments={comments}
            post_id={post_id} 
            profile/>
        </span>
      </span>
    )
  }
}

export default PostInteractions