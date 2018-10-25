import React from 'react'
import { Table, Select, Icon } from 'antd'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import { fetchUsers } from '../../../../modules/admin'
import { Object } from 'core-js';


class Material extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      by: 'material'
    }

    this.props.fetchUsers()

    this.selectChanged = this.selectChanged.bind(this)
  }
  
  selectChanged(e) {    
    this.setState({
      by: e
    })
  }

  render() {
    let users = this.props.users

    let byMaterialRows = []

    users.forEach(user => {
      Object.keys(user.material).map(function(objectKey, index) {
        var value = user.material[objectKey]

        if(typeof byMaterialRows[index] === 'undefined') {
          byMaterialRows[index] = {
            key: index,
            material: objectKey,
            count: 0,
            users: ''
          }
        }

        if(typeof value === 'boolean' && value === true) {
          byMaterialRows[index].count += 1
          byMaterialRows[index].users += (byMaterialRows[index].users !== '' ? ', ' : '') + user.name
        }
        else if(typeof value === 'number' && value > 0) {
          byMaterialRows[index].count += value
          byMaterialRows[index].users += (byMaterialRows[index].users !== '' ? ', ' : '') + user.name + ' (' + value + ')'
        }
      })
    })

    let byUserRows = users.map(user => {
      let material = ''
      Object.keys(user.material).map(function(objectKey, index) {
        var value = user.material[objectKey]

        if(typeof value === 'boolean' && value === true) {
          material += (material !== '' ? ', ' : '') + objectKey
        }
        else if(typeof value === 'number' && value > 0) {
          material += (material !== '' ? ', ' : '') + objectKey + ' (' + value + ')'
        }
      })

      return {
        name: user.name,
        material: material
      }
    })

    const byMaterialColumns = [
      {
        title: 'Matériel',
        dataIndex: 'material',
        key: 'material'
      },
      {
        title: 'Nombre',
        dataIndex: 'count',
        key: 'count',
      },
      {
        title: 'Utilisateurs',
        dataIndex: 'users',
        key: 'users',
      }
    ]

    const byUserColumns = [
      {
        title: 'Utilisateur',
        dataIndex: 'name',
        key: 'user',
      },
      {
        title: 'Matériel',
        dataIndex: 'material',
        key: 'material'
      }
    ]

    return (<React.Fragment>
      <AdminBar />

      <br />

      <p>Affichage :</p>
      <Select defaultValue="material" onChange={this.selectChanged}>
        <Select.Option value="material">Par matériel</Select.Option>
        <Select.Option value="user">Par utilisateur</Select.Option>
      </Select>

      <br /><br />

      {this.state.by === 'material' && <Table columns={byMaterialColumns} dataSource={byMaterialRows} />}
      {this.state.by === 'user' && <Table columns={byUserColumns} dataSource={byUserRows} />}
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
