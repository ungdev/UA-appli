import React from 'react'
import { Tabs, Spin, Button } from 'antd'
import HsDecksDeckList from './HsDecksDeckList'
import HsDecksStats from './HsDecksStats'
import { getDeck, deleteDeck } from '../../../../modules/hearthstone'
import { connect } from 'react-redux'

const TabPane = Tabs.TabPane
const hsclass = [
  { en: 'PRIEST', fr: 'Prêtre' },
  { en: 'MAGE', fr: 'Mage' },
  { en: 'PALADIN', fr: 'Paladin' },
  { en: 'ROGUE', fr: 'Voleur' },
  { en: 'SHAMAN', fr: 'Shaman' },
  { en: 'HUNTER', fr: 'Chasseur' },
  { en: 'DRUID', fr: 'Druide' },
  { en: 'WARLOCK', fr: 'Démoniste' },
  { en: 'WARRIOR', fr: 'Guerrier' },
]

class HsDecksCards extends React.Component {
  constructor(props) {
    super(props)
    this.props.decks.forEach(deck => this.props.getDeck(deck.id))
    this.state = {
      alldecks: this.props.alldecks,
      deletedDecks: [],
    }
  }

  static getDerivedStateFromProps(props, state) {
    return { ...state, alldecks: props.alldecks }
  }

  deleteDeck(id) {
    let { alldecks, deletedDecks } = this.state
    alldecks.splice(alldecks.findIndex(deck => deck && deck.id === id))
    deletedDecks.push(id)
    this.setState({ alldecks, deletedDecks })
    this.props.deleteDeck(id)
  }

  render() {
    const { decks } = this.props
    const { alldecks, deletedDecks } = this.state
    if(!alldecks) return <Spin/>
    let f = false
    decks.forEach(deck => {
      if(!alldecks[deck.id]) {
        f = true
        if(!deletedDecks.find(d => d === deck.id))
          this.props.getDeck(deck.id)
      }
    })
    if(f) return <Spin/>
    return (
      <Tabs defaultActiveKey="0" size="small" tabPosition="left">
        {decks.map((de, key) => {
          let deck = alldecks[de.id]
          let deckclass = hsclass.find(c => c.en === deck.class)
          deckclass = deckclass ? deckclass.fr : ''
          return (<TabPane
          className="cardTab"
          tab={
            <div className="tabTitle">
              <div className="tabTitleName">{deck.name}</div>
              <div className="tabTitleHero">{deckclass}</div>
            </div>
          }
          key={key}
        >
          <div className="flex-card">
            <div className="flex-card-left">
              <HsDecksDeckList deck={deck} golden={this.props.golden} />
            </div>
            <div className="flex-card-right">
              <HsDecksStats deck={deck} golden={this.props.golden} />
            </div>
          </div>
          {this.props.canDelete && <Button type="danger" onClick={() => this.deleteDeck(deck.id)}>Supprimer ce deck</Button>}
        </TabPane>)})}
      </Tabs>
    )
  }
}


const mapStateToProps = state => ({
  alldecks: state.hearthstone.decks,
})

const mapDispatchToProps = dispatch => ({
  getDeck: (id) => dispatch(getDeck(id)),
  deleteDeck: (id) => dispatch(deleteDeck(id))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(HsDecksCards)
