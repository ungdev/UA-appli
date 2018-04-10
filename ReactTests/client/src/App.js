import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import LeftBar from './LeftBar';
import Accueil from './Accueil';
import HS_Decks from './HS_Decks';
import { BrowserRouter, withRoute, Router, Route, Link } from 'react-router-dom';
import './App.css';
import { withRouter } from 'react-router';

const { Header, Content, Footer, Sider } = Layout;

const routes = [
  {
    path: '/',
    exact: true,
    component: Accueil
  },
  {
    path: '/hearthstone/decks',
    component: HS_Decks
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false, path: this.props.location.pathname };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  componentDidMount() {
    console.log('DidMount :', this.props);
  }

  componentWillReceiveProps(nextProps){
    this.setState({path: nextProps.location.pathname})
  }

  render() {
    const path = this.state.path
    let component=''
    switch(this.state.path){
      case ('/'):
        component = <Accueil />
        break
      case ('/decks'):
        component = <HS_Decks />
        break
    }
    console.log('render :', this.props, 'component :', component)

    

    return (
      <div className="App">
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}>
            <LeftBar />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {component}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);;
