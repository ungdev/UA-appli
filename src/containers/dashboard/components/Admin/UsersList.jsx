import React from 'react'
import { Input, Icon, Table } from 'antd'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import UserListActions from './UserListActions'
import { fetchUsers } from '../../../../modules/admin'


class UsersList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
    }
    this.props.fetchUsers()
  }
  handleSearch = (e) => {
    this.setState({ searchText: e.target.value })
  }

  filterRole = (record, value) => {
    return record.role ? record.role.includes(value) : false
  }
  getTournamentNameById = (id) => {
    const spotlight = this.props.spotlights.find(spotlight => spotlight.id === id)
    return spotlight ? spotlight.shortName : id
  }
  
  render() {
    let { users } = this.props
    console.log(users)
    users = users.map(user => {
      let role = ''
      if(user.isAdmin === 100) role = '/Admin'
      if(user.respo && user.respo !== 0) role = `${role}/Respo ${this.getTournamentNameById(user.respo)}`
      if((!user.respo || (user.respo && user.respo === 0)) && user.isAdmin !== 100) role = '/Joueur'
      role = role.substr(1)
      return {
        ...user,
        fullname: `${user.name} (${user.firstname} ${user.lastname})`,
        role,
        spotlight: this.getTournamentNameById(user.spotlightId),
      }
    })
    users = users.filter(user => user.fullname.includes(this.state.searchText))
    const columns = [{
        title: 'utilisateur',
        dataIndex: 'fullname',
        key: 'fullname',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              placeholder="Search name"
              value={this.state.searchText}
              onChange={this.handleSearch}
            />
          </div>
        ),
        filterIcon: <Icon type="filter" style={{ color: this.state.searchText !== '' ? '#108ee9' : '#aaa' }} />,
      }, {
        title: 'Mail',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: 'Rôle',
        dataIndex: 'role',
        key: 'role',
        filters: [{
          text: 'Admin',
          value: 'Admin',
        }, {
          text: 'Respo Tournoi',
          value: 'Respo',
        }, {
          text: 'Joueur',
          value: 'Joueur',
        }],
        onFilter: (value, record) => this.filterRole(record, value),
      }, {
        title: 'Équipe',
        dataIndex: 'team',
        key: 'team',
      }, {
        title: 'Tournoi',
        dataIndex: 'spotlight',
        key: 'spotlight',
        filters: [{
          text: 'LoL (pro)',
          value: 'LoL (pro)',
        }, {
          text: 'LoL (amateur)',
          value: 'LoL (amateur)',
        }, {
          text: 'Fortnite',
          value: 'Fortnite',
        }, {
          text: 'CS:GO',
          value: 'CS:GO',
        }, {
          text: 'Hearthstone',
          value: 'Hearthstone',
        }, {
          text: 'SSBU',
          value: 'SSBU',
        }],
        onFilter: (value, record) => record.spotlight === value,
      },{
        title: 'Actions',
        key: 'action',
        dataIndex: 'id',
        render: (id) => <UserListActions userId={id} users={this.props.users}/>
      },
    ]
    return (<React.Fragment>
      <AdminBar/>
      <Table columns={columns} dataSource={users} />
    </React.Fragment>)
  }
}
const mapStateToProps = state => ({
  users: state.admin.users,
  spotlights: state.spotlights.spotlights
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(UsersList)
