import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Notifs as Notifications } from 'redux-notifications'
import Home from '../home'
import asyncComponent from '../../components/async'
import 'antd/dist/antd.css';

const AsyncPizza = asyncComponent(() => import('../../components/pizza'))
const Dashboard = asyncComponent(() => import('../dashboard'))

const App = props => (
  <div>
    <AsyncPizza />
    <Notifications />
    <Switch>
      <Route path={process.env.REACT_APP_BASEURL} exact component={Home} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard'} component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + '/dashboard/tournois/hearthstone/decks'} component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + '/dashboard/tournois/:game/arbre-tournois'} component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + '/dashboard/tournois/:game/contact'} component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + '/dashboard/tournois/:game/teams'} component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + '/dashboard/tournois/:game/rules'} component={Dashboard} />
      <Redirect from="*" to="/" />
    </Switch>
  </div>
)

const mapStateToProps = state => ({
  auth: state.user.user
})

export default connect(mapStateToProps)(App)
