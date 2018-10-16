
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
      <em>nombre de joueur n'ayant pas encore payé : </em> <strong>{this.props.counts[2]}</strong><br/>
      <em>nombre de joueur en tant que visiteur : </em><strong>{this.props.counts[0]}</strong><br/>
      <em>nombre de joueur dans une équipe : </em><strong>{this.props.counts[1]}</strong>
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