import React from 'react'
import { List, Divider, Collapse, Spin, Icon } from 'antd'
import GameStatusBar from '../GameStatusBar/GameStatusBar'
import { connect } from 'react-redux'
import { fetchTeams } from '../../../../modules/teams'

const Panel = Collapse.Panel;

class Teams extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchTeams(props.tournament)
  }

  render() {
    let { teams } = this.props
    if (!teams) return <Spin/>
    teams = teams.filter(team => `${team.spotlightId}` === this.props.tournament)
                  .filter(team => team.isInSpotlight)
    const spotlight = this.props.spotlights.find(s => `${s.id}` === this.props.tournament)
    if(!spotlight) return <Spin/>
    const teamsToDisplay = `Equipes pour ${spotlight.name}`
    return (
      <div>
        <GameStatusBar game={this.props.tournament} />
        <Divider />
        <h1>{teamsToDisplay}</h1>
        <Collapse>
          {teams.map(team => (
            <Panel header={team.name} key={team.id}>
              <List
                itemLayout="horizontal"
                dataSource={team.users}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<div>{team.captainId === item.id ? <Icon type='star'/> : ''} {item.name}</div>}
                      description={item.role ? item.role : ''}
                    />
                  </List.Item>
                )}
              />
            </Panel>
          ))}
        </Collapse>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  teams: state.teams.teams || [],
  spotlights: state.spotlights.spotlights
})

const mapDispatchToProps = dispatch => ({
  fetchTeams: () => dispatch(fetchTeams())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(Teams)
