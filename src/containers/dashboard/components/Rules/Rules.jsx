import React from 'react'
import { withRouter } from 'react-router-dom'
import { Divider } from 'antd'

import RulesLOL from './RulesLOL'
import RulesCSGO from './RulesCSGO'
import RulesHS from './RulesHS'
import RulesFortnite from './RulesFortnite'
import RulesSSBU from './RulesSSBU'
import GameStatusBar from '../GameStatusBar/GameStatusBar'

class Rules extends React.Component {

  render() {
    let rulesToDisplay = ''
    switch (this.props.tournament) {
      case '1':
        rulesToDisplay = <RulesLOL />
        break
      case '2':
        rulesToDisplay = <RulesLOL />
        break
      case '3':
        rulesToDisplay = <RulesFortnite />
        break;
      case '4':
        rulesToDisplay = <RulesCSGO />
        break
      case '5':
        rulesToDisplay = <RulesHS />
        break
      case '6':
        rulesToDisplay = <RulesSSBU />
        break
      default:
        rulesToDisplay = 'Ce jeu n\'a pas de règlement.'
    }
    return (
      <div>
        <GameStatusBar game={this.props.tournament} />
        <Divider />
        {rulesToDisplay}
      </div>
    );
  }
}

export default withRouter(Rules)
