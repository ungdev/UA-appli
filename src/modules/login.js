import { push } from 'react-router-redux'
import { actions as notifActions } from 'redux-notifications'
import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { fetchUser, SET_USER, SET_PRICES } from './user'
import { SET_TEAMS } from './teams'
import { SET_SPOTLIGHTS } from './tournaments'

export const SET_TOKEN = 'login/SET_TOKEN'

const initialState = {
  token: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    default:
      return state
  }
}

export const autoLogin = () => {
  return async dispatch => {
    if (localStorage.hasOwnProperty('utt-arena-token')) {
      dispatch({
        type: SET_TOKEN,
        payload: localStorage.getItem('utt-arena-token'),
      })

      return dispatch(fetchUser())
    }
    return dispatch(logout())
  }
}

export const tryLogin = user => {
  return async dispatch => {
    try {
      const res = await axios.post('auth/login', user)
      localStorage.setItem('utt-arena-userid', res.data.user.id);

      dispatch(saveToken(res.data.token))
      dispatch(push('/dashboard'))
      dispatch(
        notifActions.notifSend({
          message: 'Connexion validée',
          dismissAfter: 2000,
        })
      )
    } catch (err) {
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000,
        })
      )
    }
  }
}

export const saveToken = token => {
  return async dispatch => {
    dispatch({
      type: SET_TOKEN,
      payload: token,
    })

    localStorage.setItem('utt-arena-token', token)
  }
}

export const logout = () => {
  console.log('LOGOUT')
  return async dispatch => {
    dispatch({ type: SET_TOKEN, payload: null })
    dispatch({ type: SET_USER, payload: null })
    dispatch({ type: SET_SPOTLIGHTS, payload: null })
    dispatch({ type: SET_TEAMS, payload: null })
    dispatch({ type: SET_PRICES, payload: null })

    localStorage.removeItem('utt-arena-token')
    localStorage.removeItem('utt-arena-userid')

    return dispatch(push('/'))
  }
}
