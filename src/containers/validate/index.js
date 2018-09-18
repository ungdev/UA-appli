import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import './validate.css'

import Header from '../../components/header'

import { validate } from '../../modules/register'

let hasCalledValidate = false

const Validate = props => {
  if (!hasCalledValidate) {
    hasCalledValidate = true
    props.validate(props.match.params.token)
  }

  return (
    <div>
      <Header arrow="/" />
      <div className="a-validate">Validation en cours</div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  validate: token => {
    return dispatch(validate(token)).then(() => {
      setTimeout(() => {
        dispatch(push('/dashboard'))
      }, 1000)
    })
  }
})

export default connect(
  null,
  mapDispatchToProps
)(Validate)
