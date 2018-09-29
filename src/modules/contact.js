import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'
import moment from 'moment'
import axios from '../lib/axios'


export const SET_LAST_MESSAGE_TIME = 'contact/LAST_MESSAGE_TIME'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LAST_MESSAGE_TIME:
      return { ...state, lastMessageTime: action.payload}
    default:
      return state
  }
}

export const sendMessageToSlack = (message, sendingLocation) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) return

    try {
      if(message === ''){
        return dispatch(
          notifActions.notifSend({
            message: 'Vous devez entrer un message',
            kind: 'danger',
            dismissAfter: 2000
          })
        )
      }
      const { lastMessageTime } = getState().contact
      if(lastMessageTime && lastMessageTime + 30000 > moment().valueOf()){
        const diff = Math.ceil((lastMessageTime + 30000 - moment().valueOf()) / 1000)
        return dispatch(
          notifActions.notifSend({
            message: `Veuillez attendre encore ${diff} secondes avant de renvoyer un message`,
            kind: 'danger',
            dismissAfter: 2000
          })
        )
      }
      dispatch({
        type: SET_LAST_MESSAGE_TIME,
        payload: moment().valueOf()
      })
      const { user } = getState().user
      const { spotlights } = getState().spotlights
      let spotlight = spotlights.find(s => `${s.id}` === `${sendingLocation}`)
      if(sendingLocation === 'libre') spotlight = { name: 'libre' }
      let data = `/!\\ Message en provenance de ${user.firstname} ${user.lastname} (${user.email}) depuis l'onglet contact de l'application pour le jeu ${spotlight.name} /!\\ `
      if(sendingLocation === 'libre') data = `/!\\ Message en provenance de ${user.firstname} ${user.lastname} (${user.email}) depuis l'onglet contact de l'application pour le tournoi libre /!\\ `
      await axios.post('slack', {message: data, toChannel: sendingLocation}, { headers: { 'X-Token': authToken } })
      await axios.post('slack', {message: `"${message}"`, toChannel: sendingLocation}, { headers: { 'X-Token': authToken } })
      dispatch(
        notifActions.notifSend({
          message: 'Message envoyé avec succès',
          dismissAfter: 2000
        })
      )
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
