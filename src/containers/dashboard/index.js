import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Accueil from './components/Accueil'
import HsDecks from './components/hs/HsDecks'
import Tournament from './components/Tournament'
import Teams from './components/Teams/Teams'
import Rules from './components/Rules/Rules'
import Info from './components/Info/Info'
import Contact from './components/Contact/Contact'
import UsersList from './components/Admin/UsersList'
import Paids from './components/Admin/Paids'
import Spotlights from './components/Admin/Spotlights'
import Material from './components/Admin/Material'
import Compare from './components/Libre/Compare'
import Calendar from './components/Libre/Calendar'
import DashboardLayout from './layout'

import { autoLogin } from '../../modules/login'

import './dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: this.props.match.path,
      pathname: this.props.location.pathname
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      path: nextProps.match.path,
      pathname: nextProps.location.pathname
    })
  }

  componentWillMount() {
    this.props.autoLogin().then(() => {
      this.setState({
        render: this.props.user && this.props.user.name
      })
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state ? true : false
  }

  render() {
    let component = null
    let tab = this.props.location.split('/')
    tab.splice(0,1) // remove first element because it's equal to ''

    if(tab[0] !== 'dashboard') {
      this.props.gotoHome()
    }

    if(tab[1] === 'home' && tab.length === 2) {
      component = <Accueil />
    }

    if(tab[1] === 'admin') {
      console.log("PROPS : ", this.props)

      if(tab[2] === 'users') component = <UsersList />
      if(tab[2] === 'paids') component = <Paids />
      if(tab[2] === 'spotlights') component = <Spotlights />
      if(tab[2] === 'material') component = <Material />
    }

    if(tab[1] === 'tournois' && tab.length === 4) {
      if(tab[3] === 'teams' && tab[2] !== "5" && tab[2] !== "6") {
        component = <Teams tournament={tab[2]} />
      }
      if(tab[3] === 'arbre-tournois') {
        component = <Tournament tournament={tab[2]} />
      }
      if(tab[3] === 'rules') {
        component = <Rules tournament={tab[2]} />
      }
      if(tab[3] === 'contact') {
        component = <Contact tournament={tab[2]} />
      }
      if(tab[3] === 'decks' && tab[2] === "5") {
        component = <HsDecks />
      }
      if(tab[3] === 'info') {
        component = <Info tournament={tab[2]} />
      }
      if(tab[3] === 'compare' && tab[2] === 'libre') {
        component = <Compare />
      }
      if(tab[3] === 'calendar' && tab[2] === 'libre') {
        component = <Calendar />
      }
    }

    if(component === null) {
      this.props.goToHome()
    }

    return (
      <DashboardLayout
        path={this.state.pathname}
        component={component}
      />
    )
  }
}

const mapStateToProps = state => ({
  location: state.routing.location.pathname,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin()),
  goToHome: () => dispatch(push('/dashboard/home'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
