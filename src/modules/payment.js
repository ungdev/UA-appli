import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export const payment = basket => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.post('user/pay', basket, { headers: { 'X-Token': authToken } })

      if (res.status === 200 && !res.body.error) {
        location.href = res.body.url // eslint-disable-line no-restricted-globals
      }
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
