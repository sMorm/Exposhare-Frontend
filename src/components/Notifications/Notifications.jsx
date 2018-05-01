import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapStateToProps } from '../../shared/utils/redux'

import { Subscription } from 'react-apollo'
import MSG_SUBSCRIPTION from '../../graphql/MessageSub.graphql'

import './styles/Notifications.scss'

class Notifications extends Component {
  state = {
    newMessages: []
  }

  goToChat = key => {
    const { newMessages } = this.state
    this.props.history.push(`/chat/${newMessages[key].conversation_id}`)
    this.setState({ newMessages: newMessages.splice(1, key) })
  }

  render() {
    const { pathname } = this.props.location    
    if(pathname.match(/chat*/) || !this.props.user.isAuthenticated)
      return <span className='hide' />    
    const { id:user_id } = this.props.user.info
    const { newMessages } = this.state
    
    let renderMessages = null
    if(newMessages.length > 0 ){
      renderMessages = newMessages.map((current, key) => {
        return (
          <p onClick={() => this.goToChat(key)} key={key}>
            {`${current.firstname} sent a message.`}
          </p>
        )
      })
    }
    return (
      <React.Fragment>
        <Subscription subscription={MSG_SUBSCRIPTION} variables={{ user_id }}>
          {({ data, loading, error }) => {
            if(data) {
              if(data.newMessage.user_id === user_id) return <span className='hide'/>
              this.setState({ newMessages: [data.newMessage, ...this.state.newMessages]})
            }
            return <span className='hide'/>
          }}
        </Subscription>
        <div className='notificationsContainer'>
          {renderMessages}
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(connect(mapStateToProps)(Notifications))