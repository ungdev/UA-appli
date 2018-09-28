import React from 'react'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import { fetchInfos, sendMessage, deleteInfo, SET_INFOS_LOADING } from '../../../../modules/infos'

class Delete extends React.Component {
  render(){
    return <a onClick={this.onClick}><Icon type="delete"/></a>
  }

  onClick = () => {
    this.props.deleteInfo(this.props.infoId)
  }
  
}

const mapStateToProps = state => ({
  user: state.user.user,
})

const mapDispatchToProps = dispatch => ({
  getInfos: (spotlight, start, end) => dispatch(fetchInfos(spotlight, start, end)),
  sendMessage: (spotlight, title, text) => dispatch(sendMessage(spotlight, title, text)),
  setLoading: () => dispatch({ type: SET_INFOS_LOADING }),
  deleteInfo: (infoId) => dispatch(deleteInfo(infoId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delete)
