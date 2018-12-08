import React from 'react'
import { List, Divider, Collapse, Spin, Icon, Tooltip } from 'antd'
import GameStatusBar from '../GameStatusBar/GameStatusBar'
import { connect } from 'react-redux'
import { fetchTeamsBySpotlightId } from '../../../../modules/spotlights'

const Panel = Collapse.Panel;

class Teams extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchTeams(props.tournament)
  }

  render() {
    let teams = this.props.teams.filter(team => team.spotlightId === parseInt(this.props.tournament, 10))
    teams = teams.filter(team => `${team.spotlightId}` === this.props.tournament)
                  .filter(team => team.isInSpotlight)
    const spotlight = this.props.spotlights.find(s => `${s.id}` === this.props.tournament)
    if(!spotlight) return <Spin/>
    const teamsToDisplay = `Équipes pour ${spotlight.name}`
    return (
      <div>
        <GameStatusBar game={this.props.tournament} />
        <Divider />
        <h1>{teamsToDisplay}</h1>
        {teams.length > 0 ? <Collapse>
          {teams.map(team => (
            <Panel header={team.name} key={team.id}>
              <List
                itemLayout="horizontal"
                dataSource={team.users}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<div>{team.captainId === item.id ? <Tooltip title="Chef d'équipe"><Icon type="star" style={{ color: '#1890ff', marginRight: '5px' }} /></Tooltip> : ''} {item.name}</div>}
                      description={item.role ? item.role : ''}
                    />
                  </List.Item>
                )}
              />
            </Panel>
          ))}
        </Collapse> : <Spin />}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  teams: state.spotlights.teams || [],
  spotlights: state.spotlights.spotlights
})

const mapDispatchToProps = dispatch => ({
  fetchTeams: (spotlightId) => dispatch(fetchTeamsBySpotlightId(spotlightId))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(Teams)
