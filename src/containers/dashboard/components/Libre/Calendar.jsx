import React from 'react'
import { Divider } from 'antd'
import GameStatusBar from '../GameStatusBar/GameStatusBar'
import { connect } from 'react-redux'
import { fetchInfos, sendMessage, SET_INFOS_LOADING } from '../../../../modules/infos'


class Calendar extends React.Component {

  render() {
    return (
      <div>
        <Divider />
        <iframe title="libreCalendar" src="https://calendar.google.com/calendar/b/1/embed?showPrint=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=4mdfsfsmm9m4jbap8qlht0opao%40group.calendar.google.com&amp;color=%238D6F47&amp;ctz=Europe%2FParis" width="800" height="600" scrolling="no"></iframe>
      </div>
    )
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
)(Calendar)
