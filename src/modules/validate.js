import axios from '../lib/axios'
import { actions as notifActions } from 'redux-notifications'


export const SET_INFOS = 'validate/SET_INFOS'

const initialState = {
  infos: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INFOS:
      return {
        ...state,
        infos: action.payload
      }
    default:
      return state
  }
}

export const getInfos = (barcode, fullname) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      if(!barcode && !fullname) {
        dispatch(
          notifActions.notifSend({
            message: 'Remplissez au moins un champ',
            kind: 'danger',
            dismissAfter: 2000
        }))
        return
      }
      let name = fullname ? fullname.split('(')[0] : null
      if(name) name = name.substr(0, name.length -1)
      const res = await axios.put(`/admin/validate`, { barcode, name }, { headers: { 'X-Token': authToken } })
      if(res.status === 200) {
        dispatch({ type: SET_INFOS, payload: res.data.user })
      }
    } catch (err) {
      console.log(err)
      if(err.response.status === 404) {
        dispatch(
          notifActions.notifSend({
            message: 'La place n\'a pas été trouvée',
            kind: 'danger',
            dismissAfter: 2000
        }))
        return
      }
      dispatch(
        notifActions.notifSend({
          message: 'Une erreur est survenue',
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}