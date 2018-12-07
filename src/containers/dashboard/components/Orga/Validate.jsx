import React from 'react'
import { Spin, Select, Form, Button, Input, Icon, Card } from 'antd'
import { connect } from 'react-redux'
import { fetchUsers } from '../../../../modules/admin'
import { fetchTeams } from '../../../../modules/teams'
import { getInfos } from '../../../../modules/validate'


const FormItem = Form.Item

class Validate extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      searchInput: null,
      focus: false,
      barcode: '',
      user: null
    }

    this.props.fetchUsers()
    this.props.fetchTeams()
  }

  componentDidUpdate = () => {
    this.input.focus()
  }
  setSearchInput = (input) => {
    this.setState({
      searchInput: input
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { barcode, searchInput } = this.state
    this.setState({ barcode: '', searchInput: null })
    this.props.getInfos(barcode, searchInput)
  }

  getTournamentNameById = (id) => {
    const spotlight = this.props.spotlights.find(spotlight => spotlight.id === id)
    return spotlight ? spotlight.shortName : id
  }

  render() {
    let { users, infos, teams } = this.props
    let spotlightName = null

    if(infos.id) {
      let team = null
      teams.teams.forEach(t => {
        t.users.forEach(user => {
          if(user.id === infos.id) {
            team = t
          }
        })
      })

      spotlightName = team ? this.getTournamentNameById(team.spotlightId) : null
    }

    if (!users) {
      return <Spin />
    }

    users = users.map(user => {
      return {
        ...user,
        fullname: `${user.name} (${user.firstname} ${user.lastname})`,
      }
    })

    if (infos.paid && infos.orders && !infos.orders.changed) {
      let orders = {
        ethernet: 0,
        ethernet7: 0,
        kaliento: 0,
        mouse: 0,
        keyboard: 0,
        headset: 0,
        screen24: 0,
        screen27: 0,
        chair: 0,
        gamingPC: 0,
        streamingPC: 0,
        laptop: 0,
        tombola: 0,
        shirts: [],
        changed: true
      }
      infos.orders.filter(order => order.paid).forEach(order => {
        if(order.ethernet) orders.ethernet += 1
        if(order.ethernet7) orders.ethernet7 += 1
        if(order.kaliento) orders.kaliento += 1
        if(order.mouse) orders.mouse += 1
        if(order.keyboard) orders.keyboard += 1
        if(order.headset) orders.headset += 1
        if(order.screen24) orders.screen24 += 1
        if(order.screen27) orders.screen27 += 1
        if(order.chair) orders.chair += 1
        if(order.gamingPC) orders.gamingPC += 1
        if(order.streamingPC) orders.streamingPC += 1
        if(order.laptop) orders.laptop += 1
        orders.tombola += order.tombola
        if(order.shirt !== 'none') {
          let gender = order.shirt.substr(0, 1)
          gender = gender==='h' ? 'Homme' : 'Femme'
          let size = order.shirt.substr(1, order.shirt.length)
          orders.shirts.push(`${gender} ${size.toUpperCase()}`)
        }
      })
      infos.orders = orders
    }

    return (<React.Fragment>
      <h1>Valider une entrée</h1>

      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          <Input
            ref={(input) => this.input = input}
            prefix={<Icon type="barcode" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Scanner ici..."
            onChange={(e) => this.setState({ barcode: e.target.value })}
            value={this.state.barcode}
          />
        </FormItem>
        ou <br/>
        <FormItem>
          <Select
            showSearch
            placeholder="Nom, prénom ou pseudo"
            value={this.state.searchInput !== null ? this.state.searchInput : undefined}
            onChange={this.setSearchInput}
            style={{ width: '300px' }}
            name="fullname"
            type="select"
          >
            {users.map((user, i) => <Select.Option value={user.fullname} key={i}>{user.fullname}</Select.Option>)}
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Valider (ou appuyer sur entrée)
          </Button>
        </FormItem>
      </Form>
      {infos.name &&
        <Card title={<h1>{infos.name} ({infos.firstname} {infos.lastname}) : {infos.plusone ? 'Visiteur' : 'Joueur'}</h1>}>
          {!infos.paid && <h1 style={{ color: '#ff0000', fontWeight: 'bold' }}>La personne n'a pas payé sa place !</h1>}
          {infos.scanned && <h1 style={{ color: '#ff0000', fontWeight: 'bold' }}><Icon type="warning" /> La place a déjà été scannée !</h1>}
          <h1>Tournoi : {spotlightName || '(Aucun)'}</h1>
          <h1>Place : {infos.place || '(Aucune)'}</h1>
          {
            infos.orders && (
              infos.orders.ethernet > 0 ||
              infos.orders.ethernet7 > 0 ||
              infos.orders.kaliento > 0 ||
              infos.orders.mouse > 0 ||
              infos.orders.keyboard > 0 ||
              infos.orders.headset > 0 ||
              infos.orders.screen24 > 0 ||
              infos.orders.screen27 > 0 ||
              infos.orders.chair > 0 ||
              infos.orders.gamingPC > 0 ||
              infos.orders.streamingPC > 0 ||
              infos.orders.laptop > 0 ||
              infos.orders.tombola > 0 ||
              infos.orders.shirts.length > 0) && 
              <h1>Materiel (à récupérer au bar)</h1>
          }
          {
            infos.orders && (<React.Fragment>
                <ul style={{ fontSize: '30px', color: '#1890ff' }}>
                  {infos.orders.ethernet > 0 && <li>Câble ethernet 5m x{infos.orders.ethernet}</li>}
                  {infos.orders.ethernet7 > 0 && <li>Câble ethernet 7m x{infos.orders.ethernet7}</li>}
                  {infos.orders.kaliento > 0 && <li>Kaliento x{infos.orders.kaliento}</li>}
                  {infos.orders.mouse > 0 && <li>Souris Gaming x{infos.orders.mouse}</li>}
                  {infos.orders.keyboard > 0 && <li>Clavier Gaming x{infos.orders.keyboard}</li>}
                  {infos.orders.headset > 0 && <li>Casque Gaming x{infos.orders.headset}</li>}
                  {infos.orders.screen24 > 0 && <li>Écran 24" x{infos.orders.screen24}</li>}
                  {infos.orders.screen27 > 0 && <li>Écran 27" x{infos.orders.screen27}</li>}
                  {infos.orders.chair > 0 && <li>Chaise Gaming x{infos.orders.chair}</li>}
                  {infos.orders.gamingPC > 0 && <li>PC Gaming x{infos.orders.gamingPC}</li>}
                  {infos.orders.streamingPC > 0 && <li>PC Streaming x{infos.orders.streamingPC}</li>}
                  {infos.orders.laptop > 0 && <li>PC portable x{infos.orders.laptop}</li>}
                  {infos.orders.tombola > 0 && <li>Tombola x{infos.orders.tombola}</li>}
                  {infos.orders.shirts.map((shirt, index) => {
                    return <li key={index}>T-shirt {shirt}</li>
                  })}
                </ul>
              </React.Fragment>
            )
          }
        </Card>
      }
    </React.Fragment>)
  }
}
const mapStateToProps = state => ({
  users: state.admin.users,
  teams: state.teams,
  spotlights: state.spotlights.spotlights,
  infos: state.validate.infos,
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchTeams: () => dispatch(fetchTeams()),
  getInfos: (barcode, fullname) => dispatch(getInfos(barcode, fullname))
})

const WrappedApp = Form.create()(Validate)
export default connect(
    mapStateToProps,
    mapDispatchToProps)(WrappedApp)
