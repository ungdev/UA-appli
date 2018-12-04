import axios from '../lib/axios'

export const SET_MATCHES = 'matches/SET_MATCHES'

const initialState = {
  matches: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MATCHES:
      return {
        ...state,
        matches: action.payload
      }
    default:
      return state
  }
}


export const fetchMatches = (spotlightID, participantID) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) return

    const res = await axios.get(`matches/${participantID}`,
    {
      headers: { 'X-Token': authToken },
      params: { spotlightID }
    })
    if(res.status === 200){
      dispatch({
        type: SET_MATCHES,
        payload: res.data
      })
    }
  }
}