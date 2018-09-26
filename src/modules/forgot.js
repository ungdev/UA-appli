import axios from '../lib/axios'
import fail from '../lib/store.fail'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export const sendResetMail = ({ email }) => {
  return async dispatch => {
    try {
      await axios.post('user/reset', { email })

      dispatch(
        notifActions.notifSend({
          message: 'Mail envoyé avec succès',
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

export const resetPassword = resetInfos => {
  return async (dispatch, getState) => {
    if (resetInfos.password !== resetInfos.password2) {
      return fail(dispatch, 'PASSWORD_MISMATCH')
    }

    try {
      await axios.put('user/reset', resetInfos)

      dispatch(
        notifActions.notifSend({
          message: 'Mot de passe changé',
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
