import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

class LeftBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: {}
    };
  }

  render() {
    return (
      <div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" style={{ marginTop: 0 }}>
            <Link to="/dashboard">
              <Icon type="home" />
              <span>Accueil</span>
            </Link>
          </Menu.Item>

          <SubMenu
            key="3"
            title={
              <span>
                <Icon type="trophy" />
                <span>Les tournois</span>
              </span>
            }>
            <SubMenu
              key="sub3-1"
              title={
                <span>
                  <Icon type="team" />
                  <span>CS-GO</span>
                </span>
              }>
              <Menu.Item key="3-1-1">
                <Link to="/dashboard/tournois/csgo/arbre-tournois">
                  <Icon type="share-alt" />
                  <span>Arbre</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3-1-2">
                <Link to="/dashboard/tournois/csgo/teams">
                  <Icon type="team" />
                  <span>Équipes</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3-1-3">
                <Link to="/dashboard/tournois/csgo/rules">
                  <Icon type="profile" />
                  <span>Règlement</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3-1-4">
                <Link to="/dashboard/tournois/csgo/contact">
                  <Icon type="customer-service" />
                  <span>Contact</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3-2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Lol (Pro)</span>
                </span>
              }>
              <Menu.Item key="3-2-1">
                <Link to="/dashboard/tournois/lolpro/arbre-tournois">
                  <Icon type="share-alt" />
                  <span>Arbre</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3-2-2">
                <Link to="/dashboard/tournois/lolpro/teams">
                  <Icon type="team" />
                  <span>Équipes</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3-2-3">
                <Link to="/dashboard/tournois/lolpro/rules">
                  <Icon type="profile" />
                  <span>Règlement</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3-2-4">
                <Link to="/dashboard/tournois/lolpro/contact">
                  <Icon type="customer-service" />
                  <span>Contact</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3-3"
              title={
                <span>
                  <Icon type="team" />
                  <span>Lol (Amateur)</span>
                </span>
              }>
              <Menu.Item key="3-3-1">
                <Link to="/dashboard/tournois/lolamateur/arbre-tournois">
                  <Icon type="share-alt" />
                  <span>Arbre</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3-3-2">
                <Link to="/dashboard/tournois/lolamateur/teams">
                  <Icon type="team" />
                  <span>Équipes</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3-3-3">
                <Link to="/dashboard/tournois/lolamateur/rules">
                  <Icon type="profile" />
                  <span>Règlement</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3-3-4">
                <Link to="/dashboard/tournois/lolamateur/contact">
                  <Icon type="customer-service" />
                  <span>Contact</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3-4"
              title={
                <span>
                  <Icon type="team" />
                  <span>Hearthstone</span>
                </span>
              }>
              <Menu.Item key="3-4-1">
                <Link to="/dashboard/tournois/hearthstone/arbre-tournois">
                  <Icon type="share-alt" />
                  <span>Arbre</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3-4-2">
                <Link to="/dashboard/tournois/hearthstone/decks">
                  <Icon type="inbox" />
                  <span>Decks</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3-4-3">
                <Link to="/dashboard/tournois/hearthstone/rules">
                  <Icon type="profile" />
                  <span>Règlement</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3-4-4">
                <Link to="/dashboard/tournois/hearthstone/contact">
                  <Icon type="customer-service" />
                  <span>Contact</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3-5"
              title={
                <span>
                  <Icon type="team" />
                  <span>Battle royal ?</span>
                </span>
              }>
              <Menu.Item key="3-5-1">
                <Icon type="fork" />
                <span>Arbre</span>
              </Menu.Item>
              <Menu.Item key="3-5-2">
                <Icon type="team" />
                <span>Équipes</span>
              </Menu.Item>
              <Menu.Item key="3-5-3">
                <Icon type="profile" />
                <span>Règlement</span>
              </Menu.Item>
              <Menu.Item key="3-5-4">
                <Icon type="customer-service" />
                <span>Contact</span>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3-6"
              title={
                <span>
                  <Icon type="team" />
                  <span>Libre</span>
                </span>
              }>
              <Menu.Item key="3-6-1">
                <Icon type="calendar" />
                <span>Planning prev</span>
              </Menu.Item>
              <Menu.Item key="3-6-2">Proposer un tournois</Menu.Item>
              <Menu.Item key="3-6-3">
                <Icon type="customer-service" />
                <span>Contact</span>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="rocket" />
                <span>Animations</span>
              </span>
            }>
            <Menu.Item key="4-1">
              <Icon type="calendar" />
              <span>Planning scène</span>
            </Menu.Item>
            <Menu.Item key="4-2">
              <Icon type="environment-o" />
              <span>Plan UA</span>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub5"
            title={
              <span>
                <Icon type="shop" />
                <span>Shopping</span>
              </span>
            }>
            <SubMenu
              key="sub4-1"
              title={
                <span>
                  <Icon type="coffee" />
                  <span>Buvette</span>
                </span>
              }>
              <Menu.Item key="4-1-1">
                <Icon type="form" />
                <span>Carte</span>
              </Menu.Item>
              <Menu.Item key="4-1-2">
                <Icon type="dashboard" />
                <span>Attente</span>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4-2"
              title={
                <span>
                  <Icon type="skin" />
                  <span>Magasin</span>
                </span>
              }>
              <Menu.Item key="4-2-1">
                <Icon type="book" />
                <span>Catalogue</span>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
          <Menu.Item key="5">
            <Icon type="star-o" />
            <span>Partenaires</span>
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="copyright" />
            <span>Mentions légales</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
export default LeftBar;
