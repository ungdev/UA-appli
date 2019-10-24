import React from 'react';
import { Card, Popover, Steps, Spin, Button, Modal, Input } from 'antd';
import { connect } from 'react-redux';
import { setTournamentState, addState } from '../../../../modules/tournaments';
import { fetchInfos } from '../../../../modules/infos';

const { Step } = Steps;

class TournamentStatusBar extends React.Component {
  constructor(props) {
    super(props);

    props.getInfos(props.game, 0, 1);

    const tournament = props.tournaments.find((s) => `${s.id}` === props.game);

    this.state = {
      etat: tournament ? tournament.state : 0,
      info: props.infos && props.infos.length > 0 ? props.infos[0].title : '',
      modalVisible: false,
      title: '',
      description: '',
      popup: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const tournament = props.tournaments.find((s) => `${s.id}` === props.game);
    return {
      ...state,
      etat: tournament ? tournament.state : 0,
      info: props.infos && props.infos.length > 0 ? props.infos[0].title : '',
    };
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  addState() {
    const { title, description, popup } = this.state;
    this.props.addState(this.props.game, title, description, popup);
    this.setState({
      modalVisible: false,
      title: '',
      description: '',
      popup: '',
    });
  }

  customDot(dot, { index }) {
    const { game, tournaments } = this.props;
    const tournament = tournaments.find((s) => `${s.id}` === game);
    return tournament.states[index].popover !== '' ? (
      <Popover content={<span>{tournament.states[index].popover}</span>}>{dot}</Popover>
    ) : (
      dot
    );
  }

  nextState() {
    const tournament = this.props.tournaments.find((s) => `${s.id}` === this.props.game);
    let etat = this.state.etat + 1;
    etat = etat > tournament.states.length - 1 ? tournament.states.length - 1 : etat;
    this.props.setTournamentState(tournament.id, etat);
    this.setState({ etat });
  }

  previousState() {
    const tournament = this.props.tournaments.find((s) => `${s.id}` === this.props.game);
    let etat = this.state.etat - 1;
    etat = etat >= 0 ? etat : 0;
    this.props.setTournamentState(tournament.id, etat);
    this.setState({ etat });
  }

  render() {
    const { game } = this.props;
    const tournament = this.props.tournaments.find((s) => `${s.id}` === game);
    if (!tournament) return <Spin />;

    const steps =
      tournament.states && tournament.states.length !== 0 ? (
        <Steps
          current={this.state.etat}
          progressDot={this.customDot}
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {tournament.states.map((state) => (
            <Step
              title={state.title}
              description={state.desc}
              key={state.id}
              style={{ marginBottom: '10px' }}
            />
          ))}
        </Steps>
      ) : (
        <p style={{ marginBottom: 0, color: '#999' }}>(Aucun état)</p>
      );

    return (
      <div>
        <Modal
          title="Ajout d'un état"
          visible={this.state.modalVisible}
          onOk={this.addState}
          onCancel={this.closeModal}
          okText="Ok"
          cancelText="Annuler"
        >
          <Input
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
            placeholder="Titre"
            style={{ marginBottom: '5px' }}
          />
          <Input
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            placeholder="Description"
            style={{ marginBottom: '5px' }}
          />
          <Input
            value={this.state.popup}
            onChange={(e) => this.setState({ popup: e.target.value })}
            placeholder="Popup (facultatif)"
            style={{ marginBottom: '5px' }}
          />
        </Modal>
        <Card title={<h1>{tournament.name}</h1>}>{steps}</Card>
        {this.props.user &&
          this.props.user.permission &&
          ((this.props.user.permission.respo &&
            this.props.user.permission.respo.includes(this.props.game)) ||
            this.props.user.permission.admin) && (
            <div
              style={{
                marginTop: '10px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <Button type="danger" onClick={this.previousState}>
                État précédent
              </Button>
              <Button type="primary" onClick={this.openModal}>
                Ajouter un état
              </Button>
              <Button type="primary" onClick={this.nextState}>
                État suivant
              </Button>
            </div>
          )}
        {!this.props.noLastInfo ? (
          <Card style={{ marginTop: '20px' }}>Dernière info : {this.state.info}</Card>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tournaments: state.tournaments.tournaments,
  user: state.user.user,
  infos: state.infos.infos,
});

const mapDispatchToProps = (dispatch) => ({
  setTournamentState: (tournamentId, stateValue) =>
    dispatch(setTournamentState(tournamentId, stateValue)),
  getInfos: (tournament, start, end) => dispatch(fetchInfos(tournament, start, end)),
  addState: (tournamentId, title, desc, popup) =>
    dispatch(addState(tournamentId, title, desc, popup)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TournamentStatusBar);
