import React from 'react'
import { connect } from 'react-redux'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { Divider, Card } from 'antd'
import { fetchMatches } from '../../../modules/matches'

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

class Accueil extends React.Component {

  componentDidMount() {
    this.fetchMatches()
  }

  componentDidUpdate(prevProps) { 
    if (prevProps.user !== this.props.user) {
      this.fetchMatches()
    }
  }

  getMatches() {
    const { matches } = this.props
    if (matches.length > 0) {
      return matches.map((m,i) => (
        <Card title={`Match ${i+1}`} key={i} style={{ width: 300, margin: '0 1rem' }}>
          {m.opponents.map(team => getTeam(team))}
        </Card>
      ))
    }
  }

  fetchMatches() {
    const { user, matches, fetchMatches } = this.props
    if (!matches.length && user) {
      fetchMatches(user.team.spotlight.toornamentID, user.team.toornamentID)
    }
  }

  render() {
    return (
      <div style={{ height: '100%'}}>
        <h1>Accueil</h1>

        <Divider />

        <h2>Mes matchs</h2>

        <div style={{ display: 'flex' }}>
          {this.getMatches()}
        </div>

        <Divider />

        <h2>Derniers posts</h2>

        <div className="social-embed">
          <div>
            <iframe title="Facebook UTTArena" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FUTTArena&tabs=timeline&width=500&height=700&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" width="500" height="700" scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media" style={{ border: 'none', overflow: 'hidden'}}></iframe>
          </div>

          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="uttarena"
            lang="fr"
            noFooter={true}
            options={{ height: 700, width: 500 }} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  matches: state.matches.matches,
  user: state.user.user,
})

const mapDispatchToProps = dispatch => ({
  fetchMatches: (spotlightID, participantID) => dispatch(fetchMatches(spotlightID, participantID)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Accueil)
