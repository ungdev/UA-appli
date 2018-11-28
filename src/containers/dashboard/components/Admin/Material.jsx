import React from 'react'
import { Table, Select, Icon, Button, Tabs } from 'antd'
import { connect } from 'react-redux'
import { Object } from 'core-js';

import AdminBar from './AdminBar'
import { fetchUsers } from '../../../../modules/admin'

const TabPane = Tabs.TabPane

class Material extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      searchName: null
    }

    this.setSearchName = this.setSearchName.bind(this)
    this.clearSearchName = this.clearSearchName.bind(this)

    this.props.fetchUsers()
  }

  setSearchName(v) {
    this.setState({
      searchName: v
    })
  }

  clearSearchName() {
    this.setState({
      searchName: null
    })
  }

  render() {
    let users = this.props.users

    if (!users) {
      this.props.gotoHome()
    }

    // Get users material and fullname
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
          fullname : `${user.name} (${user.firstname} ${user.lastname})`,
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
        fullname: user.fullname,
        material: material
      })
    })

    if(this.state.searchName !== null) {
      byUserRows = byUserRows.filter(row => row.fullname.includes(this.state.searchName))
    }

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
      }
    ]

    // By user columns
    const byUserColumns = [
      {
        title: 'Utilisateur',
        dataIndex: 'fullname',
        key: 'fullname',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Select
              showSearch
              placeholder="Nom d'utilisateur"
              value={this.state.searchName !== null ? this.state.searchName : undefined}
              onChange={this.setSearchName}
              style={{ width: '200px' }}
            >
              {users.map((user, i) => <Select.Option value={user.fullname} key={i}>{user.fullname}</Select.Option>)}
            </Select>
            <Button type="primary" title="Réinitialiser" style={{ paddingRight: '10px', paddingLeft: '10px', marginLeft: '10px' }} onClick={this.clearSearchName}><Icon type="close"></Icon></Button>
          </div>
        ),
        filterIcon: <Icon type="filter" theme="filled" style={{ color: this.state.searchName !== null ? '#108ee9' : '#aaa' }} />
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

      <Tabs defaultActiveKey="1">
        <TabPane tab="Matériel" key="1">
          <Table
            columns={byMaterialColumns}
            dataSource={byMaterialRows}
            expandedRowRender={record => <p style={{ margin: 0 }}>{record.users || <span style={{ color: '#aaa' }}>(Vide)</span>}</p>}
            locale={{ emptyText: 'Aucun résultat' }}
          />
        </TabPane>
        <TabPane tab="Utilisateurs" key="2">
          <Table
            columns={byUserColumns}
            dataSource={byUserRows}
            locale={{ emptyText: 'Aucun résultat' }}
          />
        </TabPane>
      </Tabs>
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
