import React from 'react'
import { withRouter } from 'react-router-dom'
import { Divider } from 'antd'

import RulesLOL from './RulesLOL'
import RulesCSGO from './RulesCSGO'
import RulesHS from './RulesHS'
import GameStatusBar from '../GameStatusBar/GameStatusBar'

class Rules extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let rulesToDisplay = ''
    switch (this.props.tournament) {
      case '1':
        rulesToDisplay = <RulesLOL />
        break;
      case '6':
        rulesToDisplay = <RulesLOL />
        break;
      case '5':
        rulesToDisplay = <RulesCSGO />
        break;
      case '2':
        rulesToDisplay = <RulesHS />
        break;
      default:
        rulesToDisplay = 'Ce jeu ne fait pas partie de la liste des tournois';
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
