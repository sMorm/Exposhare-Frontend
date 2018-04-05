import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'
import PostContainer from '../reusables/PostContainer.jsx'
import _ from 'lodash'

import PaginateListener from '../reusables/PaginateListener.jsx'
import { Query } from 'react-apollo'
import QUERY_PROFILE_FEED from '../../graphql/ProfileFeed.graphql'

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

  toggleFeed = activeFeed => this.setState({ activeFeed })

  // componentDidMount = () => {
  //   window.addEventListener('scroll', this.handleScroll)
  // }

  // componentWillUnmount = () => {
  //   window.removeEventListener('scroll', this.handleScroll)   
  // }

  // /**
  //  * http://blog.sodhanalibrary.com/2016/08/detect-when-user-scrolls-to-bottom-of.html#.WftmORNSyL4
  //  */
  // handleScroll = () => {
  //   const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
  //   const body = document.body
  //   const html = document.documentElement
  //   const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
  //   const windowBottom = windowHeight + window.pageYOffset
  //   windowBottom >= docHeight && console.log('hit bottom')
  // }


  render() {
    const { id, context_id } = this.props
    return (
      <div>
        <FeedOptions toggleFeed={this.toggleFeed}/>
        <Query query={QUERY_PROFILE_FEED} variables={{ id, context_id, after: null }}> 
          {(props) => {
            const { userPosts } = props.data
            if(userPosts) {
        const chunks = _.chunk(userPosts, userPosts.length/3)
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
        let gridFeed = (
          <div className='noCropContainer'>
            {noCropFeed}
          </div>
        )
              return (
                <div className='gridContainer'>
                  {gridFeed}
                  <PaginateListener onLoadMore={() => {
                    console.log(userPosts[userPosts.length-1].id)
                    props.fetchMore({
                      variables: {
                        after: userPosts[userPosts.length-1].id,
                      },
                      updateQuery: (prev, {fetchMoreResult}) => {
                        if(!fetchMoreResult) return prev
                        console.log(prev)
                        return Object.assign({}, prev, {
                          userPosts: [...prev.userPosts, ...fetchMoreResult.userPosts]
                        })
                      }
                    })
                  }}/>
                </div>
              )
            }
            return <p>prop</p>
          }}
        </Query>      </div>
    )
  }
}

GridFeed.propTypes = {
  id: PropTypes.number.isRequired,
  context_id: PropTypes.number.isRequired
}

export default GridFeed

    // let feed = ''
    // const { posts } = this.props
    // switch(this.state.activeFeed) {
    //   case 'no-crop':
    //     const items = [...posts, ...posts, ...posts, ...posts]
    //     const chunks = _.chunk(items, items.length/3)
    //     const noCropFeed = chunks.map((chunk, key) => {
    //       return (
    //         <span key={key} className='noCropContent'>
    //           {chunk.map((post, key) => {
    //             return (
    //               <img 
    //                 key={key} 
    //                 src={`https://s3.amazonaws.com/gui-project-database${post.image_url}`} 
    //                 alt={post.content}
    //               />
    //             )
    //           })}
    //         </span>
    //       )
    //     })
    //     feed = (
    //       <div className='noCropContainer'>
    //         {noCropFeed}
    //       </div>
    //     )
    //     break;
    //   case 'grid':
    //     const gridFeed = posts.map((post, key) => {
    //       return (
    //         <span key={key} className='gridContent'>
    //           <img 
    //             key={key} 
    //             src={`https://s3.amazonaws.com/gui-project-database${post.image_url}`} 
    //             alt={post.content}
    //           />
    //         </span>
    //       )
    //     })
    //     feed = (
    //       <div className='gridContainer'>
    //         {gridFeed}
    //       </div>
    //     )
    //     break;
    //   case 'crop':
    //     // return posts.map((post, key) => <PostContainer key={key} post={post} />)
    //     break;
    // }