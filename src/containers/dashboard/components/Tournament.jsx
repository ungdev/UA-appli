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
    let toornamentToDisplay = ''
    switch (this.props.tournament) {
      case '1':
        toornamentToDisplay = 'lol pro'
        break;
      case '6':
        toornamentToDisplay = 'lol amateur'
        break;
      case '5':
        toornamentToDisplay = 'csgo'
        break;
      case '2':
        toornamentToDisplay = 'hs'
        break;
      default:
        toornamentToDisplay = 'Ce jeu ne fait pas partie de la liste des tournois';
    }
    return (
      <div>
        <GameStatusBar game={this.props.tournament} />
        <Divider />
        {toornamentToDisplay}
      </div>
    );
  }
}

export default withRouter(Tournament);
