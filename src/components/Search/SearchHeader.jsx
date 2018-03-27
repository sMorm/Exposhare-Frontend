import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'react-lottie'
import lottieFile from '../../shared/lottie/camera_search.json'
import { Query } from 'react-apollo'
import _ from 'lodash'

import USER_QUERY from '../../graphql/UserSearch.graphql'

import './styles/SearchHeader.scss'

class SearchHeader extends Component {
  state = {
    username: '',
    debounceUsername: ''
  }

  onChange = (e, refetch) => { 
    this.setState({ [e.target.name]: e.target.value })
    // _.debounce(() => this.setState({ [e.target.name]: e.target.value }), 5)
    // const param = e.target.value
    // this.setState(
    //   { [e.target.name]: e.target.value }, 
    //   () => this.debounceSearch(this.state.username)
    // )
  }

  debounceSearch = (val) => {
    console.log(val)
    this.setState({ debounceUsername: val })
  }

  render() {
    const lottieOptions = { loop: true, autoplay: true, animationData: lottieFile }
    const { username } = this.state
    return (
      <Query query={USER_QUERY} variables={{ username }}>
        {(props) => {
          const { error, loading, data, refetch } = props
          if(props.error) return <p> error</p>
          // console.log(data.searchUser)
          let users = ''
          if(data.searchUser) {
            users = data.searchUser.map((user, key) => {
              return (
                <Link to={`/user/${user.id}`} key={key} className='searchUserResultContent'>
                  <span className='searchUserResultFlex'>
                    <img src='https://avatars0.githubusercontent.com/u/25389160?s=460&v=4' alt='' />
                    <span>
                      <h2>@{user.username}</h2>
                      <h3>{user.firstname} {user.lastname}</h3>
                    </span>
                  </span>
                </Link>
              )
            })
          }
          return (
            <div className='searchHeaderContainer'>
              <div className='searchHeaderContent'>
                <span className='searchHeaderText'>
                  <h1>User Search —</h1>
                  <p>Looking for someone? Enter their username here to get a list of users with matching usernames.</p>
                  <input
                    type='text'
                    name='username'
                    onChange={(e) => this.onChange(e, refetch)}
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
          )
        }}
      </Query>
    )
  }
}

export default SearchHeader