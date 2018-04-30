import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Lottie from 'react-lottie'
import lottieFile from '../../shared/lottie/loader.json'
import Ionicon from 'react-ionicons'
import _ from 'lodash'

// Apollo
import { Query, Subscription } from 'react-apollo'
import { client } from '../../shared/utils/apollo'
import FEED_QUERY from '../../graphql/Feed.graphql'
import FEED_SUBSCRIPTION from '../../graphql/FeedSub.graphql'

// Components
import Header from '../reusables/Header.jsx'
import PostContainer from '../reusables/PostContainer/PostContainer.jsx'
import PaginateListener from '../reusables/PaginateListener.jsx'

// Helpers
import { generateImageLink, generateAvatarLink } from '../../shared/utils/helpers'

import './styles/UserHome.scss'

class UserHome extends Component {
  state = {
    scrollUpButton: false,
    newPosts: []
  }

  // Event listener to render back to top bottom
  componentDidMount() {
    document.addEventListener('scroll', _.debounce(this.scrollHandler, 20))
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollHandler)
  }

  scrollHandler = () => {
    if(window.pageYOffset > 200)
      this.setState({ scrollUpButton: true })
    else
      this.setState({ scrollUpButton: false })
  }

  // scrolls to top, if they're too far deep into their
  // feed, dont animate (animate scroll doesn't work on safari)
  scrollToTop = () => {
    let behavior = 'smooth'
    if(window.pageYOffset > 12000) 
      behavior = 'auto'
    window.scrollBy({
      top: 0 - (window.pageYOffset),
      behavior
    })
  }

  /**
   * On our home feed, we don't update our cache
   * until the user chooses to by click the new
   * post button rendered on the bottom right
   * of the page
   */
  updateCache = () => {
    const { userFeed } = client.readQuery({
      query: FEED_QUERY,
      variables: {id: this.props.id, after: null}
    })

    client.writeQuery({
      query: FEED_QUERY,
      variables: {id: this.props.id, after: null},
      data: {
        userFeed: [...this.state.newPosts, ...userFeed]
      }
    })
    this.setState({ newPosts: [] })
    this.scrollToTop()
  }

  render() {
    const lottieOptions = { loop: true, autoplay: true, animationData: lottieFile }    
    const { id } = this.props
    const { newPosts, scrollUpButton } = this.state
    let subscriptionAlerts = null
    if(this.state.newPosts.length > 3) {
      subscriptionAlerts = (
        <li onClick={this.updateCache}>
          {this.state.newPosts.length} new posts
        </li>
      )
    } else if(this.state.newPosts.length > 0) {
      subscriptionAlerts = newPosts.map((post, key) => {
        return (
          <li onClick={this.updateCache} key={key}>
            <img src={generateImageLink(post.image_url)} alt={`${post.user.firstname}'s post`} />
            <p>{id !== post.user.id ? post.user.firstname : `You've`} posted a new photo.</p>
          </li>
        )
      })
    }
    return (
      <div className='container'>
        <Header title='Feed'/>
        <Subscription subscription={FEED_SUBSCRIPTION} variables={{ feed_id: id }}>
          {({ loading, error, data }) => {
            if(!loading && data.newPost ) {
              this.setState({ newPosts: [ data.newPost, ...this.state.newPosts ]})
            }
            return <span className='hide'/>
          }}
        </Subscription>
        <Query 
          query={FEED_QUERY} 
          variables={{ id, after: null }} 
          fetchPolicy='cache-and-network'>
            {({ loading, error, data, fetchMore }) => {
              if(error) console.log(error)
              let feed = []
              if(data && Object.entries(data).length > 0) {
                feed = data.userFeed.map((post, key) => <PostContainer key={key} index={key} post={post} user_id={id} />)
                feed.push(
                  <PaginateListener key={999} onLoadMore={() => {
                    fetchMore({
                      variables: {
                        after: data.userFeed ? data.userFeed[data.userFeed.length-1].id : null,
                      },
                      updateQuery: (prev, {fetchMoreResult}) => {
                        if(!fetchMoreResult) return prev
                        return Object.assign({}, prev, {
                          userFeed: [...prev.userFeed, ...fetchMoreResult.userFeed]
                        })
                      }
                    })
                  }}/>
                )
              } else if(!loading) {
                feed = (
                  <span className='emptyFeedContainer'>
                    <p>It looks like your feed is empty. We suggest you that you follow some users to populate your feed.</p>
                    <p>Look for users by navigating to the <strong>Search</strong> page on the navigation bar.</p>
                  </span>
                )
              }
              return (
                <React.Fragment>
                  {feed}
                </React.Fragment>
              )
            }
          }
        </Query>
        <ul className='homeFeedUtility'>
          {subscriptionAlerts}
          {scrollUpButton && (
            <button onClick={this.scrollToTop}>
              <Ionicon icon='ios-arrow-round-up' fontSize='28px' color='#fff'/>
              Back to Top
            </button>
            )
          }
        </ul>
      </div>
    )
  }
}

UserHome.propTypes = {
  id: PropTypes.number.isRequired,
}

export default UserHome

