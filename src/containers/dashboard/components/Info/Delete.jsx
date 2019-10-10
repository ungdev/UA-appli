import React from 'react'
import { connect } from 'react-redux'
import { Icon, Modal } from 'antd'
import { fetchInfos, sendMessage, deleteInfo, SET_INFOS_LOADING } from '../../../../modules/infos'

class Delete extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
    }
  }

  validate = () => {
    this.props.deleteInfo(this.props.infoId, this.props.tournamentId)
    this.closeModal()
  }

  openModal = () => {
    this.setState({
      modalVisible: true,
    })
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
    })
  }

  render() {
    return (
      <React.Fragment>
        <a onClick={this.openModal}>
          <Icon type="delete" theme="filled" style={{ color: '#f00' }} />
        </a>

        <Modal
          title="Êtes-vous sûr ?"
          visible={this.state.modalVisible}
          onOk={this.validate}
          onCancel={this.closeModal}
          okText="Ok"
          cancelText="Annuler"
        >
          Vous allez supprimer une information
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
})

const mapDispatchToProps = dispatch => ({
  getInfos: (tournament, start, end) => dispatch(fetchInfos(tournament, start, end)),
  sendMessage: (tournament, title, text) => dispatch(sendMessage(tournament, title, text)),
  setLoading: () => dispatch({ type: SET_INFOS_LOADING }),
  deleteInfo: (infoId, tournamentId) => dispatch(deleteInfo(infoId, tournamentId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delete)
