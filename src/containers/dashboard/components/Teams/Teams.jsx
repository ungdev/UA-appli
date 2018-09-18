import React from 'react';
import { withRouter } from 'react-router-dom';
import { List, Divider, Collapse } from 'antd';
import games from '../../games.json';
import GameStatusBar from '../GameStatusBar/GameStatusBar';

const Panel = Collapse.Panel;

class Teams extends React.Component {
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
      }
    ];
    let gameId = '';
    let teamsToDisplay = '';
    games.forEach(game => {
      if (game.id === this.state.game) {
        gameId = game.id;
      }
    });
    switch (gameId) {
      case 'lolamateur':
        teamsToDisplay = 'Equipes pour League of Legends (catégorie amateur)';
        break;
      case 'lolpro':
        teamsToDisplay = 'Equipes pour League of Legends (catégorie pro)';
        break;
      case 'csgo':
        teamsToDisplay = 'Equipes pour CS:GO';
        break;
      case 'hearthstone':
        teamsToDisplay = 'Equipes pour Heartstone';
        break;
      default:
        teamsToDisplay = 'Ce jeu ne fait pas partie de la liste des tournois';
    }
    console.log(teamsToDisplay);
    return (
      <div>
        <GameStatusBar game={this.state.game} />
        <Divider />
        <h1>{teamsToDisplay}</h1>
        <Collapse accordion>
          {teams.map(team => (
            <Panel header={team.team} key={team.team}>
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
            </Panel>
          ))}
        </Collapse>
      </div>
    );
  }
}

export default withRouter(Teams);
