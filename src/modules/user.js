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
