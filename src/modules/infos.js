import axios from '../lib/axios'
import { actions as notifActions } from 'redux-notifications'

export const SET_INFOS = 'infos/SET_INFOS'
export const SET_INFOS_LOADING = 'infos/SET_INFOS'
export const DELETE_INFO = 'infos/DELETE_INFO'

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
      infos = state.infos.slice()
      if (!infos) infos = []
      action.payload.forEach((info) => {
        let found = infos.find(i => info.id === i.id) // if we find a matching spotlight
        if (!found) infos.push(info) //we do not add it to the tab
      })
      infos.sort((info1, info2) => info1.createdAt < info2.createdAt ? 1 : -1)
      return { infos: infos, loading: false }
    case SET_INFOS_LOADING:
      return { ...state, loading: true }
    case DELETE_INFO:
      if (!state.infos) state.infos = []

      infos = state.infos.splice(0)
      const index = infos.findIndex(i => i.id === action.payload)
      infos.splice(index, 1)
      return { infos: infos }
    default:
      return state
  }
}

export const fetchInfos = (spotlight, start, end) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) return
    if(spotlight === 'libre') spotlight = 7
    const infos = await axios.get(`infos/${spotlight}/${start}-${end}`, { headers: { 'X-Token': authToken } })
    dispatch({
      type: SET_INFOS,
      payload: infos.data
    })
    
  }
}

export const sendMessage = (spotlight, title, content) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) return
    try {
      const res = await axios.post(`infos/${spotlight}`, { title, content }, { headers: { 'X-Token': authToken } })
      if(res.status === 200) {
        dispatch(
          notifActions.notifSend({
            message: 'Message envoyé avec succès',
            dismissAfter: 2000
          })
        )
      }
    }
    catch (e){
      console.log(e)
      dispatch(
        notifActions.notifSend({
          message: 'Une erreur est survenue',
          kind: 'danger',
          dismissAfter: 2000
        })
      )
    }
    
  }
}

export const deleteInfo = (infoId, spotlightId) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) return

    try {
      const res = await axios.delete(`infos/${spotlightId}/${infoId}`, { headers: { 'X-Token': authToken } })
      if(res.status === 200) {
        dispatch(
          notifActions.notifSend({
            message: 'Message supprimé',
            dismissAfter: 2000
          })
        )
        dispatch({
          type: DELETE_INFO,
          payload: infoId
        })
      }
    } catch(e) {
      console.log(e)
      dispatch(
        notifActions.notifSend({
          message: 'Une erreur est survenue',
          kind: 'danger',
          dismissAfter: 2000
        })
      )
    }
  }
}