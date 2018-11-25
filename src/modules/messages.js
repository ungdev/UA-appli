import axios from '../lib/axios'
import { actions as notifActions } from 'redux-notifications'

export const SET_MESSAGES = 'messages/SET_MESSAGES'
export const SET_MESSAGES_LOADING = 'messages/SET_MESSAGES'

const initialState = {
  messages: [],
  loading: false
}

export default (state = initialState, action) => {
  let messages
  switch (action.type) {
    case SET_MESSAGES:
      if (!action.payload) return state
      if (!state.infos) state.messages = []
      //test has new elements
      messages = state.messages.splice(0) // peut poser probleme de splice
      if (!messages) messages = []
      action.payload.forEach((message) => {
        let found = messages.find(i => message.id === i.id) // if we find a matching spotlight
        if (!found) messages.push(message) //we do not add it to the tab
      })
      // infos.sort((info1, info2) => info1.createdAt < info2.createdAt ? 1 : -1)
      return { messages: messages, loading: false }
    case SET_MESSAGES_LOADING:
      return { ...state, loading: true }
    default:
      return state
  }
}

export const fetchMessages = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) return
    const messages = await axios.get(`messages`, { headers: { 'X-Token': authToken } })
    dispatch({
      type: SET_MESSAGES,
      payload: messages.data
    })
    
  }
}

export const fetchMessagesByIdUser = (idTo) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) return
    const messages = await axios.get(`messages/${idTo}`, { headers: { 'X-Token': authToken } })
    dispatch({
      type: SET_MESSAGES,
      payload: messages.data
    })
    
  }
}

export const sendMessage = (to, message, spotlight) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) return
    try {
      const res = await axios.post(`messages`, { to, message, spotlight }, { headers: { 'X-Token': authToken } })
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



