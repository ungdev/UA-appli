import React from 'react'
import { connect } from 'react-redux'
import { Divider, Card, Spin } from 'antd'
import moment from 'moment'
import { fetchMatches } from '../../../modules/matches'
import { fetchUser } from '../../../modules/user'

const getResultStyle = result => {
  switch (result) {
    case 'L':
      return { color: 'red' }
    case 'W':
      return { color: 'green' }
    default:
      return null
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      matches: [],
    }

    props.fetchUser()
  }

  componentDidMount() {
    this.fetchMatches()
  }

  getTeam(team) {
    const name = team.participant ? (
      <p style={{ fontWeight: team.result === 'win' ? 'bold' : null }}>{team.participant.name}</p>
    ) : (
      <p>A définir</p>
    )
    const labelResult = team.result ? team.result.toUpperCase()[0] : null
    const result = team.result ? <p style={getResultStyle(labelResult)}>{labelResult}</p> : ''

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {name} {result}
      </div>
    )
  }

  getMatches() {
    const { matches } = this.props

    if (matches.length > 0) {
      return matches.map((match, i) => (
        <Card
          title={`Match ${i + 1}`}
          key={i}
          style={{ width: 300, margin: '1rem' }}
          extra={
            match.scheduled_datetime ? moment(match.scheduled_datetime).format('DD/MM HH:mm') : ''
          }
        >
          {match.opponents.map(team => this.getTeam(team))}
          {match.private_note && (
            <React.Fragment>
              <Divider />
              Note: {match.private_note}
            </React.Fragment>
          )}
        </Card>
      ))
    }
  }

  fetchMatches() {
    const { user, matches, fetchMatches } = this.props

    if (!matches.length && user && user.team && user.team.tournament) {
      fetchMatches(user.team.tournament.toornamentID, user.team.toornamentID)
    }
  }

  render() {
    const { user } = this.props

    if (!user) {
      return <Spin />
    }

    // Get user fullname, role and place
    user.fullname = `${user.name} (${user.firstname} ${user.lastname})`
    user.role = null
    if (user.permission) {
      if (user.permission.admin) {
        user.role = 'Admin'
      } else if (user.permission.respo) {
        user.role = 'Responsable tournoi'
      } else if (user.permission.permission) {
        user.role = 'Organisateur'
      }
    }
    user.place = null
    if (user.tableLetter && user.placeNumber) {
      user.place = `${user.tableLetter}${user.placeNumber}`
    }

    return (
      <div style={{ height: '100%' }}>
        <h1>Accueil</h1>

        <Card title="Mes informations" style={{ marginBottom: '20px' }}>
          <div>
            Nom : <strong>{user.fullname}</strong>
          </div>
          {user.role ? (
            <div>
              Rôle : <strong>{user.role}</strong>
            </div>
          ) : (
            ''
          )}
          <div>
            A payé : <strong>{user.paid ? 'Oui' : 'Non'}</strong>
          </div>
          <div>
            Place :{' '}
            <strong>
              {user.place ? user.place : 'Aucune'}
              {user.plusone ? ' (Visiteur)' : ''}
            </strong>
          </div>
          {user.team && user.team.tournament ? (
            <div>
              Tournoi : <strong>{user.team.tournament.name}</strong>
            </div>
          ) : (
            ''
          )}
          {user.team && !user.team.soloTeam ? (
            <div>
              Équipe : <strong>{user.team.name}</strong>
            </div>
          ) : (
            ''
          )}
        </Card>

        <Card title="Mes matchs">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {this.getMatches() || <span style={{ color: '#888' }}>Aucun match à venir</span>}
          </div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  matches: state.matches.matches,
  user: state.user.user,
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchMatches: (tournamentId, participantId) => dispatch(fetchMatches(tournamentId, participantId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
