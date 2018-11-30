import React from 'react'
import { Button, Select, Icon, Table, Tooltip, Modal } from 'antd'
import { connect } from 'react-redux'

class UpdateUserPlace extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchName: null,
      searchPlace: null
    }
  }

  setSearchName = (v) => {
    this.setState({
      searchName: v,
      searchPlace: null
    })
  }

  setSearchPlace = (v) => {
    this.setState({
      searchPlace: v,
      searchName: null
    })
  }

  resetFilters = () => {
    this.setState({
      searchName: null,
      searchPlace: null
    })
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

  render() {
    const users = this.props.users


    const columns = [
      {
        title: 'Utilisateur',
        dataIndex: 'fullname'
      },
      {
        title: 'Place',
        dataIndex: 'place'
      },
      {
        title: 'Modifier la place',
        dataIndex: 'id',
        render: (id) => (
          <Tooltip placement="top" title="Modifier la place">
            <a onClick={this.openModal} style={{ fontSize: '18px' }}>
              <Icon type="setting" />
            </a>
          </Tooltip>
        )
      }
    ]

    let rows = users
    if(this.state.searchName) {
      rows = rows.filter(row => row.fullname.includes(this.state.searchName))
    }
    if(this.state.searchPlace) {
      rows = rows.filter(row => row.place.includes(this.state.searchPlace))
    }

    return (
      <React.Fragment>
        <Select
          showSearch
          placeholder="Nom de l'utilisateur"
          value={this.state.searchName !== null ? this.state.searchName : undefined}
          onChange={this.setSearchName}
          style={{ width: '200px' }}
        >
          {users.map((user, i) => <Select.Option value={user.fullname} key={i}>{user.fullname}</Select.Option>)}
        </Select>
        <span style={{ margin: '0 15px' }}>ou</span>
        <Select
          showSearch
          placeholder="Place de l'utilisateur"
          value={this.state.searchPlace !== null ? this.state.searchPlace : undefined}
          onChange={this.setSearchPlace}
          style={{ width: '200px' }}
        >
          {users.map((user, i) => <Select.Option value={user.place} key={i}>{user.place}</Select.Option>)}
        </Select>
        <Button
          type="primary"
          title="Réinitialiser"
          onClick={this.resetFilters}
          style={{ marginLeft: '15px', padding: '0 10px' }}
        >
          <Icon type="close" />
        </Button>

        <br /><br />

        <Table
          columns={columns}
          dataSource={rows}
          locale={{ emptyText: 'Aucun utilisateur' }}
        />

        <Modal
          title="Changement de place d'un utilisateur"
          visible={this.state.modalVisible}
        >
          <p><strong>Utilisateur : {}</strong></p>
        </Modal>
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  null
)(UpdateUserPlace)