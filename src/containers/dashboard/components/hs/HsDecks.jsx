import React from 'react'
import { AutoComplete, Button, Collapse, Divider, Card, Spin, Switch } from 'antd'
import HsDecksCards from './HsDecksCards'
import GameStatusBar from '../GameStatusBar/GameStatusBar'
import { fetchHSPlayers } from '../../../../modules/hearthstone'
import { connect } from 'react-redux'

const Panel = Collapse.Panel

class HsDecks extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchHSPlayers()
    this.state = {
      golden: false,
      filteredName: '',
    }
  }

  render() {
    const { hsplayers } = this.props
    let players = hsplayers.filter(p => p.name.toUpperCase().indexOf(this.state.filteredName.toUpperCase()) !== -1)
                .sort((a, b) => {
                    if(a.name > b.name) return 1
                    if(a.name < b.name) return -1
                    return 0
                  })
    if(!this.props.user) return <Spin/>
    return (
      <div>
        <GameStatusBar game="5" />
        <Divider />
        <h1>Decks des autres joueurs</h1>
        <p>Rechercher un deck par nom de joueur</p>
        <AutoComplete
          style={{ width: 200 }}
          placeholder="Pseudo de joueur"
          filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
          dataSource={hsplayers.map(player => player.name)}
          onSelect={value => this.setState({ filteredName: value })}
        />
        <Button
          icon="reload"
          onClick={e => {
            this.props.fetchHSPlayers()
          }}
        />
        <Switch defaultChecked={this.state.golden} style={{ marginLeft: '20px', marginRight: '20px' }} onChange={e => this.setState({ golden: e })} />
        <span>Cartes en dorée</span>
        <Collapse accordion>
          {players.map((user, key) => (
              <Panel header={user.name} key={key} disabled={user.decks.length === 0}>
                <Card
                  style={{
                    width: '100%'
                  }}>
                    <HsDecksCards
                      decks={user.decks}
                      golden={this.state.golden}
                    />
                </Card>
              </Panel>
            )
          )}
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hsplayers: state.hearthstone.players || [],
  user: state.user.user,
})

const mapDispatchToProps = dispatch => ({
  fetchHSPlayers: () => dispatch(fetchHSPlayers())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(HsDecks)
