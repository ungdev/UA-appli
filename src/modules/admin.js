import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_USERS = 'admin/SET_USERS'
export const SET_USER_ADMIN = 'admin/SET_USER_ADMIN'
export const REMOVE_USER_ADMIN = 'admin/REMOVE_USER_ADMIN'

const initialState = {
  users: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case SET_USER_ADMIN:
      let users = state.users.splice(0)
      const userId = action.payload
      const index = users.findIndex(u => u.id === userId)
      users[index].isAdmin = 100
      return {
        ...state,
        users
      }
    case REMOVE_USER_ADMIN:
      let users2 = state.users.splice(0)
      const userId2 = action.payload
      const index2 = users2.findIndex(u => u.id === userId2)
      users2[index2].isAdmin = 0
      return {
        ...state,
        users: users2
      }
    default:
      return state
  }
}

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('users', { headers: { 'X-Token': authToken } })

      dispatch({ type: SET_USERS, payload: res.data })
    } catch (err) {
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const setAdmin = (id) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(`/users/${id}`, { isAdmin: 100 }, { headers: { 'X-Token': authToken } })
      if(res.status === 200) {
        dispatch({ type: SET_USER_ADMIN, payload: id })
        dispatch(
          notifActions.notifSend({
            message: 'L\'utilisateur est maintenant Administrateur',
            kind: 'warning',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      dispatch(
        notifActions.notifSend({
          message: 'Une erreur est survenue',
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const removeAdmin = (id) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(`/users/${id}`, { isAdmin: 0 }, { headers: { 'X-Token': authToken } })
      if(res.status === 200) {
        dispatch({ type: REMOVE_USER_ADMIN, payload: id })
        dispatch(
          notifActions.notifSend({
            message: 'L\'utilisateur n\'est maintenant plus Administrateur',
            kind: 'warning',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      dispatch(
        notifActions.notifSend({
          message: 'Une erreur est survenue',
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}