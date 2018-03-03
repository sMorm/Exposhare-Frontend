import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

import { graphql } from 'react-apollo'
import FEED_QUERY from '../../graphql/Feed.graphql'

class UserHome extends Component {
  state = {
    feedContent: []
  }
  componentDidMount() {
    // Fetch Feed

  }
  render() {
    return (
      <div className='container'>
        This page gets rendered when the user's logged in
      </div>
    )
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
  options: ({ id }) => ({ variables: { id: 2 } })
})

export default feedWithData(UserHome)