import React from 'react'
import { Button, Select, Icon, Table, Modal, Card } from 'antd'
import { connect } from 'react-redux'
import { switchPlaces } from '../../../../../modules/admin'

class SwitchUserPlace extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchName1: [],
      searchPlace1: [],
      searchName2: [],
      searchPlace2: [],
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
      searchPlace1: []
    })
  }

  setSearchPlace1 = (v) => {
    this.setState({
      searchPlace1: v,
      searchName1: []
    })
  }
  
  resetFilters1 = () => {
    this.setState({
      searchName1: [],
      searchPlace1: []
    })
  }

  setSearchName2 = (v) => {
    this.setState({
      searchName2: v,
      searchPlace2: []
    })
  }

  setSearchPlace2 = (v) => {
    this.setState({
      searchPlace2: v,
      searchName2: []
    })
  }

  resetFilters2 = () => {
    this.setState({
      searchName2: [],
      searchPlace2: []
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
      searchName1: [],
      searchPlace1: [],
      searchName2: [],
      searchPlace2: [],
      users: [],
      modalVisible: false
    })
  }

  render() {
    const { users } = this.props

    // Get different places
    let places = []
    users.forEach(user => {
      if(!places.includes(user.place) && user.place !== '') {
        places.push(user.place)
      }
    })

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
        render: (id) => (
          <a onClick={() => this.setUser1(id)}>
            <Icon type="right-circle" theme="filled" style={{ fontSize: '18px' }} />
          </a>
        )
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
        render: (id) => (
          <a onClick={() => this.setUser2(id)}>
            <Icon type="right-circle" theme="filled" style={{ fontSize: '18px' }} />
          </a>
        )
      }
    ]

    let rows1 = users
    // Apply filters
    rows1 = rows1.filter(user => {
      let included = false

      if(this.state.searchName1.length === 0 && this.state.searchPlace1.length === 0) {
        included = true
      }

      if(this.state.searchName1.length > 0) {
        this.state.searchName1.forEach(searchValue => {
          if(user.fullname.toLowerCase().includes(searchValue.toLowerCase())) {
            included = true
          }
        })
      }

      if(this.state.searchPlace1.length > 0) {
        this.state.searchPlace1.forEach(searchValue => {
          if(searchValue === ' ' && user.place === '') {
            included = true
          }
          else if(user.place.toLowerCase().includes(searchValue.toLowerCase())) {
            included = true
          }
        })
      }

      return included
    })

    // Prevent from selecting the same user twice
    if(this.state.users[1]) {
      rows1 = rows1.filter(row => row.id !== this.state.users[1].id)
    }

    let rows2 = users
    // Apply filters
    rows2 = rows2.filter(user => {
      let included = false

      if(this.state.searchName2.length === 0 && this.state.searchPlace2.length === 0) {
        included = true
      }

      if(this.state.searchName2.length > 0) {
        this.state.searchName2.forEach(searchValue => {
          if(user.fullname.toLowerCase().includes(searchValue.toLowerCase())) {
            included = true
          }
        })
      }

      if(this.state.searchPlace2.length > 0) {
        this.state.searchPlace2.forEach(searchValue => {
          if(searchValue === ' ' && user.place === '') {
            included = true
          }
          else if(user.place.toLowerCase().includes(searchValue.toLowerCase())) {
            included = true
          }
        })
      }

      return included
    })

    // Prevent from selecting the same user twice
    if(this.state.users[0]) {
      rows2 = rows2.filter(row => row.id !== this.state.users[0].id)
    }

    return (
      <React.Fragment>
        {this.state.users && this.state.users[0] && this.state.users[1] &&
          <Button
            type="primary"
            onClick={this.openModal}
            style={{ margin: '0 0 20px 10px' }}
          >
            <Icon type="swap" />
            Échanger les places
          </Button>
        }

        <div className="switch-users-places-container">
          <Card
            title="Utilisateur 1"
          >
            {this.state.users[0]
              ? <React.Fragment>
                  <p>Utilisateur : <strong>{this.state.users[0].fullname}</strong></p>
                  <p>Place : <strong>{this.state.users[0].place || '(Aucune)'}</strong></p>
                  <Button onClick={this.unsetUser1}>
                    <Icon type="stop" />
                    Annuler
                  </Button>
                </React.Fragment>
              : <React.Fragment>
                  <Select
                    mode="tags"
                    placeholder="Nom de l'utilisateur"
                    value={this.state.searchName1}
                    onChange={this.setSearchName1}
                    style={{ width: '200px', marginBottom: '10px' }}
                  >
                    {users.map((user, i) => <Select.Option value={user.fullname} key={i}>{user.fullname}</Select.Option>)}
                  </Select>
                  <span style={{ margin: '0 15px' }}>ou</span>
                  <Select
                    mode="tags"
                    placeholder="Place de l'utilisateur"
                    value={this.state.searchPlace1}
                    onChange={this.setSearchPlace1}
                    style={{ width: '200px', marginBottom: '10px' }}
                  >
                    <Select.Option value=" ">(Aucune)</Select.Option>
                    {places.map((place, i) => <Select.Option value={place} key={i}>{place}</Select.Option>)}
                  </Select>
                  <Button
                    type="primary"
                    title="Réinitialiser"
                    onClick={this.resetFilters1}
                    style={{ marginLeft: '15px', padding: '0 10px' }}
                  >
                    <Icon type="close" />
                  </Button>
                  <br />

                  <Table
                    columns={columns1}
                    dataSource={rows1}
                    rowKey="id"
                    locale={{ emptyText: 'Aucun utilisateur' }}
                    style={{ marginTop: '10px' }}
                  />
                </React.Fragment>
            }
          </Card>
          
          <Card
            title="Utilisateur 2"
          >
            {this.state.users[1]
              ? <React.Fragment>
                  <p>Utilisateur : <strong>{this.state.users[1].fullname}</strong></p>
                  <p>Place : <strong>{this.state.users[1].place || '(Aucune)'}</strong></p>
                  <Button onClick={this.unsetUser2}>
                    <Icon type="stop" />
                    Annuler
                  </Button>
                </React.Fragment>
              : <React.Fragment>
                  <Select
                    mode="tags"
                    placeholder="Nom de l'utilisateur"
                    value={this.state.searchName2}
                    onChange={this.setSearchName2}
                    style={{ width: '200px', marginBottom: '10px' }}
                  >
                    {users.map((user, i) => <Select.Option value={user.fullname} key={i}>{user.fullname}</Select.Option>)}
                  </Select>
                  <span style={{ margin: '0 15px' }}>ou</span>
                  <Select
                    mode="tags"
                    placeholder="Place de l'utilisateur"
                    value={this.state.searchPlace2}
                    onChange={this.setSearchPlace2}
                    style={{ width: '200px', marginBottom: '10px' }}
                  >
                    <Select.Option value=" ">(Aucune)</Select.Option>
                    {places.map((place, i) => <Select.Option value={place} key={i}>{place}</Select.Option>)}
                  </Select>
                  <Button
                    type="primary"
                    title="Réinitialiser"
                    onClick={this.resetFilters2}
                    style={{ marginLeft: '15px', padding: '0 10px' }}
                  >
                    <Icon type="close" />
                  </Button>
                  <br />

                  <Table
                    columns={columns2}
                    dataSource={rows2}
                    rowKey="id"
                    locale={{ emptyText: 'Aucun utilisateur' }}
                    style={{ marginTop: '10px' }}
                  />
                </React.Fragment>
            }
          </Card>
        </div>

        <Modal
          title="Échanger les places de 2 joueurs"
          visible={this.state.modalVisible}
          onOk={this.switchPlaces}
          onCancel={this.closeModal}
          okText={<React.Fragment><Icon type="swap" /> Échanger</React.Fragment>}
          cancelText="Annuler"
        >
          <p><strong>Vous allez échanger les places de deux joueurs.</strong></p>
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