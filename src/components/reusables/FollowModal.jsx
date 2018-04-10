import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'

// Components
import NoProfilePicture from '../reusables/NoProfilePicture.jsx'

// Apollo
import { Query } from 'react-apollo'
import FOLLOWER_QUERY from '../../graphql/Followers.graphql'
import FOLLOWING_QUERY from '../../graphql/Followings.graphql'

// Helpers
import { generateAvatarLink } from '../../shared/utils/helpers'

// Styles/Other stuff
import './styles/FollowModal.scss'

export default class FollowModal extends Component {
  render() {
    const { type, id, close } = this.props
    const QUERY = type === 'followers' ? FOLLOWER_QUERY : FOLLOWING_QUERY
    return (
      <div className='followModalOverlay'>
        <div className='followModalContainer'>
          <Query query={QUERY} variables={{ id }}>
            {({ data, loading, error }) => {
              if(error) console.log(error)
              if(!loading && data) {
                const users = type === 'followers' ? data.followers : data.following
                return (
                  <div className='followModalContent'>
                    <span className='followModalHeader'>
                      <h1>{type === 'followers' ? 'Followers' : 'Followings'}</h1>
                      <span className='lightboxClose'>
                        <span className='closeModal' onClick={close}/>
                      </span>
                    </span>
                    <div className='followModalItemContainer'>
                      {users.map((user, key) => {
                        const { id:current_id, username, firstname, lastname, profile_picture, created_at } = user
                        let avatar = <NoProfilePicture size='60px' fontSize='24px' />
                        if(profile_picture) 
                          avatar = <img src={generateAvatarLink(current_id)} alt={`${username}'s story`} />
                        return (
                          <div className='followModalItem' key={key}>
                            <div className='followModalInfo'>
                              <Link to={`/user/${username}`} className='followModalLink'>
                                {avatar}
                              </Link>
                              <Link to={`/user/${username}`} className='followModalName'>
                                <h3>{`${firstname} ${lastname}`}</h3>
                                <h5>@{username}</h5>
                              </Link>
                            </div>
                            <p>Joined {moment(created_at).fromNow()}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              }
              return <p>nothing</p>
            }}
          </Query>
        </div>
      </div>
    )
  }
}


FollowModal.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired
}

