import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notificationsReducer } from 'redux-notifications'
import canLogin from './canLogin'
import login from './login'
import register from './register'
import user from './user'
import payment from './payment'
import teams from './teams'
import spotlights from './spotlights'
import forgot from './forgot'
import contact from './contact'

export default combineReducers({
  routing: routerReducer,
  notifs: notificationsReducer,
  canLogin,
  login,
  register,
  user,
  payment,
  teams,
  spotlights,
  forgot,
  contact
})
