import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Layout } from 'antd'
import './App.css';

//import components
import LeftBar from './components/LeftBar'
import Accueil from './components/Accueil'
import HsDecks from './components/HsDecks'
import CustomBreadcrumb from './components/CustomBreadcrumb'
import Tournament from './components/Tournament'
import Planning from './components/Planning'
import Teams from './components/TeamsComponents/Teams'
import Rules from './components/Rules'


const { Header, Content, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      path: this.props.match.path,
      pathname: this.props.location.pathname
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  componentDidMount() {
    console.log('DidMount :', this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('will receive props: ', nextProps)
    this.setState({ path: nextProps.match.path, pathname: nextProps.location.pathname });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props && nextState !== this.state ? true : false
  }

  render() {
    const path = this.state.pathname
    let component = '';
    switch (this.state.path) {
      case '/':
        component = <Accueil />;
        break;
      case '/tournois/hearthstone/decks':
        component = <HsDecks />;
        break;
      case '/tournois/:game/arbre-tournois':
        component = <Tournament />
        break;
      case '/tournois/:game/planning':
        component = <Planning />
        break
      case '/tournois/:game/teams':
        component = <Teams />
        break
      case '/tournois/:game/rules':
        component = <Rules />
        break
      default: 
        break
    }

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
              <CustomBreadcrumb path={path} />
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
