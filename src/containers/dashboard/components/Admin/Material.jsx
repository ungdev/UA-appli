import React from 'react'
import { Table, Select, Icon, Button } from 'antd'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import { fetchUsers } from '../../../../modules/admin'
import { Object } from 'core-js';


class Material extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      by: 'material',
      search: null
    }

    this.props.fetchUsers()

    this.mainSelectChanged = this.mainSelectChanged.bind(this)
    this.searchSelectChanged = this.searchSelectChanged.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
  }
  
  mainSelectChanged(e) {
    this.setState({
      by: e,
      search: null
    })
  }

  searchSelectChanged(v) {
    this.setState({
      search: v
    })
  }

  clearSearch() {
    this.setState({
      search: null
    })
  }

  render() {
    let users = this.props.users

    // Get users material
    users = users.map(user => {
      let material = []

      if(user.orders) {
        user.orders.forEach(order => {
          if(order.paid === true) {
            Object.keys(order.material).forEach(key => {
              let value = order.material[key]

              if(typeof material[key] === 'undefined') {
                if(typeof value === 'boolean' || typeof value === 'number') {
                  material[key] = 0
                }
                else {
                  material[key] = []
                }
              }

              if(typeof value === 'boolean' && value === true) {
                material[key]++
              }
              else if(typeof value === 'number' && value > 0) {
                material[key] += value
              }
              else if(typeof value === 'string' && value !== '' && value !== 'none') {
                if(typeof material[key][value] === 'undefined') {
                  material[key][value] = 0
                }

                material[key][value]++
              }
            })
          }
        })

        return {
          ...user,
          material: material
        }
      }

      return user
    })

    // By material rows
    let byMaterialRows = []
    let materials = []

    users.forEach(user => {
      if(user.material) {
        Object.keys(user.material).forEach(key => {
          let value = user.material[key]

          if(typeof materials[key] === 'undefined') {
            if(Array.isArray(value)) {
              materials[key] = {
                material: key,
                values: [],
                users: ''
              }
            }
            else {
              materials[key] = {
                material: key,
                count: 0,
                users: ''
              }
            }
          }

          if(typeof value === 'boolean' && value === true) {
            materials[key].count++
            materials[key].users += (materials[key].users !== '' ? ', ' : '') + user.name
          }
          else if(typeof value === 'number' && value > 0) {
            materials[key].count += value
            materials[key].users += (materials[key].users !== '' ? ', ' : '') + user.name + ' (' + value + ')'
          }
          else if(Array.isArray(value)) {
            Object.keys(value).forEach(v => {
              if(typeof materials[key].values[v] === 'undefined') {
                materials[key].values[v] = 0
              }

              materials[key].values[v] += value[v]
              
              if(materials[key].users.indexOf(user.name) === -1) {
                let userValues = ''
                Object.keys(value).forEach(k => {
                  userValues += (userValues !== '' ? ', ' : '') + k + (value[k] !== 1 ? ' (' + value[k] + ')' : '')
                })

                materials[key].users += (materials[key].users !== '' ? ', ' : '') + user.name + ' (' + userValues + ')'
              }
            })
          }
        })
      }
    })

    let i = 0
    Object.keys(materials).forEach(key => {
      let count = ''
      let materialValues = materials[key].values

      if(typeof materialValues !== 'undefined') {
        Object.keys(materialValues).forEach(k => {
          count += (count !== '' ? ', ' : '') + k + (materialValues[k] !== 1 ? ' (' + materialValues[k] + ')' : '')
        })
      }
      else {
        count = materials[key].count
      }

      byMaterialRows.push({
        key: i++,
        material: materials[key].material,
        count: count,
        users: materials[key].users
      })
    })

    // By user rows
    let byUserRows = []

    users.forEach((user, i) => {
      let material = ''

      Object.keys(user.material).forEach(key => {
        let value = user.material[key]

        if(typeof value === 'object') {
          let values = ''

          Object.keys(value).forEach(k => {
            values += (values !== '' ? ', ' : '') + k + (value[k] !== 1 ? ' (' + value[k] + ')' : '')
          })

          if(values !== '') {
            material += (material !== '' ? ', ' : '') + key + ' (' + values + ')'
          }
        }
        else {
          if(value !== 0) {
            material += (material !== '' ? ', ' : '') + key + ' (' + value + ')'
          }
        }
      })

      byUserRows.push({
        key: i,
        name: user.name,
        material: material
      })
    })

    byUserRows = byUserRows.filter(row => this.state.search !== null ? (row.name.toLowerCase() === this.state.search.toLowerCase()) : true)

    // By material columns
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

    // By user columns
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

    // ---------

    return (<React.Fragment>
      <AdminBar />

      <br />

      <p>Affichage :</p>
      <Select defaultValue="material" onChange={this.mainSelectChanged}>
        <Select.Option value="material"><Icon type="desktop" theme="outlined" style={{marginRight: '10px'}} />Par matériel</Select.Option>
        <Select.Option value="user"><Icon type="user" theme="outlined" style={{marginRight: '10px'}} />Par utilisateur</Select.Option>
      </Select>

      <br /><br />

      {this.state.by === 'material' && <Table columns={byMaterialColumns} dataSource={byMaterialRows} locale={{ emptyText: 'Aucun résultat' }} />}
      {this.state.by === 'user' && (
        <React.Fragment>
          <Select
            showSearch
            style={{ width: '200px' }}
            placeholder="Rechercher un joueur"
            onChange={this.searchSelectChanged}
            value={this.state.search ? this.state.search : undefined}
          >
            {users.map(user => <Select.Option value={user.name}>{user.name}</Select.Option>)}
          </Select>
          <Button style={{ paddingRight: '10px', paddingLeft: '10px', marginLeft: '10px' }} onClick={this.clearSearch}><Icon type="close"></Icon></Button>
          <Table columns={byUserColumns} dataSource={byUserRows} locale={{ emptyText: 'Aucun résultat' }} style={{ marginTop: '20px' }} />
        </React.Fragment>
      )}
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
