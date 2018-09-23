import axios from '../lib/axios'

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


export const fetchTeams = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    const oldTeams = getState().teams.teams

    if (!authToken || authToken.length === 0) {
      return
    }

    const req = await axios.get('teams', { headers: { 'X-Token': authToken } })
    console.log(req)
    if(oldTeams.length !== req.data.length){
      dispatch({
        type: SET_TEAMS,
        payload: req.data
      })
    }
  }
}