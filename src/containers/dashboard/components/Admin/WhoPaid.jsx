import React from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'

class WhoPaid extends React.Component {

  render() {
    const { paid } = this.props
    return (
        <React.Fragment>
          { paid ? <Icon type="check"/> : <Icon type="close"/>}
        </React.Fragment>)
  }
}

const mapDispatchToProps = dispatch => ({
    
  })

export default connect(
    null,
    mapDispatchToProps)(WhoPaid)