import React, { Component } from 'react'
import Header from '../reusables/Header.jsx'
import { withRouter } from 'react-router-dom'

import { client } from '../../shared/utils/apollo'
import { Query } from 'react-apollo'
import QUERY_CONVERSATIONS from '../../graphql/UserConversations.graphql'
import FullScreenSpinner from '../reusables/FullScreenSpinner.jsx'

import { mapStateToProps } from '../../shared/utils/redux'
import { connect } from 'react-redux'

import NoProfilePicture from '../reusables/NoProfilePicture.jsx'
import { generateAvatarLink } from '../../shared/utils/helpers'

import './styles/Chat.scss'

class Chat extends Component {
  
  state = {
    currentChat: 0,
    currentUserId: this.props.user.info.id,
    message: ''
  }

  parseConversations = conversations => { 
    const { currentUserId:user_id } = this.state
    return conversations.map((item, key) => {
      const recipient = (item.user1.id !== user_id) ? item.user1 : item.user2
      const chatItemStyle = this.state.currentChat === key ? 'sideChatItem active' : 'sideChatItem'
      return (
        <div 
          key={key} 
          className={chatItemStyle} 
          onClick={() => { 
            this.setState({ currentChat: key })
            setTimeout(() => this.scrollToBottom(), 1) } // wait for the chat to mount first
          }>
          {recipient.profile_picture === null
              ? <NoProfilePicture name={recipient.firstname} size='70px' fontSize='24px'/>
              : <img src={generateAvatarLink(recipient.id)} alt='' />
          }
          <span>
            <h2>{recipient.firstname}</h2>
            <p>{item.messages.find(f => f).message}</p>
          </span>
        </div>
      )
    })
  }

  generateThread = ({ messages, user1, user2, id }) => { 
    const { currentUserId } = this.state
    const otherUser = (currentUserId !== user1.id) ? user1 : user2
    return (
      <div className='chatWindowContent'>
        <div className='chatWindowHeader'>
          {otherUser.profile_picture === null
            ? <NoProfilePicture name={otherUser.firstname} size='50px' fontSize='20px'/>
            : <img src={generateAvatarLink(otherUser.id)} alt='' />
          }
          <p>{otherUser.firstname} {otherUser.lastname}</p>
        </div>
        <div className='chatWindowMessages'>
          {this.parseMessages(messages )}
        </div>
      </div>
    )
  }

  parseMessages = messages => {
    const { currentUserId } = this.state
    const toReturn = messages.map((item, key) => {
      const msgStyle = item.user_id === currentUserId ? 'messageBubble sent' : 'messageBubble received'
      return (
        <div key={key} className={msgStyle}>
          <p>{item.message}</p>
        </div>
      )
    })
    toReturn.push( // append an anchor element to scroll to
      <span style={{ float: "left", clear: "both" }} 
        ref={e => { this['lastMsg' + this.state.currentChat] = e } } key={999} />
    )
    return toReturn
  }

  scrollToBottom = () => {
    this['lastMsg' + this.state.currentChat].scrollIntoView()
  }

  render() {
    const { id:user_id } = this.props.user.info
    const { currentChat } = this.state
    return (
      <div className='container'>
        <Header title='Chat' />
        <Query query={QUERY_CONVERSATIONS} variables={ { user_id } } >
          {({ loading, error, data }) => {
            if(loading) return <FullScreenSpinner size={100} color='salmon' text={'Getting messages..'} />
            if(error) return <h1>error again LOL</h1>
            const { userConversations } = data
            const recipients = this.parseConversations(userConversations)
            const chatThread = this.generateThread(userConversations[currentChat === null ? 0 : currentChat])
            return (
              <div className='chatContainer'>
                <span className='sideChatContainer'>
                  {recipients}
                </span>
                <span className='chatWindowContainer'>
                  {chatThread}
                  <input
                    type='text'
                    placeholder='Say something..'
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })} />
                </span>
              </div>
            )
          }}
        </Query>
        
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(Chat))