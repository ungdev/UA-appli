import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'
import { push } from 'react-router-redux'

import { fetchUser } from './user'

export const SET_TEAMS = 'teams/SET_TEAMS'

const initialState = {
  teams: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TEAMS:
      return {
        ...state,
        teams: action.payload
      }
    default:
      return state
  }
}


export const refusePlayer = user => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    const team = getState().user.user.team.id

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      await axios.post(`/team/${team}/refuse`, { user }, { headers: { 'X-Token': authToken } })

      dispatch(fetchUser())
    } catch (err) {
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
        })
      )
    }
  }
}

export const kickPlayer = user => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    if (user === 'self') {
      user = getState().user.user.id
    }

    try {
      await axios.post(`/team/kick/${user}`, null, { headers: { 'X-Token': authToken } })

      dispatch(push('/dashboard'))
      await dispatch(fetchUser())
    } catch (err) {
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
        })
      )
    }
  }
}
