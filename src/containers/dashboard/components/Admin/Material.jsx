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

    let materialRows = []

    users.forEach(user => {
      let index = 0

      Object.keys(user.material).forEach(function(objectKey) {
        let value = user.material[objectKey]

        if(typeof materialRows[index] === 'undefined') {
          if(typeof materialRows[index] === 'string') {
            materialRows[index] = {
              key: index,
              material: objectKey,
              values: [],
              users: ''
            }
          }
          else {
            materialRows[index] = {
              key: index,
              material: objectKey,
              count: 0,
              users: ''
            }
          }
        }

        if(typeof value === 'boolean' && value === true) {
          materialRows[index].count += 1
          materialRows[index].users += (materialRows[index].users !== '' ? ', ' : '') + user.name
        }
        else if(typeof value === 'number' && value > 0) {
          materialRows[index].count += value
          materialRows[index].users += (materialRows[index].users !== '' ? ', ' : '') + user.name + ' (' + value + ')'
        }
        else if(typeof value === 'string' && value !== '' && value !== 'none') {
          let i = -1

          if(typeof materialRows[index].values === 'undefined') {
            materialRows[index].values = []
          }
          else {
            materialRows[index].values.forEach((v, j) => {
              if(v.value === value) {
                i = j
              }
            })
          }

          if(i === -1) {
            i = materialRows[index].values.length
          }

          if(typeof materialRows[index].values[i] === 'undefined') {
            materialRows[index].values[i] = {
              value: value,
              count: 0
            }
          }

          console.log('i : ', i)

          materialRows[index].values[i].count += 1
          materialRows[index].users += (materialRows[index].users !== '' ? ', ' : '') + user.name + ' (' + value + ')'
        }

        index++
      })
    })

    materialRows = materialRows.map(row => {
      if(typeof row.values !== 'undefined') {
        let count = ''

        row.values.forEach(value => {
          count += (count !== '' ? ', ' : '') + value.value + ' (' + value.count + ')'
        })

        return {
          key: row.key,
          material: row.material,
          count: count,
          users: row.users
        }
      }

      return row
    })

    let index = 0
    let userRows = users.map(user => {
      let material = ''
      Object.keys(user.material).forEach(function(objectKey, index) {
        var value = user.material[objectKey]

        if(typeof value === 'boolean' && value === true) {
          material += (material !== '' ? ', ' : '') + objectKey
        }
        else if((typeof value === 'number' && value > 0) || (typeof value === 'string' && value !== '' && value !== 'none')) {
          material += (material !== '' ? ', ' : '') + objectKey + ' (' + value + ')'
        }
      })

      return {
        key: index++,
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
        <Select.Option value="material"><Icon type="desktop" theme="outlined" style={{marginRight: '10px'}} />Par matériel</Select.Option>
        <Select.Option value="user"><Icon type="user" theme="outlined" style={{marginRight: '10px'}} />Par utilisateur</Select.Option>
      </Select>

      <br /><br />

      {this.state.by === 'material' && <Table columns={byMaterialColumns} dataSource={materialRows} />}
      {this.state.by === 'user' && <Table columns={byUserColumns} dataSource={userRows} />}
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
