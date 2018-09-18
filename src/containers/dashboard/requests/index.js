import React from 'react'
import { connect } from 'react-redux'

import { cancelRequest } from '../../../modules/teams'

import './requests.css'

const Requests = props => (
  <div className="a-dashboard-page a-dashboard-requests">
    <h2>Mes demandes</h2>
    <div className="a-requests">
      {props.requests.length === 0 && <p>Aucune demande en cours.</p>}
      {props.requests.map((request, i) => (
        <div className="a-request" key={i}>
          <div className="a-request__content">
            <strong>{request.name}</strong>
            <em>{request.message}</em>
          </div>
          <span className="a-request__cancel" href="#" onClick={props.cancelRequest(request.id)}>
            Annuler
          </span>
        </div>
      ))}
    </div>
  </div>
)

const mapStateToProps = state => ({
  requests: state.teams.teams
    .map(team => {
      const asking = team.askingUsers.find(askingUser => askingUser.id === state.user.user.id)

      if (!asking) {
        return null
      }

      return {
        id: team.id,
        name: team.name,
        message: asking.askingMessage
      }
    })
    .filter(request => !!request)
})

const mapDispatchToProps = dispatch => ({
  cancelRequest: teamId => () => {
    dispatch(cancelRequest(teamId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Requests)
