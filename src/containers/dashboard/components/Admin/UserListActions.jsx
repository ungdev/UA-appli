import React from 'react'
import { Icon, Tooltip, Modal, Button, Select } from 'antd'
import { connect } from 'react-redux'
import { setAdmin, removeAdmin, validatePayment } from '../../../../modules/admin'

import './admin.css'

class UserListActions extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      paymentModalVisible: false,
      setAdminModalVisible: false,
      removeAdminModalVisible: false
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

  validatePayment = () => {
    this.props.validatePayment(this.props.userId)
    this.setState({
      paymentModalVisible: false
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

  openPaymentModal = () => {
    this.setState({
      mainModalVisible: false,
      paymentModalVisible: true
    })
  }

  closePaymentModal = () => {
    this.setState({
      mainModalVisible: true,
      paymentModalVisible: false
    })
  }

  render() {
    const { users, userId } = this.props
    const user = users.find(u => u.id === userId)

    if (!user) {
      return null
    }

    let admin = user.permissions ? (user.permissions.admin === 100) : false

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
          footer={<Button type="primary" onClick={this.closeMainModal}>Ok</Button>}
          onCancel={this.closeMainModal}
        >
          <h1 className="admin-action-username">{ `${user.name} (${user.firstname} ${user.lastname})` }</h1>
          <h2 className="admin-action-title"><Icon type="safety" /> Administrateur</h2>
          <div className="admin-action-content">
            {!admin ?
              <Tooltip placement="right" title="Rendre administrateur">
                <Button type="primary" onClick={this.openSetAdminModal} className="admin-action-button"><Icon type="arrow-up" /></Button>
              </Tooltip>
            : null}
            {admin ?
              <Tooltip placement="right" title="Enlever le rang d'administrateur">
                <Button type="danger" onClick={this.openRemoveAdminModal} className="admin-action-button" style={{ backgroundColor: '#ff0000', borderColor: '#ff0000' }}><Icon type="arrow-down" /></Button>
              </Tooltip>
            : null}
          </div>

          <h2 className="admin-action-title"><Icon type="crown" /> Responsable tournoi</h2>
          <div className="admin-action-content">
            <Select
              mode="multiple"
              placeholder="Aucun tournoi"
              notFoundContent="Aucun tournoi"
              style={{ width: '100%' }}
            >
              <Select.Option key="lol-pro">Tournoi LoL (pro)</Select.Option>
              <Select.Option key="lol-amateur">Tournoi LoL (amateur)</Select.Option>
              <Select.Option key="fortnite">Fortnite</Select.Option>
              <Select.Option key="csgo">CS:GO</Select.Option>
              <Select.Option key="hearthstone">Hearthstone</Select.Option>
              <Select.Option key="ssbu">SSBU</Select.Option>
              <Select.Option key="osu">osu!</Select.Option>
              <Select.Option key="libre">Libre</Select.Option>
            </Select>
          </div>

          {!user.paid ?
            <React.Fragment>
              <h2 className="admin-action-title"><Icon type="euro" style={{ fontSize: '17px' }} /> Paiement</h2>
              <div className="admin-action-content">
                <Tooltip placement="right" title="Valider le paiement">
                  <Button type="primary" onClick={this.openPaymentModal} className="admin-action-button"><Icon type="euro" /></Button>
                </Tooltip>
              </div>
            </React.Fragment>
          : null}
        </Modal>

        <Modal
          title="Êtes vous sûr ?"
          visible={this.state.paymentModalVisible}
          onOk={this.validatePayment}
          onCancel={this.closePaymentModal}
          cancelText="Annuler"
          okText="Ok"
        >
          <h3>Validation d'un paiement</h3>
          <p><strong>Utilisateur : {`${user.name} (${user.firstname} ${user.lastname})`}</strong></p>
          <br />
          <p>Cela validera le paiement de l'utilisateur et il recevra sa place par mail.</p>
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
          <p><strong>Utilisateur : {`${user.name} (${user.firstname} ${user.lastname})`}</strong></p>
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
          <p><strong>Utilisateur : {`${user.name} (${user.firstname} ${user.lastname})`}</strong></p>
        </Modal>
      </React.Fragment>)
  }
}

const mapDispatchToProps = dispatch => ({
  setAdmin: (id) => dispatch(setAdmin(id)),
  removeAdmin: (id) => dispatch(removeAdmin(id)),
  validatePayment: (id) => dispatch(validatePayment(id))
})


export default connect(
    null,
    mapDispatchToProps)(UserListActions)
