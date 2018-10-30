import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { autoLogin } from '../../../../modules/login'
import _ from 'lodash'
import {
  fetchMessages,
  // sendMessage,
  SET_MESSAGES_LOADING
} from '../../../../modules/messages'

import { Card } from 'antd'

class Messenger extends React.Component {
  constructor(props) {
    super(props)
    this.loadMessages()
    this.state = {
      messages: this.props.messages,
      user: this.props.user
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.setState({ messages: this.props.messages, user: this.props.user })
    }
  }

  loadMessages() {
    this.props.setLoading()
    this.props.getMessages()
  }
  render() {
    let { messages } = this.state
    let messageList = messages.map(message => {
      if (this.props.user) {
        let cssclass =
          this.props.user.id === message.senderId
            ? 'sender'
            : 'receiver'
        return (
          <Card
            title={message.From.name}
            className={cssclass}
            style={{ width: 300 }}
          >
            <p>{message.message}</p>
          </Card>
        )
      }
    })
    return <div>{messageList}</div>
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  messages: state.messages.messages,
  loading: state.messages.loading,
  location: state.routing.location.pathname
})

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin()),
  goToHome: () => dispatch(push('/dashboard/home')),
  getMessages: () => dispatch(fetchMessages()),
  // sendMessage: (spotlight, title, text) => dispatch(sendMessage(spotlight, title, text)),
  setLoading: () => dispatch({ type: SET_MESSAGES_LOADING })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messenger)
