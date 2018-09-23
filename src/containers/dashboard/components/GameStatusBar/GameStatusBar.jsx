import React from 'react'
import { Card, Icon, Steps, Spin } from 'antd'
import { connect } from 'react-redux'

const Step = Steps.Step;

class TournamentStatusBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      etat: 1
    };
  }

  render() {
    const spotlight = this.props.spotlights.find(s => s.id == this.props.game)
    if(!spotlight) return <Spin/>
    return (
      <div>
        <Card title={<h1>{spotlight.name}</h1>}>
          <Steps current={this.state.etat}>
            <Step
              title="Non commencé"
              description="Début du tournois le 08/12 à 10h"
              icon={<Icon type="hourglass" />}
            />
            <Step
              title="En cours"
              description="Phase de :"
              icon={<Icon type="rocket" />}
            />
            <Step
              title="Terminé"
              description="Remise des prix le.. à "
              icon={<Icon type="trophy" />}
            />
          </Steps>
        </Card>
        <Card>Dernière info :</Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spotlights: state.spotlights.spotlights
})

export default connect(mapStateToProps, null)(TournamentStatusBar)
