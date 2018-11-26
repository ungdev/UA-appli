import React from 'react'
import { Icon, Tooltip, Modal, Button, Select } from 'antd'
import { connect } from 'react-redux'
import {
  setAdmin,
  removeAdmin,
  validatePayment
} from '../../../../../modules/admin'
import { setRespo, removeRespo } from '../../../../../modules/respo'

import '../admin.css'

class UserListActions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      paymentModalVisible: false,
      setAdminModalVisible: false,
      removeAdminModalVisible: false,
      setRespoModalVisible: false,
      removeRespoModalVisible: false,
      tournamentsSelected: ''
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

  onTournamentSelected = value => {
    console.log(value)
    this.setState({ tournamentsSelected: value })
  }

  openSetRespoModal = () => {
    this.setState({
      setRespoModalVisible: true,
      mainModalVisible: false
    })
  }

  closeSetRespoModal = () => {
    this.setState({
      setRespoModalVisible: false,
      mainModalVisible: true
    })
  }

  setRespo = () => {
    this.props.setRespo(this.props.userId, this.state.tournamentsSelected)
    this.setState({
      setRespoModalVisible: false
    })
  }

  render() {
    const { users, userId } = this.props
    const user = users.find(u => u.id === userId)

    if (!user) {
      return null
    }

    let userIsAdmin = user.permission && user.permission.admin
    let userRespo = []

    if (user.permission && user.permission.respo != null) {
      const respos = user.permission.respo.split(',')
      respos.forEach(respo => {
        userRespo.push(respo)
      })
      console.log(userRespo)
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
            <Button type="primary" onClick={this.closeMainModal}>
              Ok
            </Button>
          }
          onCancel={this.closeMainModal}
        >
          <h1 className="admin-action-username">{`${user.name} (${
            user.firstname
          } ${user.lastname})`}</h1>
          <h2 className="admin-action-title">
            <Icon type="safety" /> Administrateur
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
            )}
          </div>

          <h2 className="admin-action-title">
            <Icon type="crown" /> Responsable tournoi
          </h2>
          <div className="admin-action-content">
            <Select
              mode="multiple"
              placeholder="Aucun Tournoi"
              notFoundContent="Aucun tournoi"
              defaultValue={userRespo !== [] ? userRespo : null}
              style={{ width: '100%' }}
              onChange={this.onTournamentSelected}
            >
              {this.props.spotlights.map(spotlight => {
                return (
                  <Select.Option key={spotlight.shortName}>
                    Tournoi {spotlight.shortName}
                  </Select.Option>
                )
              })}
            </Select>
            <Button type="primary" onClick={this.openSetRespoModal}>
              <Icon type="arrow-up" />
            </Button>
          </div>

          {!user.paid ? (
            <React.Fragment>
              <h2 className="admin-action-title">
                <Icon type="euro" style={{ fontSize: '17px' }} /> Paiement
              </h2>
              <div className="admin-action-content">
                <Tooltip placement="right" title="Valider le paiement">
                  <Button
                    type="primary"
                    onClick={this.openPaymentModal}
                    className="admin-action-button"
                  >
                    <Icon type="euro" />
                  </Button>
                </Tooltip>
              </div>
            </React.Fragment>
          ) : null}
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
          <p>
            <strong>
              Utilisateur :{' '}
              {`${user.name} (${user.firstname} ${user.lastname})`}
            </strong>
          </p>
          <br />
          <p>
            Cela validera le paiement de l'utilisateur et il recevra sa place
            par mail.
          </p>
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
              Utilisateur :{' '}
              {`${user.name} (${user.firstname} ${user.lastname})`}
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
              Utilisateur :{' '}
              {`${user.name} (${user.firstname} ${user.lastname})`}
            </strong>
          </p>
        </Modal>

        <Modal
          title="Êtes vous sûr ?"
          visible={this.state.setRespoModalVisible}
          onOk={this.setRespo}
          onCancel={this.closeSetRespoModal}
          cancelText="Annuler"
          okText="Ok"
        >
          <h3>Définir comme responsable du tournoi</h3>
          <p>
            <strong>
              Utilisateur :{' '}
              {`${user.name} (${user.firstname} ${user.lastname})`}
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
  validatePayment: id => dispatch(validatePayment(id)),
  setRespo: (id, spotlights) => dispatch(setRespo(id, spotlights)),
  removeRespo: (id, spotlights) => dispatch(removeRespo(id, spotlights))
})

const mapStateToProps = state => ({
  spotlights: state.spotlights.spotlights
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListActions)
