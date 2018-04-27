import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// Apollo
import { Mutation } from 'react-apollo'
import FEED_QUERY from '../../../graphql/Feed.graphql'
import COMMENT_MUTATION from '../../../graphql/NewComment.graphql'

// Redux
import { connect } from 'react-redux'
import { mapStateToProps } from '../../../shared/utils/redux'

// Styles
import './styles/CommentPost.scss'

class CommentPost extends Component {
  state = {
    comment: ''
  }

  // componentDidMount() {
  //   this.handleCommentScroll()
  // }

  // componentDidUpdate() {
  //   this.handleCommentScroll()
  // }

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
    const { post_id, comments } = this.props
    const { id:user_id } = this.props.user.info
    let renderComments = <li>No comments yet</li>
    if(comments !== null && comments.length !== 0) {
      renderComments = comments.map((current, key) => {
        return (
          <li key={key}>
            <Link to={`/user/${current.username}`} className='commentPostLink'>
              <h4>{current.firstname}</h4>
            </Link>
            <p>{current.comment}</p>
          </li>
        )
      })
    }
    return (
      <span className='commentPostContainer'>
        <div className='commentPostContent'>
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
                  className='commentPostInput'
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
    )
  }
}

CommentPost.propTypes = {
  // user_id: PropTypes.number.isRequired,
  post_id: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(CommentPost)