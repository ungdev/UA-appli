import React from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { setAdmin, removeAdmin } from '../../../../modules/admin'

class UserListActions extends React.Component {

  setAdmin = () => {
    this.props.setAdmin(this.props.userId)
  }

  removeAdmin = () => {
    this.props.removeAdmin(this.props.userId)
  }

  render() {
    const { users, userId } = this.props
    const user = users.find(u => u.id === userId)
    return (
      <React.Fragment>
      {user && user.isAdmin !== 100 ? <a onClick={this.setAdmin}><Icon type="arrow-up"/></a> : null}
      {user && user.isAdmin === 100 ? <a onClick={this.removeAdmin} style={{ color: '#ff0000'}}><Icon type="arrow-down"/></a> : null}
      </React.Fragment>)
  }
}

const mapDispatchToProps = dispatch => ({
  setAdmin: (id) => dispatch(setAdmin(id)),
  removeAdmin: (id) => dispatch(removeAdmin(id))
})


export default connect(
    null,
    mapDispatchToProps)(UserListActions)
