import React from 'react'
import { Icon, Table, Select, Button, Spin, Checkbox, Input, Tooltip, Card, Modal } from 'antd'
import { connect } from 'react-redux'

import { fetchUsers, validatePayment } from '../../../../modules/admin'

const InputGroup = Input.Group

class Payment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: {
        fullname: [],
        email: [],
        paid: []
      },
      modalVisible: false
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

  openModal = (id) => {
    this.setState({
      userId: id,
      modalVisible: true
    })
  }

  closeModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  validatePayment = () => {
    this.props.validatePayment(this.state.userId)
    this.closeModal()
  }
  
  render() {
    let { users } = this.props
    const { search } = this.state

    if (!users) {
      return <Spin />
    }

    // Get users fullname
    users = users.map(user => {
      return {
        ...user,
        fullname: `${user.name} (${user.firstname} ${user.lastname})`
      }
    })
    
    // Get different emails
    let emails = []
    users.forEach(user => {      
      if(!emails.includes(user.email)) {
        emails.push(user.email)
      }
    })
    emails.sort((email1, email2) => email1.toLowerCase() > email2.toLowerCase())

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
        title: 'Place',
        dataIndex: 'place'
      },
      {
        title: 'A payé',
        dataIndex: 'paid',
        render: (paid) => {return paid ? <Icon type="check" /> : <Icon type="close" />}
      },
      {
        title: 'Valider le paiement',
        dataIndex: 'id',
        render: (id) => {
          let user = users.find(u => u.id === id)
          if(!user.paid) {
            return <a onClick={() => this.openModal(id)}><Icon type="euro" style={{ fontSize: '18px' }} /></a>
          }
          
          return ''
        }
      }
    ]

    return (
      <React.Fragment>
        <h1>Valider un paiement</h1>

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
          
          <Checkbox.Group
            onChange={v => this.setSearch('paid', v)}
            defaultValue={[]}
            style={{ display: 'block', marginTop: '10px' }}
          >
            <span style={{ marginRight: '10px' }}>A payé : </span>
            <Checkbox value="true">Payé</Checkbox>
            <Checkbox value="false">Non payé</Checkbox>
          </Checkbox.Group>
        </Card>

        <Table
          columns={columns}
          dataSource={rows}
          rowKey="id"
          locale={{ emptyText: 'Aucun utilisateur' }}
          style={{ marginTop: '20px' }}
        />

        <Modal
          title="Êtes-vous sûr ?"
          visible={this.state.modalVisible}
          onCancel={this.closeModal}
          onOk={this.validatePayment}
          okText="Ok"
          cancelText="Annuler"
        >
          <p>Cela validera le paiement de l'utilisateur, le marquera comme scanné et il recevra sa place par mail.</p>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  users: state.admin.users,
  spotlights: state.spotlights.spotlights
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  validatePayment: (id) => dispatch(validatePayment(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment)
