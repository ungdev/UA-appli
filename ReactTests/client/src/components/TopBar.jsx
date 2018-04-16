import React from 'react'
import Logo_UA from '../logo_ua_2018.png';
import { Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;


export default class TopBar extends React.Component {

  render() {
    return (
      <Header className="header" style={{ paddingLeft: 0 }}>
        <div className='logo'><img src={Logo_UA} alt="LogoUA2018" style={{ float: 'left', height: 70 }} /></div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header >
    )
  }
}