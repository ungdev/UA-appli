import React from 'react'

import './statusBadge.css'

const StatusButton = props => (
  <div className="a-status-badge" theme={props.theme}>
    {props.children}
  </div>
)

export default StatusButton
