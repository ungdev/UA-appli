import React from 'react'
import { withRouter } from 'react-router-dom'
import { Divider } from 'antd'
import axiosToornament from '../../../lib/axiosToornament'

import GameStatusBar from './GameStatusBar/GameStatusBar'

/** TODO: -replace by real Toornament ID and add to DB
 *        -Use cache to limit API call  
*/

const spotlightsID = {
  1:'842778600520679424',
  2:'842795723920302080',
  3:'1912315739670036480',
  4:'992461745903747072',
  5:'992461745903747072',
  6:'992461745903747072',
}
class Tournament extends React.Component {

  state = { stages: [] }

  componentDidMount() {
    this.fetchStages()
  }

  componentDidUpdate(prevProps) { 
    if (prevProps.tournament !== this.props.tournament) {
      this.fetchStages()
    }
  }

  async fetchStages() {
    const id =  spotlightsID[this.props.tournament]
    const stages = await axiosToornament.get(`${id}/stages`)
    console.log(stages)
    this.setState({stages: stages.data, id})
  }

  getStages() {
    const { stages, id } = this.state
    if (stages.length) return stages.map((s,i) => 
      <iframe key={i} width="100%" height="480" src={`https://widget.toornament.com/tournaments/${id}/stages/${s.id}/?_locale=fr_FR&theme=`} scrolling="no" allowFullScreen></iframe>
    )
  }

  render() {
    return (
      <div>
        <GameStatusBar game={this.props.tournament} />
        <Divider />
        {this.getStages()}
      </div>
    );
  }
}

export default withRouter(Tournament);
