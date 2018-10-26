import React from 'react'
import { withRouter } from 'react-router-dom'
import { Divider } from 'antd'

import GameStatusBar from './GameStatusBar/GameStatusBar'

// TODO: replace by real Toornament ID and add to DB
// Use Toornament API to fetch the last stage

const spotlightsID = {
  1:'842778600520679424/stages/842782187443699712',
  2:'842795723920302080/stages/842797807233843200',
  3:'992461745903747072/stages/992462588816506880',
  4:'992461745903747072/stages/992462588816506880',
  5:'992461745903747072/stages/992462588816506880',
  6:'992461745903747072/stages/992462588816506880',
}
class Tournament extends React.Component {

  render() {
    const id =  spotlightsID[this.props.tournament]
    return (
      <div>
        <GameStatusBar game={this.props.tournament} />
        <Divider />
        <iframe width="100%" height="480" src={`https://widget.toornament.com/tournaments/${id}/?_locale=fr_FR&theme=`} scrolling="no" allowfullscreen>
        </iframe>
      </div>
    );
  }
}

export default withRouter(Tournament);
