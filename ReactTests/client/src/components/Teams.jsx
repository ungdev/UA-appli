import React from 'react'
import { withRouter } from 'react-router-dom'
import { List, Divider } from 'antd'


class Teams extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      game: this.props.match.params.game,
    }
  }


  componentWillReceiveProps(nextProps) {
    this.setState({ game: nextProps.match.params.game })
  }

  render() {
    // to import with game filter through back end
    const teams = [
      {
        team: 'Les Casseurs de Fion',
        members: [
          { nom: 'Exterminator', role: 'Entraîneur' },
          { nom: 'Middleator', role: 'Tank' },
          { nom: 'Jungleator', role: 'Jungle' },
          { nom: 'ADCator', role: 'ADC' },
          { nom: 'Supportator', role: 'Support' },
          { nom: 'Topator', role: 'Top' }
        ]
      },
      {
        team: 'Les Mangecacas',
        members: [
          { nom: 'Entrainecaca', role: 'Entraîneur' },
          { nom: 'Middlecaca', role: 'Tank' },
          { nom: 'Junglecaca', role: 'Jungle' },
          { nom: 'ADCcaca', role: 'ADC' },
          { nom: 'Supportcaca', role: 'Support' },
          { nom: 'Topcaca', role: 'Top' }
        ]
      },
    ]
    console.log('render Teams :', teams)
    let game = this.state.game
    switch (game) {
      case ('lolamateur'):
        game = 'Equipes pour League of Legends (catégorie amateur)'
        break
      case ('lolpro'):
        game = 'Equipes pour League of Legends (catégorie pro)'
        break
      case ('overwatch'):
        game = 'Equipes pour Overwatch'
        break
      case ('csgo'):
        game = 'Equipes pour CS:GO'
        break
      case ('heartstone'):
        game = 'Equipes pour Heartstone'
        break
      default:
        game = 'Ce jeu ne fait pas partie de la liste des tournois'
    }
    return (
      <div>
        <h1>{game}</h1>

        {teams.map((team) => (
          <div>
            <h2>{team.team}</h2>
            <List
              itemLayout="horizontal"
              dataSource={team.members}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<div>{item.nom}</div>}
                    description={item.role}
                  />
                </List.Item>
              )}
            />
            <Divider />
          </div>
        )

        )}
      </div>
    )
  }
}

export default withRouter(Teams)