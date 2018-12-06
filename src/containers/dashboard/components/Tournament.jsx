import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Divider } from 'antd'
import { fetchSpotlightStages } from '../../../modules/spotlights'

import GameStatusBar from './GameStatusBar/GameStatusBar'

/** TODO: -replace by real Toornament ID and add to DB
 *        -Use cache to limit API call  
*/
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
    if (!this.props.stages[this.props.tournament]) {
      this.props.fetchSpotlightStages(this.props.tournament);
    }
  }

  getStages() {
    const { stages, tournament } = this.props
    if (stages && stages[tournament]) {
      return stages[tournament].map((s, i) => {
        return (
          <iframe
            title="toornamentIFrame"
            src={`https://widget.toornament.com/tournaments/${s.toornamentID}/stages/${s.id}/?_locale=fr_FR&theme=`}
            key={i}
            scrolling="no"
            style={{ height: '480px', width: '100%', border: 'none' }}
            allowFullScreen
          ></iframe>
        )
      })
    }
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

const mapStateToProps = state => ({
  spotlights: state.spotlights.spotlights,
  stages: state.spotlights.stages,
  user: state.user.user,
  infos: state.infos.infos,
})

const mapDispatchToProps = dispatch => ({
  fetchSpotlightStages: (id) => dispatch(fetchSpotlightStages(id)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tournament));
