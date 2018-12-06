import React from 'react'
import { List, Divider, Spin } from 'antd'
import GameStatusBar from '../GameStatusBar/GameStatusBar'
import { connect } from 'react-redux'
import { fetchTeamsBySpotlightId } from '../../../../modules/spotlights'

class Players extends React.Component {
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
    const teamsToDisplay = `Joueurs pour ${spotlight.name}`
    return (
      <div>
        <GameStatusBar game={this.props.tournament} />
        <Divider />
        <h1>{teamsToDisplay}</h1>
        {teams.length > 0 ? 
          <List
            bordered
            dataSource={teams}
            renderItem={item => (<List.Item>{item.name.substring(0, item.name.length - 10)}</List.Item>)}
          /> : 
          <Spin />
        }
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
    mapDispatchToProps)(Players)
