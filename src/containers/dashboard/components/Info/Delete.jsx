import React from 'react'
import { connect } from 'react-redux'
import { Icon, Modal } from 'antd'
import { fetchInfos, sendMessage, deleteInfo, SET_INFOS_LOADING } from '../../../../modules/infos'

class Delete extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false
    }
  }

  validate = () => {
    this.props.deleteInfo(this.props.infoId, this.props.spotlightId)
    this.closeModal()
  }

  openModal = () => {
    this.setState({
      modalVisible: true
    })
  }

  closeModal = () => {
    this.setState({
      modalVisible: false
    })
  }
  
  render() {
    return (
      <React.Fragment>
        <a onClick={this.openModal}><Icon type="delete" theme="filled" style={{ color: '#f00' }} /></a>

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
  getInfos: (spotlight, start, end) => dispatch(fetchInfos(spotlight, start, end)),
  sendMessage: (spotlight, title, text) => dispatch(sendMessage(spotlight, title, text)),
  setLoading: () => dispatch({ type: SET_INFOS_LOADING }),
  deleteInfo: (infoId, spotlightId) => dispatch(deleteInfo(infoId, spotlightId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delete)
