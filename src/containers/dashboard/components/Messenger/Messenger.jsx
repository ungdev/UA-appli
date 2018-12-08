import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { autoLogin } from '../../../../modules/login'
import {
  fetchMessages,
  sendMessage,
  SET_MESSAGES_LOADING,
  fetchMessagesByIdUser
} from '../../../../modules/messages'

import { List, Input, Button } from 'antd'
const { TextArea } = Input

class Messenger extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: this.props.messages,
      user: this.props.user,
      userTo: this.props.idTo ? this.props.idTo : null,
      spotlight: '',
      textValue: '',
      maxTitleCaracters: 100,
      maxTextCaracters: 1000
    }

    this.loadMessages()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (prevProps !== this.props) {
      this.setState({
        messages: this.props.messages,
        user: this.props.user,
        userTo: this.props.idTo
      })
    }
  }

  loadMessages() {
    this.props.setLoading()
    if (this.props.user && this.props.user.permission && (this.props.user.permission.admin || this.props.user.permission.respo)) {
      this.props.getMessagesByIdUser(this.props.idTo)
    } else {
      this.props.getMessages()
    }

 }

  onTextChange = e => {
    let message = e.target.value
    this.setState({ textValue: message })
  }

  sendMessage = () => {
    this.props.sendMessage(
      this.props.idTo,
      this.state.textValue,
      this.props.user.team == null ? null : this.props.user.team.spotlightId
    )
    this.setState({ textValue: '' })
  }

  render() {
    let { messages, maxTextCaracters } = this.state
    if (this.state.user !== this.props.user) {
      return ''
    }

    console.log(messages)

    let messagesList = (
      <List
        itemLayout="horizontal"
        locale={{ emptyText: 'Aucun message' }}
        dataSource={messages.map(message => {
          return {
            title:
              message.From === null
                ? 'UTT Arena Administration'
                : message.From.name,
            message: message.message
          }
        })}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.message} />
          </List.Item>
        )}
      />
    )

    return (
      <React.Fragment>
        <div>{messagesList}</div>
        <TextArea
          style={{ marginTop: '5px', marginBottom: '20px' }}
          rows={2}
          onChange={this.onTextChange}
          placeholder="Message"
          value={this.state.textValue}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="primary" onClick={this.sendMessage}>
            Envoyer
          </Button>
          <span
            style={
              this.state.textValue.length > maxTextCaracters - 50
                ? { color: '#ff0000' }
                : {}
            }
          >
            {maxTextCaracters - this.state.textValue.length} caractères restants
          </span>
        </div>
      </React.Fragment>
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
  redirectToHome: () => dispatch(push('/dashboard/home')),
  goToHome: () => dispatch(push('/dashboard/home')),
  getMessages: () => dispatch(fetchMessages()),
  getMessagesByIdUser: idTo => dispatch(fetchMessagesByIdUser(idTo)),
  sendMessage: (to, message, spotlight) => dispatch(sendMessage(to, message, spotlight)),
  setLoading: () => dispatch({ type: SET_MESSAGES_LOADING })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messenger)
