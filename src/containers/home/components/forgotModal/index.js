import React from 'react'
import { connect } from 'react-redux'
import { Form, Text } from 'react-form'

import './forgotModal.css'

import Modal from '../../../../components/modal'
import Button from '../../../../components/button'

import { sendResetMail } from '../../../../modules/forgot'

class ForgotModal extends React.Component {
  constructor() {
    super()

    this.state = {
      loading: false
    }

    this.submit = this.submit.bind(this)
  }

  submit(user) {
    this.setState({ loading: true })

    this.props.sendMail(user)
      .then(() => this.setState({ loading: false }))
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
        <div className="a-forgot-modal">
          <Form
            onSubmit={this.submit}
            render={({ submitForm }) => (
              <form onSubmit={submitForm} className="a-forgot-form">
                <h3>Oubli de mot de passe</h3>
                <p>
                  Vous avez oublié votre mot de passe ? Entrez votre mail. Vous recevrez un lien pour
                  changer votre mot de passe.
                </p>
                <Text field="email" placeholder="E-mail" autoFocus />
                {this.state.loading && <div style={{margin: '12px 0 0 0'}}>Envoi en cours...</div>}
                <br />
                <Button type="submit" raised disabled={this.state.loading}>
                  Envoyer le code
                </Button>
              </form>
            )}
          />
        </div>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  sendMail: user => dispatch(sendResetMail(user))
})

export default connect(
  null,
  mapDispatchToProps
)(ForgotModal)
