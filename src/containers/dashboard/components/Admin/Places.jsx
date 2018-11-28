import React from 'react'
import { Spin, Tabs } from 'antd'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import { fetchUsers } from '../../../../modules/admin'

const TabPane = Tabs.TabPane

class Places extends React.Component {
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

  getTournamentNameById = (id) => {
    const spotlight = this.props.spotlights.find(spotlight => spotlight.id === id)
    return spotlight ? spotlight.shortName : id
  }
  
  render() {
    let { users } = this.props

    if (!users) {
      return <Spin />
    }

    return (
      <React.Fragment>
        <AdminBar/>
        <br />

        <Tabs defaultActiveKey="1">
          <TabPane tab="Modifier la place d'un joueur" key="1">

          </TabPane>
          <TabPane tab="Échanger les places de 2 joueurs" key="2">

          </TabPane>
          <TabPane tab="Échanger les places de 2 équipes" key="3">
            
          </TabPane>
        </Tabs>
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
    mapDispatchToProps)(Places)
