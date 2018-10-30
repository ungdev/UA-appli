import React from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import { autoLogin } from "../../../../modules/login"

import {
  fetchMessages,
  // sendMessage,
  SET_MESSAGES_LOADING
} from "../../../../modules/messages"

import { Card } from "antd"

class Messenger extends React.Component {
  constructor(props) {
    super(props)
    this.loadMessages()
    this.state = {
      messages: this.props.messages
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.setState({ messages: this.props.messages })
    }
  }

  loadMessages() {
    this.props.setLoading()
    this.props.getMessages()
  }
  render() {
    let { messages } = this.state
    console.log("messages", messages)
    let messageList = messages.map(message => {
      return (
        <Card>
          <p>
            Message de : {message.From.name} => {message.message}
          </p>
        </Card>
      )
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
  goToHome: () => dispatch(push("/dashboard/home")),
  getMessages: () => dispatch(fetchMessages()),
  // sendMessage: (spotlight, title, text) => dispatch(sendMessage(spotlight, title, text)),
  setLoading: () => dispatch({ type: SET_MESSAGES_LOADING })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messenger)
