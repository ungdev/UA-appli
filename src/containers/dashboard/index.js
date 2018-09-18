import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import { Layout } from 'antd'


import LeftBar from './components/LeftBar'
import Accueil from './components/Accueil'
import CustomBreadcrumb from './components/CustomBreadcrumb'
import TopBar from './components/TopBar'

import { autoLogin } from '../../modules/login'

import './dashboard.css'

const baseUrl = process.env.REACT_APP_BASEURL
const { Header, Content, Sider } = Layout

class Dashboard extends Component {
  constructor() {
    super()

    this.state = {
      render: false
    }
  }

  componentWillMount() {
    this.props.autoLogin().then(() => {
      this.setState({
        render: this.props.user && this.props.user.name
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      path: nextProps.match.path,
      pathname: nextProps.location.pathname
    })
  }

  render() {
    let component = <Accueil />
    const path = this.state.pathname
    return (
      <div className="App">
        <Layout style={{ minHeight: '100vh' }}>
          <TopBar sidebar={this.state.collapsed} />
          <Layout>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}>
              <LeftBar />
            </Sider>
            <Layout>
              <Content style={{ margin: '0 16px' }}>
                <CustomBreadcrumb path={path} />
                <div
                  style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  {component}
                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  location: state.routing.location.pathname,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
