import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Divider, Card } from 'antd'
import { fetchSpotlightStages, fetchSpotlightMatches } from '../../../modules/spotlights'
import moment from 'moment';
import GameStatusBar from './GameStatusBar/GameStatusBar'

/** TODO: -replace by real Toornament ID and add to DB
 *        -Use cache to limit API call  
*/
const colorResult = (result) => {
  switch (result) {
    case "L":
      return { color: "red" }
    case "W":
      return { color: "green" }
    default:
      return
  }
}

const getTeam = (team) => {
  const labelResult = team.result ? team.result.toUpperCase()[0] : null
  const name = team.participant ?
    <p style={{ fontWeight: team.result === 'win' ? 'bold' : null }}>{team.participant.name}</p>
    : <p>A définir</p>
  const result = team.result ? <p style={colorResult(labelResult)}>{labelResult}</p> : ""

  return <div style={{ display: 'flex', justifyContent: 'space-between' }}>{name} {result}</div>
}

class Tournament extends React.Component {

  componentDidMount() {
    this.fetchStages()
  }

  componentDidUpdate(prevProps) { 
    if (prevProps.tournament !== this.props.tournament) {
      this.fetchStages()
    }
  }

  async fetchStages() {
    if (!this.props.stages[this.props.tournament]) {
      this.props.fetchSpotlightStages(this.props.tournament);
    }
    if (!this.props.matches[this.props.tournament]) {
      this.props.fetchSpotlightMatches(this.props.tournament);
    }
  }

  getStages() {
    const { stages, tournament } = this.props
    if (stages && stages[tournament]) {
      return stages[tournament].map((s, i) => {
        return (
          <iframe
            title="toornamentIFrame"
            src={`https://widget.toornament.com/tournaments/${s.toornamentID}/stages/${s.id}/?_locale=fr_FR&theme=`}
            key={i}
            scrolling="no"
            style={{ height: '480px', width: '100%', border: 'none' }}
            allowFullScreen
          ></iframe>
        )
      })
    }
  }

  getMatches() {
    const { matches, tournament } = this.props
    if (matches && matches[tournament]) {
      return matches[tournament].map((m,i) => (
        <Card
        title={`Match ${i+1}`}
        key={i}
        style={{ width: 300, margin: '1rem' }}
        extra={m.scheduled_datetime ? moment(m.scheduled_datetime).format('DD/MM HH:mm') : ''}>
          {m.opponents.map(team => getTeam(team))}
          {m.private_note && (
            <React.Fragment>
              <Divider />
              Note: {m.private_note}
            </React.Fragment>
          )}
        </Card>
      ))
    }
  }

  render() {
    return (
      <div>
        <GameStatusBar game={this.props.tournament} />
        <Divider />
        {this.getStages()}
        <Divider />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {this.getMatches()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spotlights: state.spotlights.spotlights,
  stages: state.spotlights.stages,
  user: state.user.user,
  infos: state.infos.infos,
  matches: state.spotlights.matches
})

const mapDispatchToProps = dispatch => ({
  fetchSpotlightStages: (id) => dispatch(fetchSpotlightStages(id)),
  fetchSpotlightMatches: (id) => dispatch(fetchSpotlightMatches(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tournament));
