import React from 'react'
import { Icon, Tooltip, Modal } from 'antd'
import { connect } from 'react-redux'
import { setAdmin, removeAdmin, validatePayment } from '../../../../modules/admin'

class UserListActions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
  }

  setAdmin = () => {
    this.props.setAdmin(this.props.userId)
  }

  removeAdmin = () => {
    this.props.removeAdmin(this.props.userId)
  }

  openModal = () => {
    this.setState({
      modalVisible: true,
    })
  }

  validate = () => {
    this.props.validatePayment(this.props.userId)
    this.setState({
      modalVisible: false,
    })
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
    })
  }

  render() {
    const { users, userId } = this.props
    const user = users.find(u => u.id === userId)

    return (
      <React.Fragment>
        {user && user.isAdmin !== 100 ?
          <Tooltip placement="top" title="Rendre Administrateur">
            <a onClick={this.setAdmin} style={{ marginLeft: '2px', marginRight: '2px' }}>
              <Icon type="arrow-up"/>
            </a>
          </Tooltip> : null}
        {user && user.isAdmin === 100 ? (
          <Tooltip placement="top" title="Enlever les droits Administrateur">
            <a onClick={this.removeAdmin} style={{ color: '#ff0000', marginLeft: '2px', marginRight: '2px' }}>
              <Icon type="arrow-down"/>
            </a>
          </Tooltip>) : null}
        {user && !user.paid ? (
          <Tooltip placement="top" title="Valider le paiement">
            <a onClick={this.openModal} style={{ color: '#00ff00', marginLeft: '2px', marginRight: '2px' }}>
              <Icon type="dollar"/>
            </a>
          </Tooltip>) : null}
        <Modal
          title="Êtes vous sûr ?"
          visible={this.state.modalVisible}
          onOk={this.validate}
          onCancel={this.closeModal}
        >
          <p>Cela validera le paiement de l'utilisateur, et il recevra sa place par mail</p>
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
