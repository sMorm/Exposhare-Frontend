import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

// Lottie
import Lottie from 'react-lottie'
import lottieFile from '../../shared/lottie/camera_search.json'

// Apollo
import USER_QUERY from '../../graphql/UserSearch.graphql'
import { Query } from 'react-apollo'

// Helpers
import { generateAvatarLink } from '../../shared/utils/helpers'

import './styles/Search.scss'

class Search extends Component {
  state = {
    username: '',
    debouncedUsername: ''
  }

  /**
   * <Query /> will query every time it's variable is changed,
   * we want to debounce the search every second and use a secondary
   * state for searching so the server doesn't get requested too 
   * many useless times!
   */
  onChange = e => { 
    this.setState(
      { [e.target.name]: e.target.value },
      _.debounce(() => this.setState({ debouncedUsername: this.state.username }), 1000))
  }

  render() {
    const lottieOptions = { loop: true, autoplay: true, animationData: lottieFile }
    const { debouncedUsername } = this.state
    return (
      <Query query={USER_QUERY} variables={{ username: debouncedUsername }} skip={debouncedUsername === ''}>
        {({ error, loading, data }) => {
          if(error) return <p> error</p> // server error
          let users = ''
          if(data.searchUser) { // list of users returned, map it and store it in users
            users = data.searchUser.map((user, key) => {
              let avatarSource = 'http://via.placeholder.com/100x100'
              if(user.profile_picture !== null) avatarSource = generateAvatarLink(user.id)
              return (
                <Link to={`/user/${user.username}`} key={key} className='searchUserResultContent'>
                  <span className='searchUserResultFlex'>
                    <img src={avatarSource} alt='' />
                    <span>
                      <h3>{user.firstname} {user.lastname}</h3>
                      <p>@{user.username}</p>
                    </span>
                  </span>
                </Link>
              )
            })
          }
          return (
            <div className='container'>
              <div className='searchHeaderContainer'>
                <div className='searchHeaderContent'>
                  <span className='searchHeaderText'>
                    <h1>User Search —</h1>
                    <p>Looking for someone? Enter their username here to get a list of users with matching usernames.</p>
                    <input
                      type='text'
                      name='username'
                      onChange={this.onChange}
                      value={this.state.username} 
                      autoComplete='off'/>
                  </span>
                  <span className='searchHeaderLottie'>
                    <Lottie options={lottieOptions} height='100%' width='100%' />
                  </span>
                </div>
                <div className='searchUserResults'>
                  {users}
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Search