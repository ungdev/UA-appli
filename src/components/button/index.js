import React from 'react'
import classnames from 'classnames'

import './button.css'

const Button = props => {
  const classes = classnames('a-button', { raised: props.raised }, props.className)

  return (
    <button className={classes} type={props.type || 'button'} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
