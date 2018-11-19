import React from 'react'
import { Button, Divider, Card, Spin, Modal, Input } from 'antd'
import HsDecksCards from './HsDecksCards'
import GameStatusBar from '../GameStatusBar/GameStatusBar'
import { fetchHSPlayers, addDeck } from '../../../../modules/hearthstone'
import { connect } from 'react-redux'
import { actions as notifActions } from 'redux-notifications'
import { decode } from 'deckstrings'

const { TextArea } = Input

class MyHsDecks extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchHSPlayers()
    this.state = {
      golden: false,
      filteredName: '',
      addModalVisible: false,
      deckstring: ''
    }
  }

  sendDeck() {
    this.setState({ addModalVisible: false })
    const tab = this.state.deckstring.split(/\n/)
    let deckstring = ''
    for (let i = 1; i < tab.length - 1; i++) {
      if(tab[i - 1] === '# ' && tab[i + 1] === '# ') deckstring = tab[i]
    }
    if(deckstring === '') {
      this.props.addDeckError()
      return
    }
    try{
      decode(deckstring)
      this.props.addDeck(tab[0].substr(4, tab.length), deckstring)
    } catch(e) {
      this.props.addDeckError()
      return
    }
  }

  render() {
    if(!this.props.user || !this.props.hsplayers) {
      return <Spin/>
    }
    const thisUser = this.props.hsplayers.find(player => player.id === this.props.user.id)
    if(!thisUser) return <Spin/>
    return (
      <div>
        <Modal
          title="Ajout d'un deck"
          visible={this.state.addModalVisible}
          onOk={() => this.sendDeck()}
          onCancel={() => this.setState({ addModalVisible: false })}
        >
          <p>Utilisez le bouton "copier" dans l'éditeur de deck d'Hearthstone, et collez directement le résultat dans le champ ci dessous :</p>
          <TextArea rows={6} onChange={e => this.setState({ deckstring: e.target.value })} />
        </Modal>
        <GameStatusBar game="5" />
        <Divider />
        <h1>Mes Decks</h1>
        {thisUser.decks.length < 4 && <Button style={{ marginBottom: '20px' }} onClick={() => this.setState({ addModalVisible: true })}>Ajouter un deck</Button>}
        {
          thisUser &&
          <Card
            style={{
              width: '100%'
            }}>
              <HsDecksCards
                decks={thisUser.decks}
                golden={this.state.golden}
                canDelete
              />
          </Card>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hsplayers: state.hearthstone.players || [],
  user: state.user.user,
})

const mapDispatchToProps = dispatch => ({
  fetchHSPlayers: () => dispatch(fetchHSPlayers()),
  addDeckError: () => dispatch(
    notifActions.notifSend({
      message: 'Erreur lors de l\'ajout du deck',
      kind: 'danger',
      dismissAfter: 2000
  })),
  addDeck: (name, deckstring) => dispatch(addDeck(name, deckstring)),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(MyHsDecks)
