import React from 'react'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'

import Accueil from './components/Accueil';

import { autoLogin } from '../../modules/login'

import './dashboard.css'

const baseUrl = process.env.REACT_APP_BASEURL

class Dashboard extends React.Component {
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

  render() {
    component = <Accueil />
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
