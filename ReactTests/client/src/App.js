import React from 'react';
import { Layout } from 'antd';
import LeftBar from './LeftBar';
import Accueil from './Accueil';
import HsDecks from './HsDecks';
import CustomBreadcrumb from './CustomBreadcrumb';

import './App.css';
import { withRouter } from 'react-router';

const { Header, Content, Sider } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false, path: this.props.location.pathname };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  componentDidMount() {
    console.log('DidMount :', this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ path: nextProps.location.pathname });
  }

  render() {
    let component = '';
    //console.log(this.state.path);
    switch (this.state.path) {
      case '/':
        component = <Accueil />;
        break;
      case '/tournois/hearthstone/decks':
        component = <HsDecks />;
        break;
    }

    //console.log('render :', this.props, 'component :', component);

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
              <CustomBreadcrumb path={this.state.path} />
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

export default withRouter(App);
