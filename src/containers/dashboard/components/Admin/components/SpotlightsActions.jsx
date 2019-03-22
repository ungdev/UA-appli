import React from "react";
import { Button, Icon, Input, List, Modal, Table, Tooltip } from "antd";
import { connect } from "react-redux";
import { renameTeam, setCaptain } from "../../../../../modules/admin";


class SpotlightsActions extends React.Component {

  constructor(props) {
    super(props)
    const { teamId, teams, spotlightId } = props;
    const team = teams.find(t => t.id === teamId);

    this.state = {
      mainModalVisible: false,
      renameModalVisible: false,
      setCaptainModalVisible: false,
      teamName: team.name,
      captainId: team.captainId
    }
  }

  openMainModal = () => {
    this.setState({
      mainModalVisible: true
    })
  }

  closeMainModal = () => {
    this.setState({
      mainModalVisible: false
    })
  }

  openRenameModal = () => {
    if(this.isTeamNameValid())
      this.setState({
        renameModalVisible: true,
        mainModalVisible: false
      })
  }

  closeRenameModal = () => {
    this.setState({
      renameModalVisible: false,
      mainModalVisible: true
    })
  }

  openSetCaptainModal = () => {
    this.setState({
      setCaptainModalVisible: true,
      mainModalVisible: false
    })
  }

  closeSetCaptainModal = () => {
    this.setState({
      setCaptainModalVisible: false,
      mainModalVisible: true
    })
  }

  setTeamNameEntry = (teamName) => {
    this.setState({teamName})
  }

  isTeamNameValid = () => {
    const name = this.state.teamName;
    const regex = new RegExp(/^[A-zÀ-ÿ0-9 '#@!&\-$%]{3,}$/i);

    return regex.test(name);
  }

  renameTeam = () => {
    this.props.renameTeam(this.props.teamId, this.props.spotlightId, this.state.teamName)

    this.setState({
      renameModalVisible: false
    })
  }

  setCaptain = () => {
    this.props.setCaptain(this.props.teamId, this.props.spotlightId, this.state.captainId);

    this.setState({
      setCaptainModalVisible: false
    });
  }

  render () {

    const { teamId, teams } = this.props;
    const team = teams.find(t => t.id === teamId);

    let users = team.users.map( user => {
      return {
        id: user.id,
        teamId: team.id,
        spotlightId: this.props.spotlightId,
        name: user.name,
        isCaptain: user.id === team.captainId
      }}
    )
      .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0) // Sort alphabetically
      .sort((a, b) => a.id === team.captainId ? -1 : b.id === team.captainId ? 1 : 0)

    return (
      <React.Fragment>
        <Tooltip placement="top" title="Actions">
          <a onClick={this.openMainModal} style={{ fontSize: '18px' }}>
            <Icon type="setting" />
          </a>
        </Tooltip>

        <Modal
          title="Actions"
          visible={this.state.mainModalVisible}
          footer={
            <Button type="primary" onClick={this.closeMainModal}>Ok</Button>
          }
          onCancel={this.closeMainModal}
        >
          <h1>{team.name.name}</h1>
          <h2 className="admin-action-title">
            <Icon type="edit" /> Nom de l'équipe
          </h2>
          <div className="admin-action-content">
            <Input placeholder="Nom de l'équipe"
                   onChange={(e) => this.setTeamNameEntry(e.target.value)}
                   style={!this.isTeamNameValid() ? {borderColor: '#C00'} : undefined}
                   className="rename-input"
                   value={this.state.teamName}/>
            <Tooltip placement="right" title="Renommer l'équipe">
              <Button
                type="primary"
                onClick={this.openRenameModal}
                className="admin-action-button"
              >
                <Icon type="save" />
              </Button>
            </Tooltip>
            <List
              style={{marginTop: 20}}
              size="small"
              header={<div style={{fontWeight: 'bold'}}>Membres de l'équipe</div>}
              dataSource={users}
              renderItem={user  => (
                <List.Item>
                  <List.Item.Meta title={<div>{user.isCaptain ? <Tooltip title="Chef d'équipe"><Icon type="star" style={{ color: '#1890ff', marginRight: '5px' }} /></Tooltip> : ''} {user.name}</div>}/>
                  {!user.isCaptain ?
                  <Tooltip placement="left" title="Rendre chef d'équipe">
                    <Button
                      type="primary"
                      onClick={() => {this.state.captainId = user.id; return this.openSetCaptainModal()}}
                      className="admin-action-button">
                      <Icon type="arrow-up" />
                    </Button>
                  </Tooltip> : ''}
                </List.Item>
              )}
              bordered
            />

          </div>

        </Modal>

        <Modal
          title="Êtes vous sûr ?"
          visible={this.state.renameModalVisible}
          onOk={this.renameTeam}
          onCancel={this.closeRenameModal}
          cancelText="Annuler"
          okText="Ok"
        >
          <h3>Renommer l'équipe</h3>
          <p>
            <i>Ancien:</i><br/>
            <strong>
              Équipe : {team.name}
            </strong>
          </p>
          <p>
            <i>Nouveau:</i><br/>
            <strong>
              Équipe : {this.state.teamName}
            </strong>
          </p>
        </Modal>

        <Modal
          title="Êtes vous sûr ?"
          visible={this.state.setCaptainModalVisible}
          onOk={this.setCaptain}
          onCancel={this.closeSetCaptainModal}
          cancelText="Annuler"
          okText="Ok"
        >
          <h3>Changer de capitaine de l'équipe {team.name}</h3>
          <p>
            <i>Ancien capitaine</i><br/>
            <strong>{team.users.find(u => u.id === team.captainId).name}</strong>
          </p>
          <p>
            <i>Nouveau capitaine</i><br/>
            <strong>{team.users.find(u => u.id === this.state.captainId).name}</strong>
          </p>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  renameTeam: (teamId, spotlightId, teamName) => dispatch(renameTeam(teamId, spotlightId, teamName)),
  setCaptain: (teamId, spotlightId, captainId) => dispatch(setCaptain(teamId, spotlightId, captainId))
})

export default connect(
  null,
  mapDispatchToProps
)(SpotlightsActions)