import React, { Component } from 'react'
import moment from 'moment'
import Header from '../reusables/Header.jsx'
import { Link } from 'react-router-dom'

import { Query } from 'react-apollo'
import TRENDING_QUERY from '../../graphql/Trending.graphql'

import Lottie from 'react-lottie'
import lottieFile from '../../shared/lottie/crying.json'

import NoProfilePicture from '../reusables/NoProfilePicture.jsx'
import { generateAvatarLink, generateImageLink } from '../../shared/utils/helpers'

import './styles/SuggestUsers.scss'

class SuggestUsers extends Component {
  render() {
    const lottieOptions = { loop: true, autoplay: true, animationData: lottieFile }
    return (
      <React.Fragment>
        <div className='emptyFeedContainer'>
          <span className='emptyFeedText'>
            <p>It looks like your feed is empty. We suggest you that you follow some users to populate your feed.</p>
            <p>If you're new to Exposhare, here are some suggested users that you can view and follow —</p>
          </span>
          <span className='cryingLottieContainer'>
            <Lottie options={lottieOptions} height='100%' width='100%' />
          </span>
        </div>
        <Query query={TRENDING_QUERY}>
          {({ data, loading, error }) => {
            if(error) return <p>error in query</p>
            if(data && !loading) {
              return (
                <div>
                  <Header title='Trending Users' />
                  <div className='trendingUserContainer'>
                    {data.trending.slice(0, 6).map((item, key) => {
                      const { user } = item
                      let avatar = <NoProfilePicture name={user.firstname} size='40px' fontSize='24px' />
                      if(user.profile_picture !== null)
                        avatar = <img src={generateAvatarLink(user.id)} alt={user.username}/>
                      return (
                        <span className='trendingUserContent' key={key}>
                          <span  className='trendingHeader'>
                            <img src={generateImageLink(item.image_url)} alt='' />
                          </span>
                          <Link to={`/user/${user.username}`} className='trendingAvatar'>
                            {avatar}
                          </Link>
                          <Link to={`/user/${user.username}`} className='trendingUserNames'>
                            <h3>{user.firstname} {user.lastname}</h3>
                            <p>@{user.username}</p>
                          </Link>
                          <p style={{color: '#888'}}>
                            Member since {moment(user.created_at).format(`MMMM Do, YYYY`)}
                          </p>
                        </span>
                      )
                    })}
                  </div>
                  <br/><br/><br/><br/>
                </div>
              )
            }
            return <p>yes</p>
          }}
        </Query>
    </React.Fragment>
    )
  }
}


export default SuggestUsers