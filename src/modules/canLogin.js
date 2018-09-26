import axios from '../lib/axios'

export const SET_CANLOGIN = 'canLogin/SET_CANLOGIN'

const initialState = {
  canLogin: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CANLOGIN:
      return {
        canLogin: action.payload
      }
    default:
      return state
  }
}

export const fetchCanLogin = () => {
  return async dispatch => {
    const canLogin = await axios.get('user/canLogin')

    dispatch({
      type: SET_CANLOGIN,
      payload: canLogin.data.canLogin
    })
  }
}
