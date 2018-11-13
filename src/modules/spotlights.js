import axios from '../lib/axios'

export const SET_SPOTLIGHTS = 'spotlights/SET_SPOTLIGHTS'

const initialState = {
  spotlights: []
}

export default (state = initialState, action) => {
  let spotlights
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
      return { spotlights }
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