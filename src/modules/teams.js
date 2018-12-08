import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_TEAMS = 'teams/SET_TEAMS'
export const SET_SCANNED_TEAMS = 'teams/SET_SCANNED_TEAMS'

const initialState = {
  teams: [],
  scannedTeams: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TEAMS:
      return {
        ...state,
        teams: action.payload
      }
    case SET_SCANNED_TEAMS:
      return {
        ...state,
        scannedTeams: action.payload
      }
    default:
      return state
  }
}


export const fetchTeams = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    const oldTeams = getState().teams.teams

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const req = await axios.get('teams', { headers: { 'X-Token': authToken } })
      
      if(req.status === 200) {
        if(!oldTeams || oldTeams.length !== req.data.length){
          dispatch({
            type: SET_TEAMS,
            payload: req.data
          })
        }
      }
    } catch(err) {
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

export const fetchScannedTeams = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const req = await axios.get(`scanned`, { headers: { 'X-Token': authToken } })
    
      if(req.status === 200) {
        dispatch({
          type: SET_SCANNED_TEAMS,
          payload: req.data
        })
      }
    } catch(err) {
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