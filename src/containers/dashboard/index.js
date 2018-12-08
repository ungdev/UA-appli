import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Accueil from './components/Accueil'
import HsDecks from './components/hs/HsDecks'
import MyHsDecks from './components/hs/MyHsDecks'
import Tournament from './components/Tournament'
import Teams from './components/Teams/Teams'
import Players from './components/Players/Players'
import Rules from './components/Rules/Rules'
import Info from './components/Info/Info'
import Contact from './components/Contact/Contact'
import UsersList from './components/Admin/UsersList'
import Paids from './components/Admin/Paids'
import Spotlights from './components/Admin/Spotlights'
import Material from './components/Admin/Material'
import Places from './components/Admin/Places'
import Validate from './components/Orga/Validate'
import Payment from './components/Orga/Payment'
import Compare from './components/Libre/Compare'
import Calendar from './components/Libre/Calendar'
import DashboardLayout from './layout'
import Messenger from './components/Messenger/Messenger'
import Conversations from './components/Conversations/Conversations'
import Scanned from './components/Respo/Scanned'

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
    this.props.autoLogin()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state ? true : false
  }

  render() {
    let component = null
    let tab = this.props.location.split('/')
    tab.splice(0,1) // remove first element because it's equal to ''

    if(tab[0] !== 'dashboard') {
      this.props.goToHome()
    }
    
    if(tab[1] === 'home' && tab.length === 2) component = <Accueil />
    if(tab[1] === 'tournois' && tab.length === 4) {
      if(tab[3] === 'teams' && tab[2] !== "5" && tab[2] !== "6" && tab[2] !== "7") component = <Teams tournament={tab[2]} />
      if(tab[3] === 'players' && (tab[2] === "5" || tab[2] === "6" || tab[2] === "7" || tab[2] === "libre")) component = <Players tournament={tab[2]} />
      if(tab[3] === 'arbre-tournois') component = <Tournament tournament={tab[2]} />
      if(tab[3] === 'rules') component = <Rules tournament={tab[2]} />
      if(tab[3] === 'contact') component = <Contact tournament={tab[2]} />
      if(tab[3] === 'decks' && tab[2] === "5") component = <HsDecks />
      if(tab[3] === 'mydecks' && tab[2] === "5") component = <MyHsDecks />
      if(tab[3] === 'info') component = <Info tournament={tab[2]} />
      if(tab[3] === 'compare' && tab[2] === 'libre') component = <Compare />
      if(tab[3] === 'calendar' && tab[2] === 'libre') component = <Calendar />
    }

    if(tab[1] === 'admin') {
      let user = this.props.user

      if(user) {
        if(user.permission && user.permission.admin) {
          if(tab[2] === 'users') component = <UsersList />
          if(tab[2] === 'paids') component = <Paids />
          if(tab[2] === 'spotlights') component = <Spotlights />
          if(tab[2] === 'conversations') component = <Conversations />
          if(tab[2] === 'messages') component = <Messenger idTo={tab[3]}/>
          if(tab[2] === 'material') component = <Material />
          if(tab[2] === 'places') component = <Places />
          if(tab[2] === 'scanned') component = <Scanned />
        }
        else {
          this.props.goToHome()
        }
      }
    }


    if(tab[1] === 'respo') {
      let user = this.props.user

      if(user) {
        if(user.permission && user.permission.respo) {
          if(tab[2] === 'conversations') component = <Conversations />
          if(tab[2] === 'messages') component = <Messenger idTo={tab[3]} />
          if(tab[2] === 'scanned') component = <Scanned />
        }
        else {
          this.props.goToHome()
        }
      }
    }

    if(tab[1] === 'orga') {
      let user = this.props.user

      if(user) {
        if(user.permission) {
          if(user.permission.permission.includes('validate') || user.permission.admin) {
            if(tab[2] === 'validate') component = <Validate />
          }
          if(user.permission.permission.includes('payment') || user.permission.admin) {
            if(tab[2] === 'payment') component = <Payment />
          }
          else {
            this.props.goToHome()
          }
        }
        else {
          this.props.goToHome()
        }
      }
    }
    
    if(tab[1] === 'messages' && tab.length === 2) component = <Messenger />
    // if(tab[1] === 'conversations' && tab.length === 2) component = <Conversations />

    if(component === null) {      
      return null
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
