import axios from '../lib/axios'

export const SET_INFOS = 'infos/SET_INFOS'
export const SET_INFOS_LOADING = 'infos/SET_INFOS'

const initialState = {
  infos: [],
  loading: false
}

export default (state = initialState, action) => {
  let infos
  switch (action.type) {
    case SET_INFOS:
      if (!action.payload) return state
      if (!state.infos) state.infos = []
      //test has new elements
      infos = state.infos.splice(0) // peut poser probleme de splice
      if (!infos) infos = []
      action.payload.forEach((info) => {
        let found = infos.find(i => info.id === i.id) // if we find a matching spotlight
        if (!found) infos.push(info) //we do not add it to the tab
      })
      return { infos: infos, loading: false }
    case SET_INFOS_LOADING:
      return { ...state, loading: true }
    default:
      return state
  }
}

export const fetchInfos = (spotlight, start, end) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) return

    const infos = await axios.get(`infos/${spotlight}/${start}-${end}`, { headers: { 'X-Token': authToken } })
    dispatch({
      type: SET_INFOS,
      payload: infos.data
    })
    
  }
}