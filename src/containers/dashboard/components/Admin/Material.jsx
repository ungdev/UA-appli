import React from 'react'
import { Table } from 'antd'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import { fetchUsers } from '../../../../modules/admin'
import { Object } from 'core-js';


class Material extends React.Component {
  constructor(props) {
    super(props)
    
    this.props.fetchUsers()
  }
  
  render() {
    let users = this.props.users

    let rows = []

    users.forEach(user => {
      console.log(user.material)
      Object.keys(user.material).map(function(objectKey, index) {
        var value = user.material[objectKey]

        if(typeof rows[index] === 'undefined') {
          rows[index] = {
            key: index,
            name: objectKey,
            value: 0,
            users: ''
          }
        }

        let count = null
        if(typeof value === 'boolean' && value === true) {
          count = 1
        }
        else if(typeof value === 'number' && value > 0) {
          count = value
        }

        if(count != null) {
          rows[index].value += count
          rows[index].users += rows[index].users === '' ? (user.name) : (", " + user.name)
        }
      })
    })

    const columns = [
      {
        title: 'Matériel',
        dataIndex: 'name',
        key: 'material'
      },
      {
        title: 'Nombre',
        dataIndex: 'value',
        key: 'count',
      },
      {
        title: 'Utilisateurs',
        dataIndex: 'users',
        key: 'users',
      }
    ]

    return (<React.Fragment>
      <AdminBar />
      <Table columns={columns} dataSource={rows} />
    </React.Fragment>)
  }
}
const mapStateToProps = state => ({
  users: state.admin.users
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(Material)
