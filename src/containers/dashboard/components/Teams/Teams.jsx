import React from 'react'
import { List, Divider, Collapse, Spin, Icon, Tooltip } from 'antd'
import { connect } from 'react-redux'
import GameStatusBar from '../GameStatusBar/GameStatusBar'
import { fetchTeamsByTournamentId } from '../../../../modules/tournaments'

const { Panel } = Collapse

class Teams extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchTeams(props.tournament)
  }

  render() {
    let teams = this.props.teams.filter(
      team => team.tournamentId === parseInt(this.props.tournament, 10)
    )
    teams = teams
      .filter(team => `${team.tournamentId}` === this.props.tournament)
      .filter(team => team.isInTournament)
    const tournament = this.props.tournaments.find(s => `${s.id}` === this.props.tournament)
    if (!tournament) return <Spin />
    const teamsToDisplay = `Équipes pour ${tournament.name}`
    return (
      <div>
        <GameStatusBar game={this.props.tournament} />
        <Divider />
        <h1>{teamsToDisplay}</h1>
        {teams.length > 0 ? (
          <Collapse>
            {teams.map(team => (
              <Panel header={team.name} key={team.id}>
                <List
                  itemLayout="horizontal"
                  dataSource={team.users}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <div>
                            {team.captainId === item.id ? (
                              <Tooltip title="Chef d'équipe">
                                <Icon
                                  type="star"
                                  style={{ color: '#1890ff', marginRight: '5px' }}
                                />
                              </Tooltip>
                            ) : (
                              ''
                            )}{' '}
                            {item.username}
                          </div>
                        }
                        description={item.role ? item.role : ''}
                      />
                    </List.Item>
                  )}
                />
              </Panel>
            ))}
          </Collapse>
        ) : (
          <Spin />
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  teams: state.tournaments.teams || [],
  tournaments: state.tournaments.tournaments,
})

const mapDispatchToProps = dispatch => ({
  fetchTeams: tournamentId => dispatch(fetchTeamsByTournamentId(tournamentId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teams)
