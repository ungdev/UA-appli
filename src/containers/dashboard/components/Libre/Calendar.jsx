import React from 'react'
import { Divider } from 'antd'
import { connect } from 'react-redux'
import { fetchInfos, sendMessage, SET_INFOS_LOADING } from '../../../../modules/infos'


class Calendar extends React.Component {

  render() {
    return (
      <div>
        <Divider />
        <iframe title="libreCalendar" src="https://calendar.google.com/calendar/b/1/embed?mode=AGENDA&amp;height=600&amp;wkst=2&amp;bgcolor=%2333ccff&amp;src=1141enfov97obfao4ergs9g6f4%40group.calendar.google.com&amp;color=%23AB8B00&amp;ctz=Europe%2FParis" width="800" height="600" scrolling="no"></iframe>
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
