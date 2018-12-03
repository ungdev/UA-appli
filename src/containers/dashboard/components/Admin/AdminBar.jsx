import React from 'react'
import { Card, Spin, Button, Modal } from 'antd'
import { connect } from 'react-redux'
import { fetchCounts } from '../../../../modules/admin'
import { sendReminderMails, sendInformationsMails } from '../../../../modules/admin'
import { push } from 'react-router-redux'

class AdminBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
      modalVisible2: false
    }
    
    this.props.fetchCounts()
  }

  openModal = () => {
    this.setState({
      modalVisible: true,
    })
  }
  openModal2 = () => {
    this.setState({
      modalVisible2: true,
    })
  }

  sendMails = () => {
    this.props.sendReminderMails()
    this.setState({
      modalVisible: false,
    })
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
    })
  }

  sendMails2 = () => {
    this.props.sendInformationsMails()
    this.setState({
      modalVisible2: false,
    })
  }

  closeModal2 = () => {
    this.setState({
      modalVisible2: false,
    })
  }
  render() {
    return (
      <Card title={<h1>Panneau d'administration</h1>}>
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
              <em>Nombre de joueurs libre : </em><strong>{this.props.counts.totalFreePlayers}</strong>
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
            <li>
              <em>Nombre de joueurs par tournoi : </em>
              LoL pro <strong>{this.props.counts.totalLolProPlayers}/80</strong>,
              LoL amateur <strong>{this.props.counts.totalLolAmateurPlayers}/80</strong>,
              Fortnite <strong>{this.props.counts.totalFortnitePlayers}/96</strong>,
              CS:GO <strong>{this.props.counts.totalCSGOPlayers}/40</strong>,
              HS <strong>{this.props.counts.totalHSPlayers}/32</strong>,
              SSBU <strong>{this.props.counts.totalSSBUPlayers}/64</strong>,
              osu! <strong>{this.props.counts.totalOSUPlayers}/16</strong>
              
            </li>
          </ul>)
        : <Spin/>}

        <Button type="danger" onClick={this.openModal}>
          Envoyer les mails de rappel
        </Button>
        <Button type="danger" onClick={this.openModal2} style={{ marginLeft: '20px' }}>
          Envoyer les mails d'information
        </Button>
        <Modal
          title="Êtes vous sûr ?"
          visible={this.state.modalVisible}
          onOk={this.sendMails}
          onCancel={this.closeModal}
          okText="Ok"
          cancelText="Annuler"
        >
          <p>Cela enverra une grande quantité de mails, ne faites ça que si vous êtes sûr de ce que vous faites.</p>
        </Modal>
        <Modal
          title="Êtes vous sûr ?"
          visible={this.state.modalVisible2}
          onOk={this.sendMails2}
          onCancel={this.closeModal2}
          okText="Ok"
          cancelText="Annuler"
        >
          <p>Cela enverra une grande quantitée de mails, ne faites ça que si vous êtes sûr de ce que vous faites</p>
        </Modal>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  counts: state.admin.counts
})

const mapDispatchToProps = dispatch => ({
  redirectToHome: () => dispatch(push('/dashboard/home')),
  fetchCounts: () => dispatch(fetchCounts()),
  sendReminderMails: () => dispatch(sendReminderMails()),
  sendInformationsMails: () => dispatch(sendInformationsMails())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(AdminBar)