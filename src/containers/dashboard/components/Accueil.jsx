import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { connect } from 'react-redux'
import { Card, Spin } from 'antd'
import { fetchUser } from '../../../modules/user'
//import qs from 'qs'

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
  constructor(props) {
    super(props)

    this.state = {
      matches: []
    }

    props.fetchUser()
  }

  componentDidMount() {
    //this.fetchMatches()
  }

  getMatches() {
    const { matches } = this.state
    if (matches.length > 0) {
      return matches.map((m,i) => (
        <Card title={`Match ${i+1}`} key={i} style={{ width: 300, margin: '0 1rem' }}>
          {m.opponents.map(team => getTeam(team))}
        </Card>
      ))
    }
  }

  async fetchMatches() {
    /** TODO: -Remplacer par ID du tournoi du user
     *        -Limiter call API via cache
    */
    // const data = await axiosToornament.get('1912315739670036480/matches',
    //   {
    //     headers: { Range: "matches=0-127"},
    //     /** TODO: Récupérer l'ID toornament du joueur ou via le nom d'équipe */
    //     params: { participant_ids: ["1912338498338021376"] },
    //     paramsSerializer: function(params) {
    //       return qs.stringify(params, { indices: false })
    //     }
    //   })
    // this.setState({ matches: data.data })
  }

  render() {
    const { user } = this.props

    if(!user) {
      return <Spin />
    }

    // Get user fullname, role and place
    user.fullname = `${user.name} (${user.firstname} ${user.lastname})`
    user.role = null
    if(user.permission) {
      if(user.permission.admin) {
        user.role = 'Admin'
      }
      else if(user.permission.respo) {
        user.role = 'Respo'
      }
    }
    user.place = null
    if(user.tableLetter && user.placeNumber) {
      user.place = `${user.tableLetter}${user.placeNumber}`
    }

    return (
      <div style={{ height: '100%'}}>
        <h1>Accueil</h1>

        <Card
          title="Vos informations"
          style={{ marginBottom: '20px' }}
        >
          <div>Nom d'utilisateur : <strong>{user.fullname}</strong></div>
          {user.role ? <div>Rôle : <strong>{user.role}</strong></div> : ''}
          <div>A payé : <strong>{user.paid ? 'Oui' : 'Non'}</strong></div>
          <div>Place : <strong>{user.place ? user.place : 'Aucune'}{user.plusone ? ' (Visiteur)' : ''}</strong></div>
          {user.team && user.team.spotlight ? <div>Tournoi : <strong>{user.team.spotlight.name}</strong></div> : ''}
          {user.team && !user.team.soloTeam ? <div>Équipe : <strong>{user.team.name}</strong></div> : ''}
        </Card>

        <Card
          title="Derniers posts"
        >
          <div className="social-embed">
            <div>
              <iframe title="Facebook UTTArena" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FUTTArena&tabs=timeline&width=500&height=700&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" width="500" height="700" scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media" style={{ border: 'none', overflow: 'hidden'}}></iframe>
            </div>

            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="uttarena"
              lang="fr"
              noFooter={true}
              options={{ height: 700, width: 500 }}
            />
          </div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accueil)
