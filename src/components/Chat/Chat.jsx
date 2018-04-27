import React, { Component } from 'react'
import Header from '../reusables/Header.jsx'
import { withRouter, Link } from 'react-router-dom'

import { client } from '../../shared/utils/apollo'
import { Query, Mutation, Subscription } from 'react-apollo'
import QUERY_CONVERSATIONS from '../../graphql/UserConversations.graphql'
import MSG_MUTATION from '../../graphql/NewMessage.graphql'
import MSG_SUBSCRIPTION from '../../graphql/MessageSub.graphql'
import FullScreenSpinner from '../reusables/FullScreenSpinner.jsx'

import { mapStateToProps } from '../../shared/utils/redux'
import { connect } from 'react-redux'

import NoProfilePicture from '../reusables/NoProfilePicture.jsx'
import { generateAvatarLink } from '../../shared/utils/helpers'

import './styles/Chat.scss'

class Chat extends Component {
  
  state = {
    currentChat: 0,
    hasNewMessage: {},
    currentUserId: this.props.user.info.id,
    message: '',
    initialChat: this.props.match.params.conversation_id
  }

  componentDidMount() {
    const { initialChat } = this.state
    if(initialChat !== undefined) {
      client.query({ query: QUERY_CONVERSATIONS, variables: { user_id: 39 } })
      .then(res => {
        res.data.userConversations.forEach((item, key) => {
          if(Number(initialChat) === item.id) { 
            this.setState({ currentChat: key })
            this.scrollToBottom()
          }
        })
      })
    }
  }

  parseConversations = conversations => { 
    const { currentUserId:user_id, hasNewMessage } = this.state
    return conversations.map((item, key) => {
      const recipient = (item.user1.id !== user_id) ? item.user1 : item.user2
      const chatItemStyle = this.state.currentChat === key ? 'sideChatItem active' : 'sideChatItem'
      const { conversation_id } = this.props.match.params
      return (
        <div 
          key={key} 
          className={chatItemStyle} 
          onClick={() => { 
            let reset = hasNewMessage
            reset[key] = 0
            this.setState({ currentChat: key, hasNewMessage: reset, message: '' })
            setTimeout(() => this.scrollToBottom(), 1) } // wait for the chat to mount first
          }>
            <span className='sideChatContent'>
              <span className='sideChatIcon'>
                {recipient.profile_picture === null
                  ? <NoProfilePicture name={recipient.firstname} size='70px' fontSize='24px'/>
                  : <img src={generateAvatarLink(recipient.id)} alt='' />
                }
              </span>
              <span className='sideChatInfo'>
                <h2>
                  {recipient.firstname}
                </h2>
                <p>{item.messages[item.messages.length-1].message}</p>
              </span>
            </span>
            {hasNewMessage[key] > 0 && <span className='newMessageBubble' />}
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
          <Link to={`/user/${otherUser.username}`}>
            {otherUser.profile_picture === null
              ? <NoProfilePicture name={otherUser.firstname} size='50px' fontSize='20px'/>
              : <img src={generateAvatarLink(otherUser.id)} alt='' />
            }
          </Link>
          <p>{otherUser.firstname} {otherUser.lastname}</p>
        </div>
        <div className='chatWindowMessages'>
          {this.parseMessages(messages)}
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
    const convoQuery = { query: QUERY_CONVERSATIONS, variables: { user_id } }
    return (
      <div className='container'>
        <Header title='Chat' />
        <Subscription subscription={MSG_SUBSCRIPTION} variables={{ user_id }}>
          {({ loading, error, data }) => {
            if(data) {
              let updatedCache = client.readQuery(convoQuery).userConversations
              let indexToUpdate = undefined
              updatedCache.forEach((item, index) => {
                if(item.id === data.newMessage.conversation_id)
                    indexToUpdate = index // change to .find later
              })
              updatedCache[indexToUpdate].messages.push(data.newMessage)
              client.writeQuery({
                query: QUERY_CONVERSATIONS,
                variables: { user_id },
                data: { userConversations: updatedCache }
              })
              if(indexToUpdate !== this.state.currentChat) {
                const { hasNewMessage } = this.state
                if(!hasNewMessage[`${indexToUpdate}`])
                  hasNewMessage[`${indexToUpdate}`] = 1
                else
                hasNewMessage[`${indexToUpdate}`] += 1
                this.setState({ hasNewMessage })
              } else {
                setTimeout(() => this.scrollToBottom(), 50)
              }
            }
            return <span className='hide' />
          }}
        </Subscription>
        <Query query={QUERY_CONVERSATIONS} variables={ { user_id } } fetchPolicy='cache-and-network'>
          {({ loading, error, data }) => {
            if(loading) return <FullScreenSpinner size={100} color='salmon' text={'Getting messages..'} />
            if(error) return <h1>Looks like you don't have any converastions going, start by messaging someone from their profile.</h1>
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
                  <Mutation
                    mutation={MSG_MUTATION}
                    refetchQueries={[{
                      query: QUERY_CONVERSATIONS,
                      variables: { user_id }
                    }]} >
                    {(mutate, { data, loading, err}) => {
                      return (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault()                     
                            mutate({variables : { 
                              user_id, 
                              message: this.state.message, 
                              conversation_id: userConversations[currentChat].id
                            }})
                            .then(res => {
                              this.setState({ message: '' })
                              setTimeout(() => this.scrollToBottom(), 100) // wait for DOM update
                            })
                        }}>
                          <input
                            type='text'
                            placeholder='Say something..'
                            value={this.state.message}
                            onChange={e => this.setState({ message: e.target.value })} 
                            />
                        </form>
                      )
                    }}
                  </Mutation>

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