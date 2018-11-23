import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'
import moment from 'moment'

export const SET_USERS = 'admin/SET_USERS'
export const SET_COUNTS = 'admin/SET_COUNTS'
export const SET_SPOTLIGHT = 'admin/SET_SPOTLIGHT'
export const SET_CHARTDATA = 'admin/SET_CHARTDATA'
export const SET_USER_ADMIN = 'admin/SET_USER_ADMIN'
export const SET_USER_PAID = 'admin/SET_USER_PAID'
export const REMOVE_USER_ADMIN = 'admin/REMOVE_USER_ADMIN'

const initialState = {
  users: [],
  spotlights: [],
  chartData: { dayly: [], cumul: [] },
}

export default (state = initialState, action) => {
  let users = state.users.slice()
  const userId = action.payload
  const index = users.findIndex(u => u.id === userId)

  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case SET_COUNTS:
      return {
        ...state,
        counts: action.payload
      }
    case SET_CHARTDATA:
      return {
        ...state,
        chartData: action.payload
      }
    case SET_SPOTLIGHT:
      let spotlights = state.spotlights.slice(0)
      spotlights[action.payload.id] = action.payload.spotlight
      return {
        ...state,
        spotlights
      }
    case SET_USER_ADMIN:
      users[index].permissions.admin = 100
      return {
        ...state,
        users
      }
    case REMOVE_USER_ADMIN:
      users[index].permissions.admin = 0
      return {
        ...state,
        users
      }
    case SET_USER_PAID:
      users[index].paid = 1
      return {
        ...state,
        users
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
      const res = await axios.get('admin/users', { headers: { 'X-Token': authToken } })

      dispatch({ type: SET_USERS, payload: res.data })
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const fetchAdminSpotlight = (id) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get(`admin/spotlight/${id}`, { headers: { 'X-Token': authToken } })

      dispatch({ type: SET_SPOTLIGHT, payload: { id, spotlight: res.data } })
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const validatePayment = (userId) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }
    dispatch(
      notifActions.notifSend({
        message: 'Demande de paiement reçue, merci de patienter...',
        kind: 'warning',
        dismissAfter: 2000
    }))
    try {
      const res = await axios.post(`admin/forcepay`, { userId }, { headers: { 'X-Token': authToken } })
      if(res.status === 200) {
        dispatch({ type: SET_USER_PAID, payload: userId })
        dispatch(
          notifActions.notifSend({
            message: 'Payment validé',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const fetchChartData = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.post(`admin/chart`, {
        start: '2018-10-16',
        end: moment().format('YYYY-MM-DD'),
        step: 'day',
        mode: 'dayly',
      }, { headers: { 'X-Token': authToken } })
      const res2 = await axios.post(`admin/chart`, {
        start: '2018-10-16',
        end: moment().format('YYYY-MM-DD'),
        step: 'day',
        mode: 'cumul',
      }, { headers: { 'X-Token': authToken } })

      dispatch({ type: SET_CHARTDATA, payload: { dayly: res.data, cumul: res2.data} })
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const sendReminderMails = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      dispatch(
        notifActions.notifSend({
          message: 'Envoi en cours ...',
          dismissAfter: 2000
      }))
      const res = await axios.get(`admin/reminders`, { headers: { 'X-Token': authToken } })
      dispatch(
        notifActions.notifSend({
          message: JSON.stringify(res.data),
          dismissAfter: 15000
      }))
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const fetchCounts = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('/admin/paids', { headers: { 'X-Token': authToken } })

      dispatch({ type: SET_COUNTS, payload: res.data })
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

export const setAdmin = (id) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(`/admin/user/${id}`, { admin: 100 }, { headers: { 'X-Token': authToken } })

      if(res.status === 200) {
        dispatch({ type: SET_USER_ADMIN, payload: id })
        dispatch(
          notifActions.notifSend({
            message: 'L\'utilisateur est maintenant administrateur',
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
      const res = await axios.put(`/admin/user/${id}`, { admin: 0 }, { headers: { 'X-Token': authToken } })

      if(res.status === 200) {
        dispatch({ type: REMOVE_USER_ADMIN, payload: id })
        dispatch(
          notifActions.notifSend({
            message: 'L\'utilisateur n\'est maintenant plus administrateur',
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