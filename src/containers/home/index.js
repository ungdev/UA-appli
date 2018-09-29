import React from 'react'
import { connect } from 'react-redux'

import './home.css'

import Header from './components/header'
import Intro from './components/intro'
import Informations from './components/informations'
import Category from './components/category'
import Social from './components/social'
import Spotlights from './components/spotlights'
import Partners from './components/partners'
import LoginModal from './components/loginModal'
import ForgotModal from './components/forgotModal'
import Button from '../../components/button'

import { fetchCanLogin } from '../../modules/canLogin'
import { autoLogin } from '../../modules/login'
import { push } from 'react-router-redux'

class Home extends React.Component {
  constructor() {
    super()

    this.state = {
      loginModalOpened: false,
      forgotModalOpened: false
    }

    this.openLoginModal = this.openLoginModal.bind(this)
    this.openForgotModal = this.openForgotModal.bind(this)
    this.closeLoginModal = this.closeLoginModal.bind(this)
    this.closeForgotModal = this.closeForgotModal.bind(this)
    this.scrollCapture = this.scrollCapture.bind(this)
  }

  componentWillMount() {
    this.props.fetchCanLogin()
    this.props.autoLogin()

    document.addEventListener('scroll', this.scrollCapture, { passive: true })
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollCapture)
  }

  openLoginModal() {
    this.setState({
      loginModalOpened: true
    })
  }

  closeLoginModal() {
    this.setState({
      loginModalOpened: false
    })
  }

  openForgotModal() {
    this.setState({
      loginModalOpened: false,
      forgotModalOpened: true
    })
  }

  closeForgotModal() {
    this.setState({
      loginModalOpened: true,
      forgotModalOpened: false
    })
  }

  scrollCapture() {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

    const bottom = window.innerHeight + 90 - 12

    document.body.className =
      scrollTop >= document.body.scrollHeight - bottom ? 'a-social-fixed' : ''
  }

  render() {
    if(this.props.user) {
      this.props.gotoDashboard()
    }
    return (
      <div>
        <Header openLoginModal={this.openLoginModal} />
        <Intro />
        <LoginModal
          isOpen={this.state.loginModalOpened}
          onClose={this.closeLoginModal}
          onForgot={this.openForgotModal}
        />
        <ForgotModal isOpen={this.state.forgotModalOpened} onClose={this.closeForgotModal} />

        <main className="a-home">
          <div className="a-home__content">
            <Category id="informations">Informations</Category>
            <Informations />
            <Button raised={true}>C'est parti !</Button>
            <div className="a-home__map">
              <iframe
                height="320"
                title="Google Maps"
                src="https://maps.google.com/maps?q=UTT Arena&t=&z=17&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
              />

              <p>Vous pouvez vous rendre à Troyes par le train ou par l'A5.</p>
            </div>
            <Category id="spotlights">Tournois</Category>
            <Spotlights />
          </div>
          <Partners />
          <div className="a-home__content a-home__footer">
            <div>
              © UTT Net Group
              <a href="/mentions">Mentions légales</a>
            </div>
            <div>
              <a href={`mailto:${process.env.REACT_APP_CONTACT_MAIL}`}>
                {process.env.REACT_APP_CONTACT_MAIL}
              </a>
            </div>
            <div>
              <a href={`tel:${process.env.REACT_APP_CONTACT_PHONE}`}>
                {process.env.REACT_APP_CONTACT_PHONE}
              </a>
            </div>
          </div>
        </main>

        <Social />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fetchCanLogin: () => dispatch(fetchCanLogin()),
  autoLogin: () => dispatch(autoLogin()),
  gotoDashboard: () => dispatch(push('/dashboard/home'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
