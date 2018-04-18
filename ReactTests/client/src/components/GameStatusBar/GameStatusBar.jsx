import React from 'react';
import { Card, Icon, Steps } from 'antd';

const Step = Steps.Step;

class TournamentStatusBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      etat: 1
    };
  }

  render() {
    return (
      <div>
        <Card title={<h1>{this.props.game}</h1>}>
          <Steps current={this.state.etat}>
            <Step
              title="Non commencé"
              description="Début du tournois le .. à .."
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

export default TournamentStatusBar;
