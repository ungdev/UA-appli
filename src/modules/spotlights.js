import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_SPOTLIGHTS = 'spotlights/SET_SPOTLIGHTS'
export const SET_SPOTLIGHT_TEAMS = 'spotlights/SET_SPOTLIGHT_TEAMS'
export const SET_SPOTLIGHT_STATE = 'spotlights/SET_SPOTLIGHT_STATE'
export const ADD_SPOTLIGHT_STATE = 'spotlights/ADD_SPOTLIGHT_STATE'

const initialState = {
  spotlights: [],
  teams: []
}

export default (state = initialState, action) => {
  let spotlights
  let index
  switch (action.type) {
    case SET_SPOTLIGHTS:
      if (!action.payload) return state
      if (!state.spotlights) state.spotlights = []
      spotlights = state.spotlights.slice()
      if (!spotlights) spotlights = []
      action.payload.forEach((spotlight) => {
        let found = spotlights.find(s => spotlight.id === s.id) // if we find a matching spotlight
        if (!found) spotlights.push(spotlight) //we do not add it to the tab
      })
      spotlights.sort((s1, s2) => s1.id > s2.id ? 1 : -1)
      return { ...state, spotlights }
    case SET_SPOTLIGHT_STATE:
      spotlights = state.spotlights.splice(0)
      index = spotlights.findIndex(spotlight => spotlight.id === parseInt(action.payload.spotlightId, 10))
      if(index === -1) return state
      spotlights[index].state = action.payload.stateValue
      return { ...state, spotlights}
    case ADD_SPOTLIGHT_STATE:
      spotlights = state.spotlights.splice(0)
      index = spotlights.findIndex(spotlight => spotlight.id === parseInt(action.payload.spotlightId, 10))
      if(index === -1) return state
      spotlights[index].states.push(action.payload.newState)
      return { ...state, spotlights }
    case SET_SPOTLIGHT_TEAMS:
        let teams = state.teams.splice(0)
        action.payload.forEach(newteam => {
          const found = teams.find(team => team.id === newteam.id)
          if(!found){
            teams.push(newteam)
          }
        })
        return {
          ...state,
          teams
        }
    default:
      return state
  }
}

export const fetchSpotlights = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    const oldSpotlights = getState().spotlights.spotlights

    if (!authToken || authToken.length === 0) return

    const spotlights = await axios.get('spotlights', { headers: { 'X-Token': authToken } })
    if(oldSpotlights.length !== spotlights.data.length){
      dispatch({
        type: SET_SPOTLIGHTS,
        payload: spotlights.data
      })
    }
  }
}
export const setSpotlightState = (spotlightId, stateValue) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) return
      
    try{
      const res = await axios.put(`spotlights/${spotlightId}/state`, { value: stateValue }, { headers: { 'X-Token': authToken } })
      if(res.status === 200){
        dispatch({
          type: SET_SPOTLIGHT_STATE,
          payload: { spotlightId, stateValue }
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

export const addState = (spotlightId, title, desc, popover) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) return
      
    try{
      const res = await axios.post(`states`, { spotlightId, title, desc, popover }, { headers: { 'X-Token': authToken } })
      if(res.status === 200){
        dispatch({
          type: ADD_SPOTLIGHT_STATE,
          payload: { spotlightId, newState: res.data }
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


export const fetchTeamsBySpotlightId = (id) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const req = await axios.get(`spotlights/${id}/teams`, { headers: { 'X-Token': authToken } })
      dispatch({
        type: SET_SPOTLIGHT_TEAMS,
        payload: req.data
      })
    } catch(err) {
      console.log(err)
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