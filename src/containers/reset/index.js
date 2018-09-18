import React from 'react'
import { Form, Text } from 'react-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import './reset.css'

import Button from '../../components/button'
import Header from '../../components/header'

import { resetPassword } from '../../modules/forgot'

const Reset = props => (
  <div>
    <Header arrow="/" />
    <Form
      defaultValues={{
        token: props.match.params.token
      }}
      onSubmit={props.resetPassword}
      render={({ submitForm }) => (
        <form onSubmit={submitForm} className="a-reset">
          <h2>Changer mon mot de passe</h2>
          <Text field="password" type="password" placeholder="Mot de passe" minLength="6" />
          <Text field="password2" type="password" placeholder="Confirmation" minLength="6" />
          <br />
          <Button type="submit" raised>
            Changer mon mot de passe
          </Button>
        </form>
      )}
    />
  </div>
)

const mapDispatchToProps = dispatch => ({
  resetPassword: user =>
    dispatch(resetPassword(user)).then(() => {
      setTimeout(() => {
        dispatch(push('/'))
      }, 2000)
    })
})

export default connect(
  null,
  mapDispatchToProps
)(Reset)
