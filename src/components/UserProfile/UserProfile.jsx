import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import ProfileHeader from './ProfileHeader.jsx'
import GridFeed from './GridFeed.jsx'
import LottieLoad from '../reusables/LottieLoad.jsx'
import FullScreenSpinner from '../reusables/FullScreenSpinner.jsx'

// Apollo
import QUERY_PROFILE_INFO from '../../graphql/ProfileInfo.graphql'
import { Query } from 'react-apollo'

// Helpers
import { mapStateToProps } from '../../shared/utils/redux'
import './styles/UserProfile.scss'

class UserProfile extends Component {
  render() {
    const username = this.props.match.params[0]
    if(!this.props.user.isAuthenticated) return <Redirect to='/' />
    const { id:context_id } = this.props.user.info
    return (
      <Query query={QUERY_PROFILE_INFO} variables={{ username, context_id }} >
        {({ loading, error, data }) => {
          if(loading) return <FullScreenSpinner size={100} color='salmon' text='Grabbing user info..' />
          if(error) return <h1>error: fetch profile info</h1>
          const { user } = data
          if(data) {
            return (
              <div className='container'>
                <ProfileHeader userInfo={user} context_id={context_id}/>
                <GridFeed id={data.user.id} context_id={context_id} />
              </div>
            )
          }
        }}
      </Query>
    )
    }
  }

  export default connect(mapStateToProps)(withRouter(UserProfile))