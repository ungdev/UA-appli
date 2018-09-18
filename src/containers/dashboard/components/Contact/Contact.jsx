import React from 'react';
import { withRouter } from 'react-router-dom';
import games from '../../games.json';
import GameStatusBar from '../GameStatusBar/GameStatusBar';
import { Divider } from 'antd';

class Contact extends React.Component {
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
    let contactToDisplay = '';
    games.forEach(game => {
      if (game.id === this.state.game) {
        gameId = game.id;
      }
    });
    switch (gameId) {
      case 'lolamateur':
        contactToDisplay = 'Contact Lol';
        break;
      case 'lolpro':
        contactToDisplay = 'Contact Lol Pro';
        break;
      case 'csgo':
        contactToDisplay = 'Contact CSGO';
        break;
      case 'hearthstone':
        contactToDisplay = 'Contact HS';
        break;
      default:
    }
    console.log(contactToDisplay);
    return (
      <div>
        <GameStatusBar game={this.state.game} />
        <Divider />
        {contactToDisplay}
      </div>
    );
  }
}

export default withRouter(Contact);
