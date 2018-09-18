import React from 'react'
import classnames from 'classnames'

import './list-item.css'

const ListItem = props => {
  const classes = classnames('a-list-item', { active: props.active })

  const price = props.price ? `${props.price}€` : null

  const mouse = !props.clickable ? { nomouse: 'true' } : {}

  return (
    <li className={classes} onClick={props.onClick} data-price={price} {...mouse}>
      {props.children}
    </li>
  )
}

export default ListItem
