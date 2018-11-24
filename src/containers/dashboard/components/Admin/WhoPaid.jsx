import React from 'react'
import { Icon } from 'antd'

class WhoPaid extends React.Component {

  render() {
    const { paid } = this.props
    return (
        <React.Fragment>
          { paid ? <Icon type="check"/> : <Icon type="close"/>}
        </React.Fragment>)
  }
}

export default WhoPaid