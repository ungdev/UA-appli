import React from 'react'
import { Menu, Icon, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSpotlights } from '../../../modules/spotlights'

const SubMenu = Menu.SubMenu;

class LeftBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKeys: {}
    }
    this.props.fetchSpotlights()
  }

  render() {
    this.props.fetchSpotlights()
    console.log('spotlights', this.props.spotlights)
    let component = ''
    let { spotlights } = this.props 
    if(spotlights){
      component = spotlights.map((spotlight) => 
        (<SubMenu
            key={`3-${spotlight.id}`}
            title={
              <span>
                <Icon type="team" />
                <span>{spotlight.shortName}</span>
              </span>
            }
          >
            <Menu.Item key={`3-${spotlight.id}-1`}>
              <Link to={`/dashboard/tournois/${spotlight.id}/arbre-tournois`}>
                <Icon type="share-alt" />
                <span>Arbre</span>
              </Link>
            </Menu.Item>
            {
              spotlight.perTeam > 1 ? 
              (<Menu.Item key={`3-${spotlight.id}-2`}>
                <Link to={`/dashboard/tournois/${spotlight.id}/teams`}>
                  <Icon type="team" />
                  <span>Équipes</span>
                </Link>
              </Menu.Item>) : (spotlight.shortName === 'HS' ?
              (<Menu.Item key={`3-${spotlight.id}-2`}>
              <Link to={`/dashboard/tournois/${spotlight.id}/decks`}>
                <Icon type="inbox" />
                <span>Decks</span>
              </Link>
            </Menu.Item>) : '')
            }
            <Menu.Item key={`3-${spotlight.id}-3`}>
              <Link to={`/dashboard/tournois/${spotlight.id}/rules`}>
                <Icon type="profile" />
                <span>Règlement</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={`3-${spotlight.id}-4`}>
              <Link to={`/dashboard/tournois/${spotlight.id}/contact`}>
                <Icon type="customer-service" />
                <span>Contact</span>
              </Link>
            </Menu.Item>
          </SubMenu>)
      )
    } else spotlights = []
    
    return (<div>
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
          }
          onClick={this.props.fetchSpotlights}
          >
          {component}
          <SubMenu
            key={`3-${spotlights.length + 1}`}
            title={
              <span>
                <Icon type="team" />
                <span>Libre</span>
              </span>
            }>
            <Menu.Item key={`3-${spotlights.length + 1}`}>
              <Icon type="calendar" />
              <span>Planning prev</span>
            </Menu.Item>
            <Menu.Item key={`3-${spotlights.length + 1}-2`}>Proposer un tournois</Menu.Item>
            <Menu.Item key={`3-${spotlights.length + 1}-3`}>
              <Icon type="customer-service" />
              <span>Contact</span>
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="4"
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
          key="5"
          title={
            <span>
              <Icon type="shop" />
              <span>Shopping</span>
            </span>
          }>
          <SubMenu
            key="5-1"
            title={
              <span>
                <Icon type="coffee" />
                <span>Buvette</span>
              </span>
            }>
            <Menu.Item key="5-1-1">
              <Icon type="form" />
              <span>Carte</span>
            </Menu.Item>
            <Menu.Item key="5-1-2">
              <Icon type="dashboard" />
              <span>Attente</span>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="5-2"
            title={
              <span>
                <Icon type="skin" />
                <span>Magasin</span>
              </span>
            }>
            <Menu.Item key="5-2-1">
              <Icon type="book" />
              <span>Catalogue</span>
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        <Menu.Item key="6">
          <Icon type="star-o" />
          <span>Partenaires</span>
        </Menu.Item>
        <Menu.Item key="7">
          <Icon type="copyright" />
          <span>Mentions légales</span>
        </Menu.Item>
      </Menu>
    </div>)
  }
}

const mapStateToProps = state => ({
  spotlights: state.spotlights.spotlights
})

const mapDispatchToProps = dispatch => ({
  fetchSpotlights: () => dispatch(fetchSpotlights())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(LeftBar)
