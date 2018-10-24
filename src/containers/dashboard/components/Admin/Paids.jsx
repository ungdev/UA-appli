import React from 'react'
import { Input, Icon, Table } from 'antd'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import { fetchUsers, fetchChartData } from '../../../../modules/admin'
import WhoPaid from './WhoPaid'
import {Line} from 'react-chartjs-2'


class Paids extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      data: [],
      chartData: this.chartData([])
    }
    this.props.fetchUsers()
    this.props.fetchChartData()
  }
  handleSearch = (e) => {
    this.setState({ searchText: e.target.value })
  }

  filterRole = (record, value) => {
    return record.role ? record.role.includes(value) : false
  }
  getTournamentNameById = (id) => {
    const spotlight = this.props.spotlights.find(spotlight => spotlight.id === id)
    return spotlight ? spotlight.shortName : id
  }
  
  chartData = (data) => {
    return {
      labels: data.map(d => d.time),
      datasets: [
        {
          label: 'Nombre de payment total',
          fillColor: 'rgba(0,220,220,1)',
          strokeColor: 'rgba(0,220,220,1)',
          pointColor: 'rgba(0,220,220,1)',
          pointStrokeColor: '#ffff00',
          pointHighlightFill: '#ffff00',
          pointHighlightStroke: 'rgba(0,220,220,1)',
          data: data.map(d => d.count),
        },
      ]
    }
  }
  render() {
    if (this.props.data !== this.state.data) this.setState({ data: this.props.data, chartData: this.chartData(this.props.data) })
    const options = {
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
      legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
    }
    const styles = {
      graphContainer: {
        border: '1px solid black',
        padding: '15px'
      }
    }
    
    let { users } = this.props
    users = users.map(user => {
      let role = ''
      if(user.isAdmin === 100) role = '/Admin'
      if(user.respo && user.respo !== 0) role = `${role}/Respo ${this.getTournamentNameById(user.respo)}`
      if((!user.respo || (user.respo && user.respo === 0)) && user.isAdmin !== 100) role = '/Joueur'
      role = role.substr(1)
      return {
        ...user,
        fullname: `${user.name} (${user.firstname} ${user.lastname})`,
        role,
        spotlight: this.getTournamentNameById(user.spotlightId),
      }
    })
    users = users.filter(user => user.fullname.includes(this.state.searchText))
    const columns = [{
        title: 'utilisateur',
        dataIndex: 'fullname',
        key: 'fullname',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              placeholder="Search name"
              value={this.state.searchText}
              onChange={this.handleSearch}
            />
          </div>
        ),
        filterIcon: <Icon type="filter" style={{ color: this.state.searchText !== '' ? '#108ee9' : '#aaa' }} />,
      }, {
        title: 'Équipe',
        dataIndex: 'team',
        key: 'team',
      }, {
        title: 'Tournoi',
        dataIndex: 'spotlight',
        key: 'spotlight',
        filters: [{
          text: 'LoL (pro)',
          value: 'LoL (pro)',
        }, {
          text: 'LoL (amateur)',
          value: 'LoL (amateur)',
        }, {
          text: 'Fortnite',
          value: 'Fortnite',
        }, {
          text: 'CS:GO',
          value: 'CS:GO',
        }, {
          text: 'Hearthstone',
          value: 'Hearthstone',
        }, {
          text: 'SSBU',
          value: 'SSBU',
        }],
        onFilter: (value, record) => record.spotlight === value,
      },{
        title: 'A payé',
        key: 'paid',
        dataIndex: 'paid',
        render: (paid) => <WhoPaid paid={paid} />
      },
    ]
    return (<React.Fragment>
      <AdminBar/>
      <div style={styles.graphContainer}>
        <Line data={this.state.chartData}
          options={options}
          width="600" height="250"/>
      </div>
      <Table columns={columns} dataSource={users} rowKey="id" />
    </React.Fragment>)
  }
}
const mapStateToProps = state => ({
  users: state.admin.users,
  spotlights: state.spotlights.spotlights,
  data: state.admin.chartData
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchChartData: () => dispatch(fetchChartData()),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(Paids)
