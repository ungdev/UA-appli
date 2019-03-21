import React from "react";
import { Button, Icon, Input, Modal, Tooltip } from "antd";
import { connect } from "react-redux";
import { fetchAdminSpotlight, renameTeam, renameUser } from "../../../../../modules/admin";


class SpotlightsActions extends React.Component {

  constructor(props) {
    super(props)

    const { teamId, teams } = props;
    this.team = teams.find(t => t.id === teamId);


    this.state = {
      mainModalVisible: false,
      renameModalVisible: false,
      newName: this.team.name.name
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

  setNameEntry = (newName) => {
    this.setState({
      newName
    })
  }

  isNewNameValid = () => {
    const name = this.state.newName;
    const regex = new RegExp(/^[A-zÀ-ÿ0-9 '#@!&\-$%]{3,}$/i);

    return regex.test(name);
  }

  openRenameModal = () => {
    if(this.isNewNameValid())
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

  renameTeam = () => {
    this.props.renameTeam(this.props.teamId, this.props.spotlightId, this.state.newName)

    this.setState({
      renameModalVisible: false
    })
  }

  render () {
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
          <h1>{this.team.name.name}</h1>
          <h2 className="admin-action-title">
            <Icon type="edit" /> Nom de l'équipe
          </h2>
          <div className="admin-action-content">
            <Input placeholder="Nom de l'équipe"
                   onChange={(e) => this.setNameEntry(e.target.value)}
                   style={!this.isNewNameValid() ? {borderColor: '#C00'} : undefined}
                   className="rename-input"
                   value={this.state.newName}/>
            <Tooltip placement="right" title="Renommer l'équipe">
              <Button
                type="primary"
                onClick={this.openRenameModal}
                className="admin-action-button"
              >
                <Icon type="save" />
              </Button>
            </Tooltip>
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
              Équipe : {this.team.name.name}
            </strong>
          </p>
          <p>
            <i>Nouveau:</i><br/>
            <strong>
              Équipe : {this.state.newName}
            </strong>
          </p>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  renameTeam: (teamId, spotlightId, newName) => dispatch(renameTeam(teamId, spotlightId, newName))
})

export default connect(
  null,
  mapDispatchToProps
)(SpotlightsActions)