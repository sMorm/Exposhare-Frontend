import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Lottie from 'react-lottie'
import lottieFile from '../../shared/lottie/loader.json'

import { graphql } from 'react-apollo'
import FEED_QUERY from '../../graphql/Feed.graphql'

import Header from '../reusables/Header.jsx'
import PostContainer from '../reusables/PostContainer.jsx'

class UserHome extends Component {
  state = {
    feedContent: []
  }
  
  render() {
    const { data: { loading, user }} = this.props
    const lottieOptions = { loop: true, autoplay: true, animationData: lottieFile }
    if (loading) {
      return <Lottie options={lottieOptions} height={300} width={300} />
    } else {
      return (
        <div className='container'>
          <Header title='Feed' />
          <div className='feedContainer'>
            {user.feed.map((post, key) => <PostContainer key={key} post={post} />)}
          </div>
        </div>
      )
    }
  }
}

UserHome.propTypes = {
  id: PropTypes.number.isRequired,
}

/**
 * We're querying with graphql instead of using
 * gql-tag because we want to give the query some
 * query options in the future.
 * https://www.apollographql.com/docs/react/basics/queries.html
 * 
 * Here were querying using id, which is obtained from
 * props
 */
const feedWithData = graphql(FEED_QUERY, {
  options: ({ id }) => ({ variables: { id: 37 } } )
})

export default feedWithData(UserHome)