import React from 'react'
import { Icon, Table, Select, Button } from 'antd'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import { fetchUsers, fetchChartData } from '../../../../modules/admin'
import {Line} from 'react-chartjs-2'


class Paids extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchName: null,
      data: [],
      chartDataDaily: this.chartData([]),
      chartDataCumul: this.chartData([]),
    }

    this.props.fetchUsers()
    this.props.fetchChartData()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data !== this.state.data) {
      this.setState({
        data: nextProps.data,
        chartDataDaily: this.chartData(nextProps.data.daily),
        chartDataCumul: this.chartData(nextProps.data.cumul),
      })
    }
  }

  setSearchName = (v) => {
    this.setState({
      searchName: v
    })
  }

  clearSearchName = () => {
    this.setState({
      searchName: null
    })
  }

  getTournamentNameById = (id) => {
    const spotlight = this.props.spotlights.find(spotlight => spotlight.id === id)
    return spotlight ? spotlight.shortName : id
  }
  
  chartData = (data) => {
    return {
      labels: data.map(d => d.time),
      datasets: [{
        label: 'Nombre total de paiements',
        fillColor: 'rgba(0,220,220,1)',
        strokeColor: 'rgba(0,220,220,1)',
        pointColor: 'rgba(0,220,220,1)',
        pointStrokeColor: '#ffff00',
        pointHighlightFill: '#ffff00',
        pointHighlightStroke: 'rgba(0,220,220,1)',
        data: data.map(d => d.count),
      }]
    }
  }

  render() {
    const chartOptions = {
      scaleShowGridLines: true,
      scaleGridLineColor: 'rgba(0,0,0,.05)',
      scaleGridLineWidth: 1,
      scaleShowHorizontalLines: true,
      scaleShowVerticalLines: true,
      bezierCurve: true,
      bezierCurveTension: 0.4,
      pointDot: true,
      pointDotRadius: 4,
      pointDotStrokeWidth: 1,
      pointHitDetectionRadius: 20,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true,
      legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
    }
    const chartStyles = {
      border: '1px solid #e8e8e8',
      borderRadius: '2px',
      padding: '15px',
      margin: '20px 0'
    }
    
    let { users } = this.props

    users = users.map(user => {
      let role = ''
      if(user.permission && user.permission.admin) {
        role = '/Admin'
      }
      if(user.respo && user.respo !== 0) {
        role += `/Respo ${this.getTournamentNameById(user.respo)}`
      }
      if(role === '') {
        role = '/Joueur'
      }

      role = role.substr(1)

      return {
        ...user,
        fullname: `${user.name} (${user.firstname} ${user.lastname})`,
        role,
        spotlight: this.getTournamentNameById(user.spotlightId),
      }
    })

    let rows = users
    if(this.state.searchName !== null) {
      rows = users.filter(user => user.fullname.includes(this.state.searchName))
    }

    const columns = [
      {
        title: 'Utilisateur',
        dataIndex: 'fullname',
        key: 'fullname',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Select
              showSearch
              placeholder="Nom d'utilisateur"
              value={this.state.searchName !== null ? this.state.searchName : undefined}
              onChange={this.setSearchName}
              style={{ width: '200px' }}
            >
              {users.map((user, i) => <Select.Option value={user.fullname} key={i}>{user.fullname}</Select.Option>)}
            </Select>
            <Button type="primary" title="Réinitialiser" style={{ paddingRight: '10px', paddingLeft: '10px', marginLeft: '10px' }} onClick={this.clearSearchName}><Icon type="close"></Icon></Button>
          </div>
        ),
        filterIcon: <Icon type="filter" theme="filled" style={{ color: this.state.searchName !== null ? '#108ee9' : '#aaa' }} />,
      },
      {
        title: 'Équipe',
        dataIndex: 'team',
        key: 'team',
      },
      {
        title: 'Tournoi',
        dataIndex: 'spotlight',
        key: 'spotlight',
        filters: [
          {
            text: 'LoL (pro)',
            value: 'LoL (pro)',
          },
          {
            text: 'LoL (amateur)',
            value: 'LoL (amateur)',
          },
          {
            text: 'Fortnite',
            value: 'Fortnite',
          },
          {
            text: 'CS:GO',
            value: 'CS:GO',
          },
          {
            text: 'Hearthstone',
            value: 'Hearthstone',
          },
          {
            text: 'SSBU',
            value: 'SSBU',
          },
          {
            text: 'osu!',
            value: 'osu!',
          }
        ],
        onFilter: (value, record) => record.spotlight === value
      },
      {
        title: 'A payé',
        key: 'paid',
        dataIndex: 'paid',
        render: (paid) => { return paid ? <Icon type="check"/> : <Icon type="close"/> },
        filters: [
          {
            text: 'Payé',
            value: 'true',
          },
          {
            text: 'Non payé',
            value: 'false',
          }
        ],
        onFilter: (value, record) => {
          if(value === 'true') {
            return record.paid === true
          }
          return record.paid === false
        }
      }
    ]

    return (<React.Fragment>
      <AdminBar/>
      <div style={chartStyles}>
        <Line
          data={this.state.chartDataDaily}
          options={chartOptions}
          width={600} height={250} />
        <Line
          data={this.state.chartDataCumul}
          options={chartOptions}
          width={600} height={250} />
      </div>
      <Table columns={columns} dataSource={rows} locale={{ filterConfirm: 'Ok', filterReset: 'Réinitialiser', emptyText: 'Aucun résultat' }} rowKey="id" />
    </React.Fragment>)
  }
}

const mapStateToProps = state => ({
  users: state.admin.users,
  spotlights: state.spotlights.spotlights,
  data: state.admin.chartData ? state.admin.chartData : { daily: [], cumul: [] }
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchChartData: () => dispatch(fetchChartData()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Paids)
