import React from 'react'
import { Card } from 'antd'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class AdminBar extends React.Component {

  render() {
    if(this.props.user && this.props.user.isAdmin !== 100) this.props.redirectToHome()
    return <Card title={<h1>Panneau d'administration</h1>}>
    <p><i>"Un grand pouvoir implique de grandes responsabilités"</i><strong> Oncle Ben</strong></p>
    <p>Alors <strong>ne cassez pas tout !</strong></p>
      </Card>
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  redirectToHome: () => dispatch(push('/dashboard/home'))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(AdminBar)
