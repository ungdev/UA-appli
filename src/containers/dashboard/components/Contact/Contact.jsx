import React from 'react'
import GameStatusBar from '../GameStatusBar/GameStatusBar'
import { Divider, Input, Button, Spin } from 'antd'
import { connect } from 'react-redux'
import { sendMessageToSlack } from '../../../../modules/contact'

const { TextArea } = Input

class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      maxCaracters: 1000
    }
  }

  sendMessage = () => {
    this.props.sendMessageToSlack(this.state.value, this.props.tournament)
    this.setState({ value: '' })
  }
  onChange = (e) => {
    let message = e.target.value
    if(message.length > this.state.maxCaracters)
      message = message.substring(0, this.state.maxCaracters)
    this.setState({ value: message })
  }

  render() {
    const { maxCaracters } = this.state
    let spotlight
    if(this.props.tournament === 'libre')
      spotlight = { name: 'Libre' }
    else
      spotlight = this.props.spotlights.find(s => `${s.id}` === this.props.tournament)
    if(!spotlight) return <Spin/>
    let contactToDisplay = `Envoyer un message en rapport avec le tournoi ${spotlight.name}`
    return (
      <div>
        {this.props.tournament !== 'libre' && (
          <React.Fragment><GameStatusBar game={this.props.tournament} />
        <Divider /></React.Fragment>)}
        {contactToDisplay}
        <TextArea
          rows={6}
          onChange={this.onChange}
          placeholder="Votre message pour l'équipe ici"
          style={{ marginTop: '10px', marginBottom: '10px' }}
          value={this.state.value}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }} >
          <Button type="primary" onClick={this.sendMessage}>Envoyer</Button>
          <span style={this.state.value.length > maxCaracters - 50 ? { color: '#ff0000'} : {}} >{maxCaracters - this.state.value.length} caractères restants</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  spotlights: state.spotlights.spotlights
})

const mapDispatchToProps = dispatch => ({
  sendMessageToSlack: (message, sendingLocation) => dispatch(sendMessageToSlack(message, sendingLocation))
})

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
