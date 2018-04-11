import React from 'react'
import { withRouter } from 'react-router-dom'

class Planning extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      game: this.props.match.params.game,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ game: nextProps.match.params.game });
  }

  render() {
    console.log('render Planning :', this.props, this.state)
    let game = this.state.game
    switch (game) {
      case ('lolamateur'):
        game = 'Planning pour League of Legends (catégorie amateur)'
        break
      case ('lolpro'):
        game = 'Planning pour League of Legends (catégorie pro)'
        break
      case ('overwatch'):
        game = 'Planning pour Overwatch'
        break
      case ('csgo'):
        game = 'Planning pour CS:GO'
        break
      case ('heartstone'):
        game = 'Planning pour Heartstone'
        break
      default:
        game = 'Ce jeu ne fait pas partie de la liste des tournois'
    }
    return (
      <div>{game}</div>
    )
  }
}

export default withRouter(Planning)