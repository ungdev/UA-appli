import React from 'react'
import { Divider, Spin, Button } from 'antd'
import GameStatusBar from '../GameStatusBar/GameStatusBar'
import { connect } from 'react-redux'
import { fetchInfos, sendMessage, SET_INFOS_LOADING } from '../../../../modules/infos'
import axios from '../../../../lib/axios'


class Compare extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <GameStatusBar game="libre" />
        <Divider />
        <Spin/>
        <Button onClick={this.buttonclicked} />
      </div>
    )
  }
  buttonclicked() {
    console.log("????")
    axios.post('auth/openid').then(r => console.log(r)).catch(e => console.log(e))
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  infos: state.infos.infos,
  loading: state.infos.loading,
  location: state.routing.location.pathname,
})

const mapDispatchToProps = dispatch => ({
  getInfos: (spotlight, start, end) => dispatch(fetchInfos(spotlight, start, end)),
  sendMessage: (spotlight, title, text) => dispatch(sendMessage(spotlight, title, text)),
  setLoading: () => dispatch({ type: SET_INFOS_LOADING })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Compare)
