import React, { Component } from 'react'
import moment from 'moment'

import { FoldingCube } from 'better-react-spinkit'

// Lottie
import Lottie from 'react-lottie'
import lottieFile from '../../shared/lottie/loading_spinner.json'

// Apollo
import { Query } from 'react-apollo'
import TRENDING_QUERY from '../../graphql/Trending.graphql'

import { generateImageLink, generateAvatarLink } from '../../shared/utils/helpers'

import './styles/Trending.scss'

export default class Trending extends Component {

  state = { 
    loaded: 0
  }

  imageLoaded = () => this.setState({ loaded: this.state.loaded + 1})
  render() {
    const lottieOptions = { loop: true, autoplay: true, animationData: lottieFile } 
    return (
      <Query query={TRENDING_QUERY}>
        {({ data, loading, error }) => {
          if(error) return <h1>Something went wrong. Serey probably broke something</h1>
          if(loading) {
            return (
              <span className='trendingLoadingContainer'>
                <span className='trendingLoadingContent'>
                  <Lottie options={lottieOptions} width='100%' height='100%' />
                </span>
              </span>
            )
          }
          if(!loading && data.trending) {
            const posts = data.trending.slice(0, 8).map((post, key) => {
              let avatarSource = 'http://via.placeholder.com/50x50'
              if(post.user.profile_picture !== null)
                avatarSource = generateAvatarLink(post.user.id)
              return (
                <span className='trendingPostItem' key={key}>
                  <span className='trendingPostUserContainer'>
                    <span className='trendingPostUser'>
                      <img src={avatarSource} alt='user profile' />
                      <h4>{`${post.user.firstname} ${post.user.lastname}`}</h4>
                    </span>
                    <p>{moment(post.created_at).fromNow()}</p>
                  </span>
                  <div className={this.state.loaded === 8 ? 'hide' : 'trendingImgSkeleton'}>
                    <FoldingCube size={20} color='#ccc' />
                  </div>
                  <img 
                    src={generateImageLink(post.image_url)} 
                    alt={post.content} 
                    onLoad={this.imageLoaded} 
                    className={this.state.loaded !== 8 ? 'hide' : null}/>
                </span>
              )
            })
            return (
              <span className='trendingPostsContainer'>
                {posts}
              </span>
            )
          }
          return <p>done</p>
        }}
      </Query>
    )
  }
}
