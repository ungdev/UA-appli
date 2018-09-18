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

const baseUrl = process.env.REACT_APP_BASEURL

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      path: this.props.match.path,
      pathname: this.props.location.pathname
    }
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      path: nextProps.match.path,
      pathname: nextProps.location.pathname
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state ? true : false
  }

  render() {
    console.log(this.state.pathname)
    let component = '';
    switch (this.state.path) {
      case '/dashboard':
        component = <Accueil />;
        break;
      case '/dashboard/tournois/hearthstone/decks':
        component = <HsDecks />;
        break;
      case '/dashboard/tournois/:game/arbre-tournois':
        component = <Tournament />;
        break;
      case '/dashboard/tournois/:game/teams':
        component = <Teams />;
        break;
      case '/dashboard/tournois/:game/rules':
        component = <Rules />;
        break;
      case '/dashboard/tournois/:game/contact':
        component = <Contact />;
      default:
        break;
    }
    return (
      <DashboardLayout
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
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
