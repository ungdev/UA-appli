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
export const SET_USER_PLACE = 'admin/SET_USER_PLACE'
export const SWITCH_USERS_PLACES = 'admin/SWITCH_USERS_PLACES'
export const SET_USER_RESPO = 'admin/SET_USER_RESPO'
export const SET_USER_PERMISSION = 'admin/SET_USER_PERMISSION'

const initialState = {
  users: [],
  respo: [],
  spotlights: [],
  chartData: { daily: [], cumul: [] },
}

export default (state = initialState, action) => {
  let users = state.users.slice(0)
  let userId = null
  let index = null

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
      userId = action.payload
      index = users.findIndex(u => u.id === userId)
      users[index].permission.admin = true
      return {
        ...state,
        users
      }
    case REMOVE_USER_ADMIN:
      userId = action.payload
      index = users.findIndex(u => u.id === userId)
      users[index].permission.admin = false
      return {
        ...state,
        users
      }
    case SET_USER_PAID:
      userId = action.payload
      index = users.findIndex(u => u.id === userId)
      users[index].paid = 1
      return {
        ...state,
        users
      }
    case SET_USER_PLACE:
      const userPlaceIndex = users.findIndex(u => u.id === action.payload.id)
      if(action.payload.placeLetter && action.payload.placeNumber) {
        users[userPlaceIndex].place = `${action.payload.placeLetter}${action.payload.placeNumber}`
      }
      else {
        users[userPlaceIndex].place = ''
      }
      return {
        ...state,
        users
      }
    case SWITCH_USERS_PLACES:
      const userIndex1 = users.findIndex(u => u.id === action.payload.id1)
      const userIndex2 = users.findIndex(u => u.id === action.payload.id2)

      const tmpPlace = users[userIndex1].place

      users[userIndex1].place = users[userIndex2].place
      users[userIndex2].place = tmpPlace

      return {
        ...state,
        users
      }
    case SET_USER_RESPO:
      index = users.findIndex(u => u.id === action.payload.id)
      users[index].permission.respo = action.payload.respo.toString()
      return {
        ...state,
        users
      }
    case SET_USER_PERMISSION:
      index = users.findIndex(u => u.id === action.payload.id)
      users[index].permission.permission = action.payload.permission.toString()
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
            message: 'Paiement validé',
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
        mode: 'daily',
      }, { headers: { 'X-Token': authToken } })
      const res2 = await axios.post(`admin/chart`, {
        start: '2018-10-16',
        end: moment().format('YYYY-MM-DD'),
        step: 'day',
        mode: 'cumul',
      }, { headers: { 'X-Token': authToken } })

      dispatch({ type: SET_CHARTDATA, payload: { daily: res.data, cumul: res2.data} })
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
      const res = await axios.get(`admin/remindersMail`, { headers: { 'X-Token': authToken } })
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

export const sendInformationsMails = () => {
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
      const res = await axios.get(`admin/informationsMail`, { headers: { 'X-Token': authToken } })
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
      const res = await axios.put(`/admin/setAdmin/${id}`, { admin: true }, { headers: { 'X-Token': authToken } })

      if(res.status === 200) {
        dispatch({ type: SET_USER_ADMIN, payload: id })
        dispatch(
          notifActions.notifSend({
            message: 'L\'utilisateur est maintenant administrateur',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      console.log(err)
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
      const res = await axios.put(`/admin/setAdmin/${id}`, { admin: false }, { headers: { 'X-Token': authToken } })

      if(res.status === 200) {
        dispatch({ type: REMOVE_USER_ADMIN, payload: id })
        dispatch(
          notifActions.notifSend({
            message: 'L\'utilisateur n\'est maintenant plus administrateur',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: 'Une erreur est survenue',
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const setPlace = (id, placeLetter, placeNumber) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      placeLetter = placeLetter.toUpperCase()
      
      const res = await axios.put(`admin/setPlace/${id}`, { placeLetter, placeNumber }, { headers: { 'X-Token': authToken } })
      if(res.status === 200) {
        dispatch({ type: SET_USER_PLACE, payload: { id, placeLetter, placeNumber } })
        dispatch(
          notifActions.notifSend({
            message: 'La place de l\'utilisateur a été modifiée',
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

export const switchPlaces = (id1, id2) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {      
      const res = await axios.put(`admin/switchPlaces/${id1}/${id2}`, {}, { headers: { 'X-Token': authToken } })
      if(res.status === 200) {
        dispatch({ type: SWITCH_USERS_PLACES, payload: { id1, id2 } })
        dispatch(
          notifActions.notifSend({
            message: 'Les places ont été échangées',
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

export const setPlaces = (places) => {
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
      const res = await axios.post(`admin/setPlaces`, { places }, { headers: { 'X-Token': authToken } })
      if(res.status === 200) {
        dispatch(
          notifActions.notifSend({
            message: 'Places modifiées !',
            dismissAfter: 2000
        }))
      }
      else {
        console.log(res)
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

export const setRespo = (id, respo) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(`/admin/setRespo/${id}`, { respo }, { headers: { 'X-Token': authToken } })

      if(res.status === 200) {
        dispatch({ type: SET_USER_RESPO, payload: { id, respo } })
        dispatch(
          notifActions.notifSend({
            message: 'Les permissions de l\'utilisateur ont été modifiées',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: 'Une erreur est survenue',
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const setPermission = (id, permission) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(`/admin/setPermission/${id}`, { permission }, { headers: { 'X-Token': authToken } })

      if(res.status === 200) {
        dispatch({ type: SET_USER_PERMISSION, payload: { id, permission } })
        dispatch(
          notifActions.notifSend({
            message: 'Les permissions de l\'utilisateur ont été modifiées',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: 'Une erreur est survenue',
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}