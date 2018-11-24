import React from "react"
import { connect } from "react-redux"

import "./home.css"

import Intro from "./components/intro"

import { fetchCanLogin } from "../../modules/canLogin"
import { autoLogin } from "../../modules/login"
import { push } from "react-router-redux"

class Home extends React.Component {
  componentWillMount() {
    this.props.fetchCanLogin()
    this.props.autoLogin()
  }

  componentDidUpdate() {
    if (this.props.user) {
      this.props.gotoDashboard()
    }
  }

  render() {
    return (
      <div>
        <Intro />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  isLoggedIn: state.login.token && state.login.token.length > 0
})

const mapDispatchToProps = dispatch => ({
  fetchCanLogin: () => dispatch(fetchCanLogin()),
  autoLogin: () => dispatch(autoLogin()),
  gotoDashboard: () => dispatch(push("/dashboard/home"))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
