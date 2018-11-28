import React from 'react'
import Logo_UA from '../logo_ua_2018_hex.png'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import { logout } from '../../../modules/login'
const { Header } = Layout

class TopBar extends React.Component {
  render() {
    return (
      <Header className="header">
        <div className="logo">
          <img src={Logo_UA} alt="" />
          <span>UTT Arena</span>
        </div>
        
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

const mapDispatchToProps = dispatch => ({
  disconnect: () => dispatch(logout())
})


export default connect(
  null,
  mapDispatchToProps
)(TopBar)
