import React from 'react'
import { Tabs, Icon } from 'antd'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import { fetchUsers } from '../../../../modules/admin'
import UpdateUserPlace from './components/UpdateUserPlace'
import SwitchUsersPlaces from './components/SwitchUsersPlaces'

const TabPane = Tabs.TabPane

class Places extends React.Component {
  constructor(props) {
    super(props)

    this.props.fetchUsers()
  }
  
  render() {
    let users = this.props.users

    if (!users) {
      this.props.gotoHome()
    }

    // Get user fullname
    users = users.map(user => {
      return {
        ...user,
        fullname: `${user.name} (${user.firstname} ${user.lastname})`
      }
    })

    return (
      <React.Fragment>
        <AdminBar/>
        <br />

        <Tabs defaultActiveKey="1">
          <TabPane tab={<span><Icon type="user" /> Modifier la place d'un joueur</span>} key="1">
            <UpdateUserPlace users={users} maxPlacesPerTable={500} />
          </TabPane>
          <TabPane tab={<span><Icon type="swap" /> Échanger les places de 2 joueurs</span>} key="2">
            <SwitchUsersPlaces users={users} />
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
