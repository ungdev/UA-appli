import React from "react"
import { connect } from "react-redux"

import "./home.css"

import Intro from "./components/intro"

import { fetchCanLogin } from "../../modules/canLogin"
import { autoLogin } from "../../modules/login"
import { push } from "react-router-redux"

class Home extends React.Component {
  constructor() {
    super()

    this.state = {
      loginModalOpened: false,
      forgotModalOpened: false
    }

    // this.openLoginModal = this.openLoginModal.bind(this)
    // this.openForgotModal = this.openForgotModal.bind(this)
    // this.closeLoginModal = this.closeLoginModal.bind(this)
    // this.closeForgotModal = this.closeForgotModal.bind(this)
    this.scrollCapture = this.scrollCapture.bind(this)
    this.mainButon = this.mainButon.bind(this)
  }

  componentWillMount() {
    this.props.fetchCanLogin()
    this.props.autoLogin()

    document.addEventListener("scroll", this.scrollCapture, { passive: true })
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.scrollCapture)
  }

  scrollCapture() {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    const bottom = window.innerHeight + 90 - 12

    document.body.className =
      scrollTop >= document.body.scrollHeight - bottom ? "a-social-fixed" : ""
  }

  mainButon() {
    if (this.props.isLoggedIn) {
      this.props.gotoDashboard()
    } else {
      this.openLoginModal()
    }
  }

  render() {
    if (this.props.user) {
      this.props.gotoDashboard()
    }

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
