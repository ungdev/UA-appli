import React from 'react'
import Logo_UA from '../logo_ua_2018_hex.png'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import { logout } from '../../../modules/login'
const { Header, Content, Sider } = Layout


class TopBar extends React.Component {

  render() {
    const title = this.props.sidebar ? '' : <span style={{marginLeft: 15}}>UTT Arena</span>
    return (
      <Header className="header" style={{ paddingLeft: 0 }}>
        <div className='logo' style={{ color: 'white', fontSize: 24, float: 'left' }}>
          <img src={Logo_UA} alt="LogoUA2018" style={{ height: 65 }} />
          {title}
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px', float: 'right' }}
        >
          <Menu.Item key="1" onClick={this.props.disconnect}>
            <div>
              <Icon type='logout' /> Se déconnecter
          </div>
          </Menu.Item>

        </Menu>
      </Header>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  disconnect: () => {
    console.log('disconnect')
    dispatch(logout())
  }
})


export default connect(
  null,
  mapDispatchToProps
)(TopBar)
