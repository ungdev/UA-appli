import React from 'react'
import { Icon, Table, Select, Button, Spin } from 'antd'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import UserListActions from './components/UserListActions'
import { fetchUsers } from '../../../../modules/admin'

const Option = Select.Option

class UsersList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchName: null,
      searchTeam: null,
      searchPlace: null,
      selectedInfo: null
    }

    this.props.fetchUsers()
  }

  setSearchName = (v) => {
    this.setState({
      searchName: v
    })
  }

  clearSearchName = () => {
    this.setState({
      searchName: null
    })
  }

  setSearchTeam = (v) => {
    this.setState({
      searchTeam: v
    })
  }

  clearSearchTeam = () => {
    this.setState({
      searchTeam: null
    })
  }

  setSearchPlace = (v) => {
    this.setState({
      searchPlace: v
    })
  }

  clearSearchPlace = () => {
    this.setState({
      searchPlace: null
    })
  }

  selectChanged = (selectedInfo) => {
    this.setState({
      selectedInfo
    })
  }

  getTournamentNameById = (id) => {
    const spotlight = this.props.spotlights.find(spotlight => spotlight.id === id)
    return spotlight ? spotlight.shortName : id
  }
  
  render() {
    let { users } = this.props

    if (!users) {
      return <Spin />
    }

    users = users.map(user => {
      let role = ''
      if(user.permission && user.permission.admin) {
        role = '/Admin'
      }
      else if(user.permission && user.permission.respo) {
        role = `/Respo`
      }
      else if(role === '') {
        role = '/Joueur'
      }

      role = role.substr(1)

      return {
        ...user,
        fullname: `${user.name} (${user.firstname} ${user.lastname})`,
        role,
        spotlight: this.getTournamentNameById(user.spotlightId),
      }
    })

    let teams = []
    let places = []
    users.forEach(user => {
      if(!teams.includes(user.team)) {
        teams.push(user.team)
      }

      if(!places.includes(user.place)) {
        places.push(user.place)
      }
    })

    let rows = users
    if(this.state.searchName !== null) {
      rows = users.filter(user => user.fullname.includes(this.state.searchName))
    }
    if(this.state.searchTeam !== null) {
      rows = users.filter(user => user.team.includes(this.state.searchTeam))
    }
    if(this.state.searchPlace !== null) {
      rows = users.filter(user => user.place.includes(this.state.searchPlace))
    }

    let columns = [
      {
        title: 'Utilisateur',
        dataIndex: 'fullname',
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
        title: 'Email',
        dataIndex: 'email'
      },
      {
        title: 'Rôle',
        dataIndex: 'role',
        filters: [
          {
            text: 'Admin',
            value: 'Admin',
          },
          {
            text: 'Respo',
            value: 'Respo',
          },
          {
            text: 'Joueur',
            value: 'Joueur',
          }
        ],
        onFilter: (value, record) => record.role ? record.role.includes(value) : false
      },
      {
        title: 'Équipe',
        dataIndex: 'team',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Select
              showSearch
              placeholder="Nom de l'équipe"
              value={this.state.searchTeam !== null ? this.state.searchTeam : undefined}
              onChange={this.setSearchTeam}
              style={{ width: '200px' }}
            >
              {teams && teams.map((team, i) => <Select.Option value={team} key={i}>{team}</Select.Option>)}
            </Select>
            <Button type="primary" title="Réinitialiser" style={{ paddingRight: '10px', paddingLeft: '10px', marginLeft: '10px' }} onClick={this.clearSearchTeam}><Icon type="close"></Icon></Button>
          </div>
        ),
        filterIcon: <Icon type="filter" theme="filled" style={{ color: this.state.searchTeam !== null ? '#108ee9' : '#aaa' }} />
      },
      {
        title: 'Tournoi',
        dataIndex: 'spotlight',
        filters: [
          {
            text: 'LoL (pro)',
            value: 'LoL (pro)',
          },
          {
            text: 'LoL (amateur)',
            value: 'LoL (amateur)',
          },
          {
            text: 'Fortnite',
            value: 'Fortnite',
          },
          {
            text: 'CS:GO',
            value: 'CS:GO',
          },
          {
            text: 'Hearthstone',
            value: 'Hearthstone',
          },
          {
            text: 'SSBU',
            value: 'SSBU',
          },
          {
            text: 'osu!',
            value: 'osu!',
          }
        ],
        onFilter: (value, record) => record.spotlight === value,
      },
      {
        title: 'Place',
        dataIndex: 'place',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Select
              showSearch
              placeholder="Place du joueur"
              value={this.state.searchPlace !== null ? this.state.searchPlace : undefined}
              onChange={this.setSearchPlace}
              style={{ width: '200px' }}
            >
              {places && places.map((place, i) => <Select.Option value={place} key={i}>{place}</Select.Option>)}
            </Select>
            <Button type="primary" title="Réinitialiser" style={{ paddingRight: '10px', paddingLeft: '10px', marginLeft: '10px' }} onClick={this.clearSearchPlace}><Icon type="close"></Icon></Button>
          </div>
        ),
        filterIcon: <Icon type="filter" theme="filled" style={{ color: this.state.searchPlace !== null ? '#108ee9' : '#aaa' }} />
      },
      {
        title: 'A payé',
        dataIndex: 'paid',
        render: (paid) => {return paid ? <Icon type="check" /> : <Icon type="close" />},
        filters: [
          {
            text: 'Payé',
            value: 'true',
          },
          {
            text: 'Non payé',
            value: 'false',
          }
        ],
        onFilter: (value, record) => value === 'true' ? (record.paid) : (!record.paid)
      },
      {
        title: 'Actions',
        dataIndex: 'id',
        render: (id) => <UserListActions userId={id} users={this.props.users} />
      }
    ]

    columns = columns.filter(col => {
      if(col.dataIndex === 'fullname' || col.dataIndex === 'id' || (this.state.selectedInfo ? this.state.selectedInfo.includes(col.dataIndex) : false)) {
        return true
      }

      return false
    })

    return (
      <React.Fragment>
        <AdminBar/>
        <Select
          mode="multiple"
          onChange={this.selectChanged}
          placeholder="Informations affichées"
          style={{ minWidth: '200px', marginTop: '20px' }}
        >
          <Option value="email">Email</Option>
          <Option value="role">Rôle</Option>
          <Option value="team">Équipe</Option>
          <Option value="spotlight">Tournoi</Option>
          <Option value="place">Place</Option>
          <Option value="paid">A payé</Option>
        </Select>
        <Table
          columns={columns}
          dataSource={rows}
          locale={{ filterConfirm: 'Ok', filterReset: 'Réinitialiser', emptyText: 'Aucun résultat' }}
          style={{ marginTop: '20px' }} rowKey="id"
        />
      </React.Fragment>
    )
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
