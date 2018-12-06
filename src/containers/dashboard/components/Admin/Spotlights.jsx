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
    let { spotlights, location, allspotlights } = this.props
    let { id } = this.state

    let currentId = location.split('/')[4]

    if(currentId !== id) {
      this.setState({ id: currentId })
      this.props.fetchAdminSpotlight(currentId)
    }

    if (!spotlights || !spotlights[id] || !allspotlights) {
      return <Spin/>
    }
    let thisSpotlight = allspotlights.find(s => s.id === parseInt(currentId, 10))
    let rows = spotlights[id]
    .sort((a, b) => new Date(a.completed_at) - new Date(b.completed_at))
    .map((team, index) => {
      let date = new Date(team.completed_at.substring(0, 19)) // Remove '+00:00' at the end

      date = date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR')

      return {
        ...team,
        date: date,
        name: { name: team.name, color: index + 1 > thisSpotlight.maxPlayers / thisSpotlight.perTeam ? '#ff0000' : '#000000' }
      }
    })

    const columns = [
      {
        title: 'Équipe',
        dataIndex: 'name',
        render: text => <span style={{ color: text.color }}>{text.name}</span>
      },
      {
        title: 'Date de complétion',
        dataIndex: 'date',
      }
    ]

    return (
      <React.Fragment>
        <AdminBar/>
        <p style={{ marginTop: '10px' }}><strong>{rows.length} résultat{rows.length > 1 ? 's' : ''}</strong></p>
        <Table columns={columns} dataSource={rows} locale={{ emptyText: 'Aucun résultat' }} style={{ marginTop: '20px' }} rowKey="id" />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => ({
  location: state.routing.location.pathname,
  users: state.admin.users,
  spotlights: state.admin.spotlights,
  allspotlights: state.spotlights.spotlights
})

const mapDispatchToProps = dispatch => ({
  fetchAdminSpotlight: (id) => dispatch(fetchAdminSpotlight(id))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(Spotlights)
