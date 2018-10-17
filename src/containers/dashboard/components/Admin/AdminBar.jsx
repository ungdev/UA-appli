
import React from 'react'
import { Card, Spin } from 'antd'
import { connect } from 'react-redux'
import { fetchCounts } from '../../../../modules/admin'
import { push } from 'react-router-redux'

class AdminBar extends React.Component {

  constructor(props) {
    super(props)
    this.props.fetchCounts()
  }

  render() {
    if(this.props.user && this.props.user.isAdmin !== 100) this.props.redirectToHome()
    return <Card title={<h1>Panneau d'administration</h1>}>
    <p><i>"Un grand pouvoir implique de grandes responsabilités"</i><strong> Oncle Ben</strong></p>
    <p>Alors <strong>ne cassez pas tout !</strong></p>
    {this.props.counts ?
    (<React.Fragment>
      <em>nombre d'inscrits : </em> <strong>{this.props.counts.totalUsers}</strong><br/>
      <em>nombre de joueurs ayant payé : </em> <strong>{this.props.counts.totalPaidPlayers}</strong><br/>
      <em>nombre de d'inscrits n'ayant pas payé : </em> <strong>{this.props.counts.totalUnpaid}</strong><br/>
      <em>nombre de visiteurs : </em><strong>{this.props.counts.totalPaidVisitors}</strong><br/>
      <em>nombre d'équipes' : </em><strong>{this.props.counts.totalTeams}</strong><br/>
      <em>nombre d'équipes complètes : </em><strong>{this.props.counts.totalFullTeams}</strong><br/>
      <em>nombre d'équipes ayant payé : </em><strong>{this.props.counts.totalPaidTeams}</strong><br/>

    </React.Fragment>) : <Spin/>}
      </Card>
  }
}

const mapStateToProps = state => ({
  counts: state.admin.counts
})

const mapDispatchToProps = dispatch => ({
  redirectToHome: () => dispatch(push('/dashboard/home')),
  fetchCounts: () => dispatch(fetchCounts())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(AdminBar)