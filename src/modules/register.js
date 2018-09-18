import axios from '../lib/axios'
import fail from '../lib/store.fail'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'
import { saveToken } from './login'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export const register = user => {
  return async dispatch => {
    if (user.password !== user.password2) {
      return fail(dispatch, 'PASSWORD_MISMATCH')
    }

    try {
      await axios.post('user', user)

      dispatch(
        notifActions.notifSend({
          message: 'Inscription réussie',
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

export const validate = token => {
  return async dispatch => {
    try {
      const res = await axios.post('user/validate', { token })

      await dispatch(saveToken(res.data.token))

      dispatch(
        notifActions.notifSend({
          message: 'Inscription validée',
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
