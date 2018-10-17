import React from 'react'
import { Table, Spin } from 'antd'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import { fetchAdminSpotlight } from '../../../../modules/admin'


class Spotlights extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      id: this.props.location.split('/')[4]
    }
    this.props.fetchAdminSpotlight(this.state.id)
  }
  handleSearch = (e) => {
    this.setState({ searchText: e.target.value })
  }

  render() {
    let { spotlights, location } = this.props
    let { id } = this.state
    let currentId = location.split('/')[4]
    if(currentId !== id) {
      this.setState({ id: currentId })
      this.props.fetchAdminSpotlight(currentId)
    }
    if (!spotlights) return <Spin/>
    if (!spotlights[id]) return <Spin/>
    let teams = spotlights[id]
    const columns = [{
        title: 'équipe',
        dataIndex: 'name',
      },{
        title: 'date de complétion',
        dataIndex: 'completed_at',
      },
    ]
    return (<React.Fragment>
      <AdminBar/>
      <Table columns={columns} dataSource={teams} rowKey="id" />
    </React.Fragment>)
  }
}
const mapStateToProps = state => ({
  location: state.routing.location.pathname,
  users: state.admin.users,
  spotlights: state.admin.spotlights
})

const mapDispatchToProps = dispatch => ({
  fetchAdminSpotlight: (id) => dispatch(fetchAdminSpotlight(id))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(Spotlights)
