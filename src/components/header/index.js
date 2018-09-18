import React from 'react'
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'

import './header.css'

import logo from '../../assets/ua2018.small.png'

const Header = props => {
  const click = props.arrow === 'back' ? props.back : props.to.bind(null, props.arrow)

  const returnArrow = props.arrow && (
    <div className="a-header__arrow-container" onClick={click}>
      <div className="a-header__arrow-container__arrow" />
    </div>
  )

  return (
    <div className="a-header">
      {returnArrow}
      <div className="a-header__logo">
        <img src={logo} alt="UA 2018 Logo" height="150" width="150" />
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    to: to => dispatch(push(to)),
    back(e) {
      e && e.preventDefault()
      dispatch(goBack())
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Header)
