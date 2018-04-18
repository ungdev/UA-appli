import React from 'react';
import { withRouter } from 'react-router-dom';
import { Divider } from 'antd';
import games from '../games.json';

import GameStatusBar from './GameStatusBar/GameStatusBar';

class Tournament extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: this.props.match.params.game
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ game: nextProps.match.params.game });
  }

  render() {
    let gameId = '';
    let toornamentToDisplay = '';
    games.forEach(game => {
      if (game.id === this.state.game) {
        gameId = game.id;
      }
    });
    switch (gameId) {
      case 'lolamateur':
        toornamentToDisplay =
          'Arbre de tournoi pour League of Legends (catégorie amateur)';
        break;
      case 'lolpro':
        toornamentToDisplay =
          'Arbre de tournoi pour League of Legends (catégorie pro)';
        break;
      case 'csgo':
        toornamentToDisplay = 'Arbre de tournoi pour Overwatch';
        break;
      case 'hearthstone':
        toornamentToDisplay = 'Arbre de tournoi pour CS:GO';
        break;
      default:
        toornamentToDisplay =
          'Ce jeu ne fait pas partie de la liste des tournois';
    }
    console.log(toornamentToDisplay);
    return (
      <div>
        <GameStatusBar game={this.state.game} />
        <Divider />
        {toornamentToDisplay}
      </div>
    );
  }
}

export default withRouter(Tournament);
