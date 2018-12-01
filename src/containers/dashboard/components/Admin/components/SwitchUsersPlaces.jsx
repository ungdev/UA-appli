import React from 'react'
import { Button, Select, Icon, Table, Modal, Card } from 'antd'
import { connect } from 'react-redux'
import { switchPlaces } from '../../../../../modules/admin'

class SwitchUserPlace extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchName1: null,
      searchPlace1: null,
      searchName2: null,
      searchPlace2: null,
      users: [],
      modalVisible: false
    }
  }

  openModal = () => {
    this.setState({
      modalVisible: true
    })
  }

  closeModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  setSearchName1 = (v) => {
    this.setState({
      searchName1: v,
      searchPlace1: null
    })
  }

  setSearchPlace1 = (v) => {
    this.setState({
      searchPlace1: v,
      searchName1: null
    })
  }
  
  resetFilters1 = () => {
    this.setState({
      searchName1: null,
      searchPlace1: null
    })
  }

  setSearchName2 = (v) => {
    this.setState({
      searchName2: v,
      searchPlace2: null
    })
  }

  setSearchPlace2 = (v) => {
    this.setState({
      searchPlace2: v,
      searchName2: null
    })
  }

  resetFilters2 = () => {
    this.setState({
      searchName2: null,
      searchPlace2: null
    })
  }

  setUser1 = (id) => {
    let user = this.props.users.find(u => u.id === id)
    let users = this.state.users
    users[0] = user

    this.setState({
      users
    })
  }

  setUser2 = (id) => {
    let user = this.props.users.find(u => u.id === id)
    let users = this.state.users
    users[1] = user

    this.setState({
      users
    })
  }

  unsetUser1 = () => {
    let users = this.state.users
    users[0] = null

    this.setState({
      users
    })
  }

  unsetUser2 = () => {
    let users = this.state.users
    users[1] = null

    this.setState({
      users
    })
  }

  switchPlaces = () => {
    this.props.switchPlaces(this.state.users[0].id, this.state.users[1].id)
    this.setState({
      users: [],
      modalVisible: false
    })
  }

  render() {
    const { users } = this.props

    const columns1 = [
      {
        title: 'Utilisateur',
        dataIndex: 'fullname'
      },
      {
        title: 'Place',
        dataIndex: 'place'
      },
      {
        title: 'Sélectionner',
        dataIndex: 'id',
        render: (id) => this.state.users[0] && this.state.users[0].id === id
          ? <a onClick={this.unsetUser1}>
              <Icon type="check-circle" theme="filled" style={{ fontSize: '18px' }} />
            </a>
          : <a onClick={() => this.setUser1(id)}>
              <div className="check-circle-void"></div>
            </a>
      }
    ]

    const columns2 = [
      {
        title: 'Utilisateur',
        dataIndex: 'fullname'
      },
      {
        title: 'Place',
        dataIndex: 'place'
      },
      {
        title: 'Sélectionner',
        dataIndex: 'id',
        render: (id) => this.state.users[1] && this.state.users[1].id === id
          ? <a onClick={this.unsetUser2}>
              <Icon type="check-circle" theme="filled" style={{ fontSize: '18px' }} />
            </a>
          : <a onClick={() => this.setUser2(id)}>
              <div className="check-circle-void"></div>
            </a>
      }
    ]

    let rows1 = users
    if(this.state.searchName1) {
      rows1 = rows1.filter(row => row.fullname.includes(this.state.searchName1))
    }
    if(this.state.searchPlace1) {
      rows1 = rows1.filter(row => row.place.includes(this.state.searchPlace1))
    }

    let rows2 = users
    if(this.state.searchName2) {
      rows2 = rows2.filter(row => row.fullname.includes(this.state.searchName2))
    }
    if(this.state.searchPlace2) {
      rows2 = rows2.filter(row => row.place.includes(this.state.searchPlace2))
    }

    return (
      <React.Fragment>
        <div className="switch-users-places-container">
          <Card
            title="Utilisateur 1"
          >
            <Select
              showSearch
              placeholder="Nom de l'utilisateur"
              value={this.state.searchName1 !== null ? this.state.searchName1 : undefined}
              onChange={this.setSearchName1}
              style={{ width: '200px' }}
            >
              {users.map((user, i) => <Select.Option value={user.fullname} key={i}>{user.fullname}</Select.Option>)}
            </Select>
            <span style={{ margin: '0 15px' }}>ou</span>
            <Select
              showSearch
              placeholder="Place de l'utilisateur"
              value={this.state.searchPlace1 !== null ? this.state.searchPlace1 : undefined}
              onChange={this.setSearchPlace1}
              style={{ width: '200px' }}
            >
              {users.map((user, i) => user.place ? <Select.Option value={user.place} key={i}>{user.place}</Select.Option> : '')}
            </Select>
            <Button
              type="primary"
              title="Réinitialiser"
              onClick={this.resetFilters1}
              style={{ marginLeft: '15px', padding: '0 10px' }}
            >
              <Icon type="close" />
            </Button>

            <br /><br />

            <Table
              columns={columns1}
              dataSource={rows1}
              locale={{ emptyText: 'Aucun utilisateur' }}
            />
          </Card>
          
          <Card
            title="Utilisateur 2"
          >
            <Select
              showSearch
              placeholder="Nom de l'utilisateur"
              value={this.state.searchName2 !== null ? this.state.searchName2 : undefined}
              onChange={this.setSearchName2}
              style={{ width: '200px' }}
            >
              {users.map((user, i) => <Select.Option value={user.fullname} key={i}>{user.fullname}</Select.Option>)}
            </Select>
            <span style={{ margin: '0 15px' }}>ou</span>
            <Select
              showSearch
              placeholder="Place de l'utilisateur"
              value={this.state.searchPlace2 !== null ? this.state.searchPlace2 : undefined}
              onChange={this.setSearchPlace2}
              style={{ width: '200px' }}
            >
              {users.map((user, i) => user.place ? <Select.Option value={user.place} key={i}>{user.place}</Select.Option> : '')}
            </Select>
            <Button
              type="primary"
              title="Réinitialiser"
              onClick={this.resetFilters2}
              style={{ marginLeft: '15px', padding: '0 10px' }}
            >
              <Icon type="close" />
            </Button>

            <br /><br />

            <Table
              columns={columns2}
              dataSource={rows2}
              locale={{ emptyText: 'Aucun utilisateur' }}
            />
          </Card>
        </div>

        {this.state.users && this.state.users[0] && this.state.users[1] &&
          <Button
            type="primary"
            onClick={this.openModal}
            style={{ marginLeft: '10px' }}
          >
            <Icon type="swap" />
            Échanger les places
          </Button>
        }

        <Modal
          title="Échanger les places de 2 joueurs"
          visible={this.state.modalVisible}
          onOk={this.switchPlaces}
          onCancel={this.closeModal}
          okText="Échanger"
          cancelText="Annuler"
        >
          {this.state.users && this.state.users[0] && this.state.users[1] &&
            <React.Fragment>
              <p>Vous allez échanger les places de deux joueurs.</p>
              <p>
                <strong>Utilisateur 1 : {this.state.users[0].fullname}</strong><br />
                Place : {this.state.users[0].place}
              </p>
              <p>
                <strong>Utilisateur 2 : {this.state.users[1].fullname}</strong><br />
                Place : {this.state.users[1].place}
              </p>
            </React.Fragment>
          }
        </Modal>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  switchPlaces: (id1, id2) => dispatch(switchPlaces(id1, id2))
})

export default connect(
  null,
  mapDispatchToProps
)(SwitchUserPlace)