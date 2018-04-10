import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Apollo
import { Mutation } from 'react-apollo'
import FEED_QUERY from '../../../graphql/Feed.graphql'
import LIKE_MUTATION from '../../../graphql/Like.graphql'
import UNLIKE_MUTATION from '../../../graphql/Unlike.graphql'
import COMMENT_MUTATION from '../../../graphql/NewComment.graphql'

// Lottie
import Lottie from 'react-lottie'
import lottieFile from '../../../shared/lottie/love_explosion.json'

// Helpers 
import { generateAvatarLink } from '../../../shared/utils/helpers'

// Styles/Image Links
import './styles/PostInteractions.scss'
import { likeHeart } from '../../../shared/constants/links'

class PostInteractions extends Component {
  state = {
    comment: ''
  }

  componentDidMount() {
    this.handleCommentScroll()
  }

  componentDidUpdate() {
    this.handleCommentScroll()
  }

  handleCommentScroll = () => {
    if(this.props.comments !== null) {
      const { scrollTop, scrollHeight } = this.commentList
      this.commentList.scrollTop = this.commentList.scrollHeight
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onSubmit = (e, mutate, user_id, post_id) => {
    e.preventDefault()
    const { comment } = this.state
    if(comment === '') return 
    mutate({ variables: { user_id, post_id, comment }})
    this.setState({ comment: ''})
  }

  render() {
    const lottieOptions = { loop: false, autoplay: true, animationData: lottieFile }
    const { content, likes, liked, comments, user_id, post_id, containerHeight } = this.props
    let renderComments = <li>No comments yet</li>
    if(comments !== null && comments.length !== 0) {
      renderComments = comments.map((current, key) => {
        return (
          <li key={key}>
            <Link to={`/user/${current.username}`} className='commentUserLink'>
              <h4>{current.firstname}</h4>
            </Link>
            <p>{current.comment}</p>
          </li>
        )
      })
    }
    return (
      <span className='postContentContainer' >
        <span className='postDescription'>
          <span>
            <h2>Description</h2>
            <p>{content}</p>
          </span>
          <span className='postLikesContainer'>
            <span className='likeImage'>
              <Mutation 
                mutation={liked ? UNLIKE_MUTATION : LIKE_MUTATION}
                refetchQueries={[{query: FEED_QUERY, variables: { id: user_id, after: null } }]}
                update={cache => this.updateCache(cache)}>
                  {(mutate, { data, loading, error }) => {
                    if(loading) return <img src={likeHeart} alt='heart' />
                    const mutateVariables = { variables: { user_id, post_id } }
                    if(liked){
                      return (
                        <span onClick={() => mutate(mutateVariables)} >
                          <Lottie options={lottieOptions} width={60} height={60} />
                        </span>
                      )
                    } else {
                      return (
                        <img src={likeHeart} alt='heart' onClick={() => mutate(mutateVariables)}/>
                      )
                    }
                  }
                }
              </Mutation>
            </span>
            <p>{likes} likes</p>
          </span>
        </span>
        <span className='postInteractionContainer'>

          <div className='postCommentsContainer'>
            <h2>Comments</h2>
            <ul ref={commentList => {this.commentList = commentList} }>
              {renderComments}
            </ul>
            <Mutation 
              mutation={COMMENT_MUTATION}
              refetchQueries={[{query: FEED_QUERY, variables: { id: user_id, after: null } }]}>
              {(mutate, { data, loading, error }) => {
                let buttonContent = 'Post'
                let mutateFunction = (e) => { this.onSubmit(e, mutate, user_id, post_id) }
                if(loading) { 
                  buttonContent = '...'
                  mutateFunction = (e) => e.preventDefault()
                }
                return (
                  <form 
                    className='postCommentsInput'
                    onSubmit={mutateFunction}>
                    <input 
                      type='text'
                      onChange={this.onChange}
                      value={this.state.comment}
                      name='comment'
                      placeholder='Add a Comment...'/>
                    <button onClick={mutateFunction}>
                      {buttonContent}
                    </button>
                  </form>
                )
              }}
            </Mutation>
          </div>
        </span>     
      </span>
    )
  }
}

export default PostInteractions