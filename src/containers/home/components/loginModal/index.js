import React from 'react'
import { connect } from 'react-redux'
import { Form, Text } from 'react-form'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import './loginModal.css'

import Modal from '../../../../components/modal'
import Button from '../../../../components/button'

import { register } from '../../../../modules/register'
import { tryLogin } from '../../../../modules/login'
import { fetchUser } from '../../../../modules/user'

class LoginModal extends React.Component {
  constructor() {
    super()

    this.state = {
      tabIndex: 0,
      loading: false
    }

    this.setTabIndex = this.setTabIndex.bind(this)
    this.submit = this.submit.bind(this)
  }

  setTabIndex(tabIndex) {
    this.setState({
      tabIndex
    })
  }

  submit(user) {
    this.setState({
      loading: true
    })

    this.props.register(user)
      .then(() => this.setState({ loading: false, tabIndex: 0 }))
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
        {this.props.canLogin && (
          <div className="a-login-modal">
            <Tabs selectedIndex={this.state.tabIndex} onSelect={this.setTabIndex}>
              <TabList>
                <Tab>Connexion</Tab>
                <Tab>Inscription</Tab>
              </TabList>

              <TabPanel>
                <Form
                  onSubmit={this.props.login}
                  render={({ submitForm }) => (
                    <form onSubmit={submitForm} className="a-login-form">
                      <Text field="name" placeholder="Nom d'utilisateur" autoFocus />
                      <Text field="password" type="password" placeholder="Mot de passe" />
                      <span className="forgot" onClick={this.props.onForgot}>
                        Mot de passe oublié ?
                      </span>
                      <br />
                      <Button type="submit" raised>
                        Connexion
                      </Button>
                    </form>
                  )}
                />
              </TabPanel>
              <TabPanel>
                <Form
                  onSubmit={this.submit}
                  render={({ submitForm }) => (
                    <form onSubmit={submitForm} className="a-register-form">
                      <Text
                        field="name"
                        placeholder="Nom d'utilisateur"
                        pattern="[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽa-záčďéěíňóřšťúůýž]+"
                        minLength="3"
                        maxLength="90"
                        autoFocus
                      />
                      <Text
                        field="fullname"
                        placeholder="Prénom Nom"
                        pattern="[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽa-záčďéěíňóřšťúůýž \-]+ [0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽa-záčďéěíňóřšťúůýž \-]+"
                        minLength="3"
                        maxLength="200"
                      />
                      <Text field="email" type="email" placeholder="Mail" />
                      <Text
                        field="password"
                        type="password"
                        placeholder="Mot de passe"
                        minLength="6"
                      />
                      <Text
                        field="password2"
                        type="password"
                        placeholder="Confirmation"
                        minLength="6"
                      />
                      {this.state.loading && <div style={{ margin: '12px 0 0 0' }}>Envoi en cours...</div>}
                      <br />
                      <Button type="submit" raised>
                        Inscription
                      </Button>
                    </form>
                  )}
                />
              </TabPanel>
            </Tabs>
          </div>
        )}
        {!this.props.canLogin && (
          <div className="a-cantlogin-modal">Connexion désactivée pour le moment.</div>
        )}
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  canLogin: state.canLogin.canLogin
})

const mapDispatchToProps = dispatch => ({
  login: user => {
    dispatch(tryLogin(user)).then(() => {
      dispatch(fetchUser())
    })
  },
  register: user => dispatch(register(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal)
