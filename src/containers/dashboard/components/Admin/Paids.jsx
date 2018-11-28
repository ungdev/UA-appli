import React from 'react'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import { fetchChartData } from '../../../../modules/admin'
import {Line} from 'react-chartjs-2'


class Paids extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      chartDataDaily: this.chartData([]),
      chartDataCumul: this.chartData([]),
    }
    this.props.fetchChartData()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data !== this.state.data) {
      this.setState({
        data: nextProps.data,
        chartDataDaily: this.chartData(nextProps.data.daily, 'Nombre de paiements par jour'),
        chartDataCumul: this.chartData(nextProps.data.cumul, 'Nombre total de paiements'),
      })
    }
  }
  
  chartData = (data, label) => {
    return {
      labels: data.map(d => d.time),
      datasets: [{
        label,
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

    return (
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  data: state.admin.chartData ? state.admin.chartData : { daily: [], cumul: [] }
})

const mapDispatchToProps = dispatch => ({
  fetchChartData: () => dispatch(fetchChartData()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Paids)
