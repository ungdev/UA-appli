import React from 'react'
import { Icon, Tooltip, Modal, Button, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { setAdmin, removeAdmin, setPermission, setRespo } from '../../../../../modules/admin'
import Respo from './Respo'

import '../admin.css'

const CheckboxGroup = Checkbox.Group

class UserListActions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      setAdminModalVisible: false,
      removeAdminModalVisible: false,
      permissionModalVisible: false,
      respoModalVisible: false,
      checkedPermission: [],
      checkedRespo: []
    }
  }

  setAdmin = () => {
    this.props.setAdmin(this.props.userId)
    this.setState({
      setAdminModalVisible: false
    })
  }

  removeAdmin = () => {
    this.props.removeAdmin(this.props.userId)
    this.setState({
      removeAdminModalVisible: false
    })
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

  openSetAdminModal = () => {
    this.setState({
      mainModalVisible: false,
      setAdminModalVisible: true
    })
  }

  closeSetAdminModal = () => {
    this.setState({
      mainModalVisible: true,
      setAdminModalVisible: false
    })
  }

  openRemoveAdminModal = () => {
    this.setState({
      mainModalVisible: false,
      removeAdminModalVisible: true
    })
  }

  closeRemoveAdminModal = () => {
    this.setState({
      mainModalVisible: true,
      removeAdminModalVisible: false
    })
  }

  openPermissionModal = () => {
    this.setState({
      permissionModalVisible: true,
      mainModalVisible: false
    })
  }

  closePermissionModal = () => {
    this.setState({
      permissionModalVisible: false,
      mainModalVisible: true
    })
  }

  openRespoModal = () => {
    this.setState({
      respoModalVisible: true,
      mainModalVisible: false
    })
  }

  closeRespoModal = () => {
    this.setState({
      respoModalVisible: false,
      mainModalVisible: true
    })
  }

  setPermission = () => {
    this.props.setPermission(this.props.userId, this.state.checkedPermission)
    
    this.setState({
      permissionModalVisible: false
    })
  }

  setRespo = () => {
    this.props.setRespo(this.props.userId, this.state.checkedRespo)
    
    this.setState({
      respoModalVisible: false
    })
  }

  setCheckedPermission = (checked) => {
    this.setState({
      checkedPermission: checked
    })
  }

  setCheckedRespo = (checked) => {
    this.setState({
      checkedRespo: checked
    })
  }

  render() {
    const { users, userId } = this.props
    const user = users.find(u => u.id === userId)

    if (!user) {
      return null
    }

    let userIsAdmin = user.permission && user.permission.admin

    let userPermission = []
    if (user.permission && user.permission.permission) {
      const permissions = user.permission.permission.split(',')
      
      permissions.forEach(permission => {
        userPermission.push(permission)
      })
    }

    let userRespo = []
    if (user.permission && user.permission.respo) {
      const respo = user.permission.respo.split(',')
      
      respo.forEach(respo => {
        userRespo.push(respo)
      })
    }

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
          <h1 className="admin-action-username">
            {`${user.name} (${user.firstname} ${user.lastname})`}
          </h1>
          
          <h2 className="admin-action-title">
            <Icon type="crown" /> Administrateur
          </h2>
          <div className="admin-action-content">
            {!userIsAdmin ? (
              <Tooltip placement="right" title="Rendre administrateur">
                <Button
                  type="primary"
                  onClick={this.openSetAdminModal}
                  className="admin-action-button"
                >
                  <Icon type="arrow-up" />
                </Button>
              </Tooltip>
            ) : (
              <React.Fragment>
                <Tooltip
                  placement="right"
                  title="Enlever le rang d'administrateur"
                >
                  <Button
                    type="danger"
                    onClick={this.openRemoveAdminModal}
                    className="admin-action-button"
                    style={{ backgroundColor: '#ff0000', borderColor: '#ff0000' }}
                  >
                    <Icon type="arrow-down" />
                  </Button>
                </Tooltip>
                <p style={{ marginTop: '10px' }}>
                  L'utilisateur étant administrateur, toutes les permissions lui sont accordées.
                </p>
              </React.Fragment>
            )}
          </div>

          {!userIsAdmin &&
            <React.Fragment>
              <h2 className="admin-action-title">
                <Icon type="tool" /> Permissions
              </h2>
              <div className="admin-action-content">
                <CheckboxGroup onChange={this.setCheckedPermission} defaultValue={userPermission}>
                  <Checkbox value="validate">Valider l'entrée</Checkbox><br />
                  <Checkbox value="payment">Valider les paiements</Checkbox>
                </CheckboxGroup>
                <br />
                <Tooltip placement="right" title="Modifier les permissions">
                  <Button
                    type="primary"
                    onClick={this.openPermissionModal}
                    className="admin-action-button"
                    style={{ marginTop: '10px' }}
                  >
                    <Icon type="save" />
                  </Button>
                </Tooltip>
              </div>

              <h2 className="admin-action-title">
                <Icon type="safety" /> Responsable
              </h2>
              <div className="admin-action-content">
                <Respo defaultCheckedRespo={userRespo} checkedRespo={(checked) => this.setCheckedRespo(checked)} />
                <br />
                <Tooltip placement="right" title="Modifier les permissions de tournoi">
                  <Button
                    type="primary"
                    onClick={this.openRespoModal}
                    className="admin-action-button"
                    style={{ marginTop: '10px' }}
                  >
                    <Icon type="save" />
                  </Button>
                </Tooltip>
              </div>
            </React.Fragment>
          }
        </Modal>

        <Modal
          title="Êtes vous sûr ?"
          visible={this.state.setAdminModalVisible}
          onOk={this.setAdmin}
          onCancel={this.closeSetAdminModal}
          cancelText="Annuler"
          okText="Ok"
        >
          <h3>Rendre administrateur</h3>
          <p>
            <strong>
              Utilisateur : {`${user.name} (${user.firstname} ${user.lastname})`}
            </strong>
          </p>
        </Modal>

        <Modal
          title="Êtes vous sûr ?"
          visible={this.state.removeAdminModalVisible}
          onOk={this.removeAdmin}
          onCancel={this.closeRemoveAdminModal}
          cancelText="Annuler"
          okText="Ok"
        >
          <h3>Enlever le rang d'administrateur</h3>
          <p>
            <strong>
              Utilisateur : {`${user.name} (${user.firstname} ${user.lastname})`}
            </strong>
          </p>
        </Modal>

        <Modal
          title="Êtes vous sûr ?"
          visible={this.state.permissionModalVisible}
          onOk={this.setPermission}
          onCancel={this.closePermissionModal}
          cancelText="Annuler"
          okText="Ok"
        >
          <h3>Modifier les permissions</h3>
          <p>
            <strong>
              Utilisateur : {`${user.name} (${user.firstname} ${user.lastname})`}
            </strong>
          </p>
        </Modal>

        <Modal
          title="Êtes vous sûr ?"
          visible={this.state.respoModalVisible}
          onOk={this.setRespo}
          onCancel={this.closeRespoModal}
          cancelText="Annuler"
          okText="Ok"
        >
          <h3>Modifier les permissions de tournoi</h3>
          <p>
            <strong>
              Utilisateur : {`${user.name} (${user.firstname} ${user.lastname})`}
            </strong>
          </p>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setAdmin: id => dispatch(setAdmin(id)),
  removeAdmin: id => dispatch(removeAdmin(id)),
  setPermission: (id, permission) => dispatch(setPermission(id, permission)),
  setRespo: (id, respo) => dispatch(setRespo(id, respo))
})

export default connect(
  null,
  mapDispatchToProps
)(UserListActions)
