import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'
import { logout, SET_TOKEN } from './login'

export const SET_USER = 'user/SET_USER'
export const SET_PRICES = 'user/SET_PRICES'

const initialState = {
  user: null,
  prices: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case SET_PRICES:
      if (!action.payload) {
        return state
      }

      const prices = {}

      for (let [key, value] of Object.entries(action.payload)) {
        prices[key] = parseFloat(value)
      }

      prices.partners = action.payload.partners.split(',')

      return {
        ...state,
        prices
      }
    default:
      return state
  }
}

export const fetchUser = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('user', { headers: { 'X-Token': authToken } })
      
      dispatch({ type: SET_USER, payload: res.data.user })
      dispatch({ type: SET_TOKEN, payload: res.data.token })
      dispatch({ type: SET_PRICES, payload: res.data.prices })
      if(res.data.hasChangedIp) {
        dispatch(
          notifActions.notifSend({
            message: 'Vous serez connecté au réseau d\'ici 1 minute',
            kind: 'warning',
            dismissAfter: 20000
          })
        )
      }

      var OneSignal = window.OneSignal || [];
      OneSignal.push(["init", {
        appId: "cac7c5b1-3b95-4c2d-b5df-b631b3c3646b",
        autoRegister: true, /* Set to true for HTTP Slide Prompt */
        httpPermissionRequest: {
          enable: true
        },
        notifyButton: {
            enable: false /* Set to false to hide */
        },
        welcomeNotification: {
          "title": "Les notifications sont maintenant activées !",
          "message": "Vous recevrez maintenant toutes les news de l'UTT Arena",
          // "url": "" /* Leave commented for the notification to not open a window on Chrome and Firefox (on Safari, it opens to your webpage) */
        },
        promptOptions: {
          /* actionMessage limited to 90 characters */
          actionMessage: "Nous utilisons les notifications pour vous informer pendant la LAN",
          /* acceptButtonText limited to 15 characters */
          acceptButtonText: "Autoriser",
          /* cancelButtonText limited to 15 characters */
          cancelButtonText: "Refuser"
        }
      }]);
      OneSignal.push(() => {
        OneSignal.sendTags({
          id: res.data.user.id,
          spotlightId: res.data.user.spotlightId,
        })
      })

    } catch (err) {
      dispatch(logout())
    }
  }
}

export const editUser = newUserData => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    if (newUserData.password !== newUserData.password2) {
      return dispatch(
        notifActions.notifSend({
          message: errorToString('PASSWORD_MISMATCH'),
          kind: 'danger',
          dismissAfter: 2000
        })
      )
    }

    try {
      const res = await axios.put('user', newUserData, { headers: { 'X-Token': authToken } })

      dispatch({
        type: SET_USER,
        payload: res.data.user
      })

      dispatch(
        notifActions.notifSend({
          message: 'Compte édité avec succès',
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
