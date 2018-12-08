import React from 'react'
import Logo_UA from '../logo_ua_2018_hex.png'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import { fetchUser } from '../../../modules/user'
import { logout } from '../../../modules/login'
const { Header } = Layout

class TopBar extends React.Component {
  constructor(props) {
    super(props)

    this.props.fetchUser()
  }

  render() {
    const { user } = this.props

    return (
      <Header className="header">
        <div className="logo">
          <img src={Logo_UA} alt="" />
          <span>UTT Arena</span>
        </div>
        {user &&
          <div style={{ position: 'absolute', left: '260px', color: '#fff' }}>{user.name} (Place : {user.place})</div>
        }
        
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px', float: 'right' }}
        >
          <Menu.Item key="1" onClick={this.props.disconnect}>
            <div>
              <Icon type='logout' /> Déconnexion
            </div>
          </Menu.Item>

        </Menu>
      </Header>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  disconnect: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)
