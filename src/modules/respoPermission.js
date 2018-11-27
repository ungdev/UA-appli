import axios from '../lib/axios'
import { actions as notifActions } from 'redux-notifications'

export const SET_USERS = 'admin/SET_USERS'
export const SET_USER_RESPO_PERMISSION = 'admin/SET_USER_RESPO_PERMISSION'

const initialState = {
  users: [],
  respoPermission: [],
  chartData: { daily: [], cumul: [] },
}

export default (state = initialState, action) => {
  let users = state.users.slice(0)
  const userId = action.payload
  const index = users.findIndex(u => u.id === userId)

  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    
    case SET_USER_RESPO_PERMISSION:
      users[index].permission.respoPermission = true
      return {
        ...state,
        users
      }
    default:
      return state
  }
}

export const setRespoPermission = (id, respoPermission) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(`/admin/setRespoPermission/${id}`, { respoPermission }, { headers: { 'X-Token': authToken } })

      if(res.status === 200) {
        dispatch({ type: SET_USER_RESPO_PERMISSION, payload: id })
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