import React from 'react'
import { Spin, Icon, Collapse } from 'antd'
import { connect } from 'react-redux'
import { fetchUser } from '../../../../modules/user'
import { fetchScannedTeams } from '../../../../modules/teams'

const Panel = Collapse.Panel

class Scanned extends React.Component {
  constructor(props) {
    super(props)

    this.props.fetchUser()
    this.props.fetchScannedTeams()
  }

  render() {
    let { user, scannedTeams } = this.props

    if(!user || !scannedTeams) {
      return <Spin />
    }

    scannedTeams = scannedTeams.map(scannedTeam => (
      <div style={{ marginBottom: '20px' }}>
        <h2>Équipes {scannedTeam.spotlightName}</h2>
        <Collapse>
          {scannedTeam.teams.map(team => (
            <Panel header={
              <React.Fragment>
                {team.name}
                <span style={{ marginLeft: '20px', color: team.scannedCount/team.perTeam === 1 ? '#1890ff' : (team.scannedCount === 0 ? '#f00' : undefined) }}>
                  <strong>{team.scannedCount}/{team.perTeam}</strong>
                </span>
              </React.Fragment>}>

              {team.users.map((user, i) => (
                <div key={i} style={{ marginTop: '5px' }}>
                  {user.scanned ? <Icon type="check-circle" style={{ color: '#1890ff', fontSize: '18px' }} /> : <Icon type="close" style={{ color: '#a00', fontSize: '18px' }} />}
                  <span style={{ marginLeft: '10px' }}>{user.name}</span>
                </div>
              ))}
            </Panel>
          ))}
        </Collapse>
      </div>
    ))

    return scannedTeams
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  scannedTeams: state.teams.scannedTeams
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchScannedTeams: () => dispatch(fetchScannedTeams())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(Scanned)
