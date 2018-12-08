import React from 'react'
import { Icon, Table, Select, Button, Spin, Checkbox, Input, Tooltip, Card } from 'antd'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import UserListActions from './components/UserListActions'
import { fetchUsers } from '../../../../modules/admin'

const InputGroup = Input.Group

class UsersList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: {
        fullname: [],
        email: [],
        role: [],
        team: [],
        spotlight: [],
        place: [],
        paid: [],
        scanned: []
      },
      displayInfo: ['team', 'spotlight', 'paid']
    }

    this.props.fetchUsers()
  }

  setSearch = (searchField, searchValue) => {
    let search = this.state.search
    search[searchField] = searchValue

    this.setState({
      search
    })
  }

  clearSearch = (searchField) => {
    let search = this.state.search
    search[searchField] = []

    this.setState({
      search
    })
  }

  displayInfoChanged = (displayInfo) => {
    // Unset hidden filters
    this.state.displayInfo.forEach(key => {
      if(!displayInfo.includes(key)) {
        this.clearSearch(key)
      }
    })

    this.setState({
      displayInfo
    })
  }

  getTournamentNameById = (id) => {
    const spotlight = this.props.spotlights.find(spotlight => spotlight.id === id)
    return spotlight ? spotlight.shortName : id
  }
  
  render() {
    let { users } = this.props
    const { search } = this.state

    if (!users) {
      return <Spin />
    }

    // Get users fullname, role and spotlight
    users = users.map(user => {
      let role = ''
      if(user.permission && user.permission.admin) {
        role = 'Admin'
      }
      else if(user.permission && user.permission.respo) {
        role = `Respo`
      }
      else if(user.permission && user.permission.permission) {
        role = `Orga`
      }
      else {
        role = 'Joueur'
      }

      return {
        ...user,
        fullname: `${user.name} (${user.firstname} ${user.lastname})`,
        role,
        spotlight: this.getTournamentNameById(user.spotlightId),
      }
    })
    
    // Get different teams, emails, spotlights and places
    let teams = []
    let emails = []
    let spotlights = []
    let places = []
    users.forEach(user => {
      if(!teams.includes(user.team) && user.spotlight !== '/') {
        teams.push(user.team)
      }
      
      if(!emails.includes(user.email)) {
        emails.push(user.email)
      }
      
      if(!spotlights.includes(user.spotlight) && user.spotlight !== '/') {
        spotlights.push(user.spotlight)
      }

      if(!places.includes(user.place) && user.place !== '') {
        places.push(user.place)
      }
    })
    // Sort teams and places
    teams.sort((team1, team2) => team1.toLowerCase() > team2.toLowerCase())
    emails.sort((email1, email2) => email1.toLowerCase() > email2.toLowerCase())
    spotlights.sort()
    places.sort()

    // Apply filters
    let rows = users
    Object.keys(search).forEach(key => {
      if(search[key].length > 0) {
        rows = rows.filter(user => {
          let included = false

          search[key].forEach(searchValue => {
            if(typeof user[key] === 'string') {
              if(searchValue === ' ' && user[key] === '') {
                included = true
              }
              else if(user[key].toLowerCase().includes(searchValue.toLowerCase())) {
                included = true
              }
            }
            else if(typeof user[key] === 'boolean' && (user[key] ? 'true' : 'false') === searchValue) {
              included = true
            }
            else if(user[key] === searchValue) {
              included = true
            }
          })
  
          return included
        })
      }
    })

    // Apply column filters
    let columns = [
      {
        title: 'Utilisateur',
        dataIndex: 'fullname'
      },
      {
        title: 'E-mail',
        dataIndex: 'email'
      },
      {
        title: 'Rôle',
        dataIndex: 'role'
      },
      {
        title: 'Équipe',
        dataIndex: 'team'
      },
      {
        title: 'Tournoi',
        dataIndex: 'spotlight'
      },
      {
        title: 'Place',
        dataIndex: 'place'
      },
      {
        title: 'A payé',
        dataIndex: 'paid',
        render: (paid) => {return paid ? <Icon type="check" /> : <Icon type="close" />}
      },
      {
        title: 'Scanné',
        dataIndex: 'scanned',
        render: (scanned) => {return scanned ? <Icon type="check" /> : <Icon type="close" />}
      },
      {
        title: 'Actions',
        dataIndex: 'id',
        render: (id) => <UserListActions userId={id} users={this.props.users} />
      }
    ]

    columns = columns.filter(col => {
      if(col.dataIndex === 'fullname' || col.dataIndex === 'id' || (this.state.displayInfo ? this.state.displayInfo.includes(col.dataIndex) : false)) {
        return true
      }

      return false
    })

    return (
      <React.Fragment>
        <AdminBar/>
        
        <Card
          title="Affichage"
          style={{ marginTop: '20px' }}
        >
          <Checkbox.Group onChange={this.displayInfoChanged} defaultValue={this.state.displayInfo}>
            <Checkbox value="email">E-mail</Checkbox>
            <Checkbox value="role">Rôle</Checkbox>
            <Checkbox value="team">Équipe</Checkbox>
            <Checkbox value="spotlight">Tournoi</Checkbox>
            <Checkbox value="place">Place</Checkbox>
            <Checkbox value="paid">A payé</Checkbox>
            <Checkbox value="scanned">Scanné</Checkbox>
          </Checkbox.Group>
        </Card>

        <Card
          title="Filtres"
          style={{ marginTop: '20px' }}
        >
          <InputGroup compact>
            <Select
              mode="tags"
              placeholder="Nom d'utilisateur"
              value={this.state.search['fullname']}
              onChange={v => this.setSearch('fullname', v)}
              style={{ width: '250px' }}
            >
              {users.map((user, i) => <Select.Option value={user.fullname} key={i}>{user.fullname}</Select.Option>)}
            </Select>
            <Tooltip title="Réinitialiser" placement="right">
              <Button type="primary" style={{ paddingRight: '10px', paddingLeft: '10px' }} onClick={() => this.clearSearch('fullname')}><Icon type="close"></Icon></Button>
            </Tooltip>
          </InputGroup>

          {this.state.displayInfo.includes('email') &&
            <InputGroup compact style={{ marginTop: '10px' }}>
              <Select
                mode="tags"
                placeholder="Adresse mail"
                value={this.state.search['email']}
                onChange={v => this.setSearch('email', v)}
                style={{ width: '250px' }}
              >
                {emails.map((email, i) => <Select.Option value={email} key={i}>{email}</Select.Option>)}
              </Select>
              <Tooltip title="Réinitialiser" placement="right">
                <Button type="primary" style={{ paddingRight: '10px', paddingLeft: '10px' }} onClick={() => this.clearSearch('email')}><Icon type="close"></Icon></Button>
              </Tooltip>
            </InputGroup>
          }

          {this.state.displayInfo.includes('role') &&
            <Checkbox.Group
              onChange={v => this.setSearch('role', v)}
              defaultValue={[]}
              style={{ display: 'block', marginTop: '10px' }}
            >
              <span style={{ marginRight: '10px' }}>Rôle : </span>
              <Checkbox value="admin">Admin</Checkbox>
              <Checkbox value="respo">Respo</Checkbox>
              <Checkbox value="orga">Orga</Checkbox>
              <Checkbox value="joueur">Joueur</Checkbox>
            </Checkbox.Group>
          }

          {this.state.displayInfo.includes('team') &&
            <InputGroup compact style={{ marginTop: '10px' }}>
              <Select
                mode="tags"
                placeholder="Nom de l'équipe"
                value={this.state.search['team']}
                onChange={v => this.setSearch('team', v)}
                style={{ width: '250px' }}
              >
                <Select.Option value="/">(Aucune)</Select.Option>
                {teams.map((team, i) => <Select.Option value={team} key={i}>{team}</Select.Option>)}
              </Select>
              <Tooltip title="Réinitialiser" placement="right">
                <Button type="primary" style={{ paddingRight: '10px', paddingLeft: '10px' }} onClick={() => this.clearSearch('team')}><Icon type="close"></Icon></Button>
              </Tooltip>
            </InputGroup>
          }

          {this.state.displayInfo.includes('spotlight') &&
            <InputGroup compact style={{ marginTop: '10px' }}>
              <Select
                mode="tags"
                placeholder="Tournoi"
                value={this.state.search['spotlight']}
                onChange={v => this.setSearch('spotlight', v)}
                style={{ width: '250px' }}
              >
                <Select.Option value="/">(Aucun)</Select.Option>
                {spotlights.map((spotlight, i) => <Select.Option value={spotlight} key={i}>{spotlight}</Select.Option>)}
              </Select>
              <Tooltip title="Réinitialiser" placement="right">
                <Button type="primary" style={{ paddingRight: '10px', paddingLeft: '10px' }} onClick={() => this.clearSearch('spotlight')}><Icon type="close"></Icon></Button>
              </Tooltip>
            </InputGroup>
          }

          {this.state.displayInfo.includes('place') &&
            <InputGroup compact style={{ marginTop: '10px' }}>
              <Select
                mode="tags"
                placeholder="Place"
                value={this.state.search['place']}
                onChange={v => this.setSearch('place', v)}
                style={{ width: '150px' }}
              >
                <Select.Option value=" ">(Aucune)</Select.Option>
                {places.map((place, i) => <Select.Option value={place} key={i}>{place}</Select.Option>)}
              </Select>
              <Tooltip title="Réinitialiser" placement="right">
                <Button type="primary" style={{ paddingRight: '10px', paddingLeft: '10px' }} onClick={() => this.clearSearch('place')}><Icon type="close"></Icon></Button>
              </Tooltip>
            </InputGroup>
          }

          {this.state.displayInfo.includes('paid') &&
            <Checkbox.Group
              onChange={v => this.setSearch('paid', v)}
              defaultValue={[]}
              style={{ display: 'block', marginTop: '10px' }}
            >
              <span style={{ marginRight: '10px' }}>A payé : </span>
              <Checkbox value="true">Payé</Checkbox>
              <Checkbox value="false">Non payé</Checkbox>
            </Checkbox.Group>
          }

          {this.state.displayInfo.includes('scanned') &&
            <Checkbox.Group
              onChange={v => this.setSearch('scanned', v)}
              defaultValue={[]}
              style={{ display: 'block', marginTop: '10px' }}
            >
              <span style={{ marginRight: '10px' }}>Scanné : </span>
              <Checkbox value="true">Scanné</Checkbox>
              <Checkbox value="false">Non scanné</Checkbox>
            </Checkbox.Group>
          }
        </Card>

        <p style={{ marginTop: '20px' }}>
          <strong>{rows.length} résultat{rows.length > 1 ? 's' : ''}</strong>
        </p>

        <Table
          columns={columns}
          dataSource={rows}
          rowKey="id"
          locale={{ emptyText: 'Aucun utilisateur' }}
          style={{ marginTop: '20px' }}
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
