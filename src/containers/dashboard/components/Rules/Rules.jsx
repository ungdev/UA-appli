import React from 'react';
import { withRouter } from 'react-router-dom';
import games from '../../games.json';
import { Divider } from 'antd';

import RulesLOL from './RulesLOL';
import RulesCSGO from './RulesCSGO';
import RulesHS from './RulesHS';
import GameStatusBar from '../GameStatusBar/GameStatusBar';

class Rules extends React.Component {
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
    let rulesToDisplay = '';
    games.forEach(game => {
      if (game.id === this.state.game) {
        gameId = game.id;
      }
    });
    switch (gameId) {
      case 'lolamateur':
        rulesToDisplay = <RulesLOL />;
        break;
      case 'lolpro':
        rulesToDisplay = <RulesLOL />;
        break;
      case 'csgo':
        rulesToDisplay = <RulesCSGO />;
        break;
      case 'hearthstone':
        rulesToDisplay = <RulesHS />;
        break;
      default:
        rulesToDisplay = 'Ce jeu ne fait pas partie de la liste des tournois';
    }
    console.log(rulesToDisplay);
    return (
      <div>
        <GameStatusBar game={this.state.game} />
        <Divider />
        {rulesToDisplay}
      </div>
    );
  }
}

export default withRouter(Rules);
