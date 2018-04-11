import React from 'react'
import { withRouter } from 'react-router-dom'

class Rules extends React.Component {
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
    console.log('render Rules :', this.props, this.state)
    let game = this.state.game
    switch (game) {
      case ('lolamateur'):
        game = 'Réglement du tournoi League of Legends (catégorie amateur)'
        break
      case ('lolpro'):
        game = 'Réglement du tournoi League of Legends (catégorie pro)'
        break
      case ('overwatch'):
        game = 'Réglement du tournoi Overwatch'
        break
      case ('csgo'):
        game = 'Réglement du tournoi CS:GO'
        break
      case ('heartstone'):
        game = 'Réglement du tournoi Heartstone'
        break
      default:
        game = 'Ce jeu ne fait pas partie de la liste des tournois'
    }
    return (
      <div>{game}</div>
    )
  }
}

export default withRouter(Rules)