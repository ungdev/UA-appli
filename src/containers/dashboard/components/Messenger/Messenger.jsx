import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { autoLogin } from '../../../../modules/login'
import _ from 'lodash'
import {
  fetchMessages,
  // sendMessage,
  SET_MESSAGES_LOADING,
  fetchMessagesByIdUser
} from '../../../../modules/messages'

import { List, Input } from 'antd'
const { TextArea } = Input

class Messenger extends React.Component {
  constructor(props) {
    super(props)
    this.loadMessages()
    this.state = {
      messages: this.props.messages,
      user: this.props.user,
      to: {},
      textValue: ''
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.setState({ messages: this.props.messages, user: this.props.user })
    }
  }

  loadMessages() {
    this.props.setLoading()
    this.props.user && this.props.user.isAdmin === 100 ? this.props.getMessagesByIdUser(this.props.idTo) :  this.props.getMessages()

  }

  onTextChange = e => {
    let message = e.target.value
    this.setState({ textValue: message })
  }

  sendMessage = () => {
    this.props.sendMessage(
      this.props.tournament === 'libre' ? '7' : this.props.tournament,
      this.state.titleValue,
      this.state.textValue
    )
    this.loadData(0, 5)
    this.setState({ textValue: '' })
  }

  render() {
    let { messages } = this.state
    console.log(this.props)
    let messagesList = (
      <List
        itemLayout="horizontal"
        dataSource={messages.map(message => {
          return { title: message.From === null ? 'UTT Arena Administration' : message.From.name , message: message.message}
        })}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={item.message}
            />
          </List.Item>
        )}
      />
    )
    console.log('MESSAGESLIST : ', messagesList)
    return (
      <div>
        <div>{messagesList}</div>
        <TextArea
          style={{ marginTop: '5px', marginBottom: '20px' }}
          rows={2}
          onChange={this.onTextChange}
          placeholder="Message"
          value={this.state.textValue}
        />
      </div>
    )
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
  getMessagesByIdUser: (idTo) => dispatch(fetchMessagesByIdUser(idTo)),
  // sendMessage: (spotlight, title, text) => dispatch(sendMessage(spotlight, title, text)),
  setLoading: () => dispatch({ type: SET_MESSAGES_LOADING })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messenger)
