
import React from 'react'
import { Card, Spin, Button, Modal } from 'antd'
import { connect } from 'react-redux'
import { fetchCounts } from '../../../../modules/admin'
import { sendReminderMails } from '../../../../modules/admin'
import { push } from 'react-router-redux'

class AdminBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
    this.props.fetchCounts()
  }

  openModal = () => {
    this.setState({
      modalVisible: true,
    })
  }

  sendMails = (e) => {
    this.props.sendReminderMails()
    this.setState({
      modalVisible: false,
    })
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    })
  }

  render() {
    if(this.props.user && this.props.user.isAdmin !== 100) this.props.redirectToHome()
    return <Card title={<h1>Panneau d'administration</h1>}>
    <p><i>"Un grand pouvoir implique de grandes responsabilités"</i><strong> Oncle Ben</strong></p>
    <p>Alors <strong>ne cassez pas tout !</strong></p>
    {this.props.counts ?
    (<ul>
      <li>
        <em>Nombre de joueurs inscrits : </em> <strong>{this.props.counts.totalUsers}</strong>
      </li>
      <li>
        <em>Nombre de joueurs ayant payé : </em> <strong>{this.props.counts.totalPaidPlayers}</strong>
      </li>
      <li>
        <em>Nombre d'inscrits n'ayant pas payé : </em> <strong>{this.props.counts.totalUnpaid}</strong>
      </li>
      <li>
        <em>Nombre de visiteurs : </em><strong>{this.props.counts.totalPaidVisitors}</strong>
      </li>
      <li>
        <em>Nombre d'équipes : </em><strong>{this.props.counts.totalTeams}</strong>
      </li>
      <li>
        <em>Nombre d'équipes complètes : </em><strong>{this.props.counts.totalFullTeams}</strong>
      </li>
      <li>
        <em>Nombre d'équipes ayant payé : </em><strong>{this.props.counts.totalPaidTeams}</strong>
      </li>
    </ul>) : <Spin/>}
        <Button type="primary" onClick={this.openModal}>
          Envoyer les mails de rappel
        </Button>
        <Modal
          title="Êtes vous sûr ?"
          visible={this.state.modalVisible}
          onOk={this.sendMails}
          onCancel={this.closeModal}
        >
          <p>Cela enverra une grande quantitée de mails, ne faites ça que si vous êtes sûr de ce que vous faites</p>
        </Modal>
      </Card>
  }
}

const mapStateToProps = state => ({
  counts: state.admin.counts
})

const mapDispatchToProps = dispatch => ({
  redirectToHome: () => dispatch(push('/dashboard/home')),
  fetchCounts: () => dispatch(fetchCounts()),
  sendReminderMails: () => dispatch(sendReminderMails())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(AdminBar)