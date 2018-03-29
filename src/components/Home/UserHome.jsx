import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Lottie from 'react-lottie'
import lottieFile from '../../shared/lottie/loader.json'

import { graphql, Query } from 'react-apollo'
import FEED_QUERY from '../../graphql/Feed.graphql'

import Header from '../reusables/Header.jsx'
import PostContainer from '../reusables/PostContainer.jsx'

class UserHome extends Component {
  componentDidMount = () => {
    console.log('mount')
  }
  render() {
    const lottieOptions = { loop: true, autoplay: true, animationData: lottieFile }    
    return (
      <div className='container'>
        <Header title='Feed'/>
        <div className='feedContainer'>
          <Query query={FEED_QUERY} variables={{ id: this.props.id }} options={{fetchPolicy: 'cache-and-network'}}>
            {({ loading, error, data }) => {
              if(loading) return <Lottie options={lottieOptions} height={300} width={300} />
              if(error) return <h1>error :/</h1>
              return data.userFeed.map((post, key) => <PostContainer key={key} post={post} />)
            }}
          </Query>
        </div>
      </div>
    )
  }
}

UserHome.propTypes = {
  id: PropTypes.number.isRequired,
}

export default UserHome