import React, { Component } from 'react'
import { connect } from 'react-redux'
import './dashboard.css'



import Accueil from './components/Accueil'
import HsDecks from './components/hs/HsDecks'
import Tournament from './components/Tournament'
import Teams from './components/Teams/Teams'
import Rules from './components/Rules/Rules'
import Contact from './components/Contact/Contact'
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
    let component = ''
    let tab = this.props.location.split('/')
    if(tab[1] === 'dashboard' && tab.length === 2) component = <Accueil />
    if(tab[1] === 'dashboard' && tab.length === 5 && tab[2] === 'tournois') {
      if(tab[4] === 'teams') component = <Teams tournament={tab[3]} />
      if(tab[4] === 'arbre-tournois') component = <Tournament tournament={tab[3]} />
      if(tab[4] === 'rules') component = <Rules tournament={tab[3]} />
      if(tab[4] === 'contact') component = <Contact tournament={tab[3]} />
      if(tab[4] === 'decks' && tab[3] == 2) component = <HsDecks />
    }
     //   component = <HsDecks />
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
  autoLogin: () => dispatch(autoLogin())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
