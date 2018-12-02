import React from 'react'
import { Button, Select, Icon, Table, Tooltip, Modal, Input, InputNumber } from 'antd'
import { connect } from 'react-redux'
import { setPlace } from '../../../../../modules/admin'

const InputGroup = Input.Group

class UpdateUserPlace extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchName: [],
      searchPlace: [],
      placeLetterValue: '',
      placeNumberValue: 0,
      user: null,
      modalVisible: false
    }
  }

  setSearchName = (v) => {
    this.setState({
      searchName: v,
      searchPlace: []
    })
  }

  setSearchPlace = (v) => {
    this.setState({
      searchPlace: v,
      searchName: []
    })
  }

  resetFilters = () => {
    this.setState({
      searchName: [],
      searchPlace: []
    })
  }

  openModal = (id) => {
    let user = this.props.users.find(user => user.id === id)

    this.setState({
      modalVisible: true,
      placeLetterValue: user.place && user.place.substring(0, 1),
      placeNumberValue: user.place && user.place.substring(1),
      user
    })
  }

  closeModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  placeLetterValueChanged = e => {
    let value = e.target.value.substring(0, 1).toUpperCase()
    let asciiVal = value.charCodeAt(0)
    if(value.length > 0 && (asciiVal < 65 || asciiVal > 90)) {
      return
    }

    if(value.length > 0 && this.state.placeLetterValue !== value) {
      let placeNumberInput = document.getElementById('placeNumber')
      if(placeNumberInput) {
        placeNumberInput.focus()
      }
    }

    this.setState({
      placeLetterValue: value
    })
  }

  placeNumberValueChanged = v => {
    let value = parseInt(v, 10)
    if(value.toString() === 'NaN') {
      value = ''
    }
    else if(value > this.props.maxPlacesPerTable) {
      value = this.state.placeNumberValue
    }

    this.setState({
      placeNumberValue: value
    })
  }

  changePlace = () => {
    this.props.setPlace(this.state.user.id, this.state.placeLetterValue, this.state.placeNumberValue)
    this.setState({
      searchName: [],
      searchPlace: [],
      modalVisible: false
    })
  }

  render() {
    const { users } = this.props

    // Get different places
    let places = []
    users.forEach(user => {
      if(!places.includes(user.place)) {
        places.push(user.place)
      }
    })
    // Sort
    places.sort()

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
            <a onClick={() => this.openModal(id)} style={{ fontSize: '18px' }}>
              <Icon type="setting" />
            </a>
          </Tooltip>
        )
      }
    ]

    let rows = users
    // Apply filters
    rows = rows.filter(user => {
      let included = false

      if(this.state.searchName.length === 0 && this.state.searchPlace.length === 0) {
        included = true
      }

      if(this.state.searchName.length > 0) {
        this.state.searchName.forEach(searchValue => {
          if(user.fullname.toLowerCase().includes(searchValue.toLowerCase())) {
            included = true
          }
        })
      }

      if(this.state.searchPlace.length > 0) {
        this.state.searchPlace.forEach(searchValue => {
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

    return (
      <React.Fragment>
        <div style={{ marginBottom: '20px' }}>
          <Select
            mode="tags"
            placeholder="Nom de l'utilisateur"
            value={this.state.searchName}
            onChange={this.setSearchName}
            style={{ width: '200px' }}
          >
            {users.map((user, i) => <Select.Option value={user.fullname} key={i}>{user.fullname}</Select.Option>)}
          </Select>
          <span style={{ margin: '0 15px' }}>ou</span>
          <Select
            mode="tags"
            placeholder="Place de l'utilisateur"
            value={this.state.searchPlace}
            onChange={this.setSearchPlace}
            style={{ width: '200px' }}
          >
            <Select.Option value=" ">(Aucune)</Select.Option>
            {places.map((place, i) => place ? <Select.Option value={place} key={i}>{place}</Select.Option> : '')}
          </Select>
          <Button
            type="primary"
            title="Réinitialiser"
            onClick={this.resetFilters}
            style={{ marginLeft: '15px', padding: '0 10px' }}
          >
            <Icon type="close" />
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={rows}
          rowKey="id"
          locale={{ emptyText: 'Aucun utilisateur' }}
        />

        <Modal
          title="Modifier la place d'un joueur"
          visible={this.state.modalVisible}
          footer={[
            <Button onClick={this.closeModal}>Annuler</Button>,
              <Button
                type="primary"
                onClick={this.changePlace}
              >
                <Icon type="edit" />
                Modifier la place
              </Button>
          ]}
          onCancel={this.closeModal}
        >
          {this.state.user &&
            <React.Fragment>
              <p><strong>Utilisateur : {this.state.user.fullname}</strong></p>
              <div style={{ marginTop: '15px' }}>
                Place :<br />
                <InputGroup compact style={{ marginTop: '6px' }}>
                  <Tooltip placement="bottom" title="Lettre de la table">
                    <Input
                      value={this.state.placeLetterValue}
                      onChange={e => this.placeLetterValueChanged(e)}
                      style={{ display: 'inline-block', width: '60px' }}
                    />
                  </Tooltip>
                  <Tooltip placement="bottom" title="Numéro de la place">
                    <InputNumber
                      id="placeNumber"
                      min={1}
                      max={this.props.maxPlacesPerTable}
                      value={this.state.placeNumberValue}
                      onChange={v => this.placeNumberValueChanged(v)}
                      style={{ display: 'inline-block', width: '80px' }}
                    />
                  </Tooltip>
                </InputGroup>
              </div>
            </React.Fragment>
          }
        </Modal>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setPlace: (id, placeLetter, placeNumber) => dispatch(setPlace(id, placeLetter, placeNumber))
})

export default connect(
  null,
  mapDispatchToProps
)(UpdateUserPlace)