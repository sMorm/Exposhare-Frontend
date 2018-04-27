import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Apollo
import { Mutation } from 'react-apollo'
import MESSAGE_MUTATION from '../../graphql/NewMessage.graphql'

import './styles/MessageModal.scss'

class MessageModal extends Component {
  state = {
    message: ''
  }

  onChange = e => this.setState({ message: e.target.value })

  onSubmit = (e, send) => {
    e.preventDefault()
    const { message } = this.state
    const { user_id, conversation_id } = this.props
    if(message === '') return
    send({variables: { message, user_id, conversation_id  } })
    .then(res => {
      this.setState({ message: '' })
      this.props.history.push(`/chat/${conversation_id}`)
    })
    .catch(e => console.log(e))
  }

  render() {
    return (
      <div className='messageModalContainer'>
        <div className='messageModalOverlay'>
          <div className='messageModalContent'>
            <Mutation mutation={MESSAGE_MUTATION}>
              {(send, { loading, data, error}) => {
                let buttonContent = 'Send'
                if(loading) buttonContent = '..'
                if(error) buttonContent = 'Error'
                return (
                  <form onSubmit={this.onSubmit}>
                    <h3>Send a message</h3>
                    <input
                    type='text'
                    onChange={this.onChange}
                    value={this.state.message}
                    placeholder='Type something..'/>
                    <button onClick={e => this.onSubmit(e, send)}>{buttonContent}</button>
                  </form>
                )
              }}
            </Mutation>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MessageModal)