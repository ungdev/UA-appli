import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Notifs as Notifications } from 'redux-notifications'
import 'antd/dist/antd.css'

import Home from '../home'
import asyncComponent from '../../components/async'

const AsyncPizza = asyncComponent(() => import('../../components/pizza'))
const Dashboard = asyncComponent(() => import('../dashboard'))

const App = props => (
  <div>
    <AsyncPizza />
    <Notifications />
    <Switch>
      <Route path={process.env.REACT_APP_BASEURL} exact component={Home} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/home'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/admin/users'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/admin/paids'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/admin/spotlights/:id'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/admin/material'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/:game/decks'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/:game/arbre-tournois'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/:game/contact'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/:game/teams'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/:game/rules'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/:game/info'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/libre/compare'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/libre/calendar'} exact component={Dashboard} />
      <Redirect from="*" to="/" />
    </Switch>
  </div>
)

const mapStateToProps = state => ({
  auth: state.user.user
})

export default connect(mapStateToProps)(App)
