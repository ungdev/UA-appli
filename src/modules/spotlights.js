import axios from '../lib/axios'

export const SET_SPOTLIGHTS = 'spotlights/SET_SPOTLIGHTS'

const initialState = {
  spotlights: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTLIGHTS:
      return {
        spotlights: action.payload
      }
    default:
      return state
  }
}

export const fetchSpotlights = () => {
  console.log('fetchspotlights')
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    const oldSpotlights = getState().spotlights
    console.log('oldSpotlights', oldSpotlights)

    if (!authToken || authToken.length === 0) {
      console.log('no token', authToken, getState())
      return
    }

    const spotlights = await axios.get('spotlights', { headers: { 'X-Token': authToken } })
    if(oldSpotlights.length !== spotlights.length){
      dispatch({
        type: SET_SPOTLIGHTS,
        payload: spotlights.data
      })
    }
  }
}

