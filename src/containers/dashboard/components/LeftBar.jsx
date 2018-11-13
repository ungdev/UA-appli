import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSpotlights } from '../../../modules/spotlights'

const SubMenu = Menu.SubMenu;

class LeftBar extends React.Component {
  constructor(props) {
    super(props)
    let current = '1'
    let openKeys = []
    this.props.fetchSpotlights()
    let { location } = this.props
    let tab = location.split('/')
    tab.splice(0, 1)  // remove first element because it's equal to ''
    if(tab[0] === 'dashboard'){
      if(tab[1] === 'admin'){
        openKeys.push('2')
        if(tab[2] === 'users') current = `2-1`
        if(tab[2] === 'paids') current = `2-2`
<<<<<<< HEAD
        if(tab[3] == 'conversations') current= '2-3'
        if(tab.length >= 3 && tab[3] === 'spotlights'){
          openKeys.push('2-4')
          current = `2-4-${tab[3]}`
=======
        if(tab[2] === 'material') current = `2-4`
        if(tab.length >= 2 && tab[2] === 'spotlights'){
          openKeys.push('2-3')
          current = `2-3-${tab[3]}`
>>>>>>> master
        }
        if(tab[2] === 'material') current = `2-4`
      }
      if(tab[1] === 'tournois'){
        openKeys.push('3')
        if(tab.length >= 2){
          tab[2] === 'libre' ? openKeys.push(`3-7`) : openKeys.push(`3-${tab[2]}`)
          if(tab.length >= 4) {
            if(tab[3] === 'arbre-tournois')
            current = `3-${tab[2]}-1`
            if(tab[3] === 'teams')
              current = `3-${tab[2]}-2`
            if(tab[3] === 'rules')
              current = `3-${tab[2]}-3`
            if(tab[3] === 'contact')
              tab[2] === 'libre' ? current = `3-7-4` : current = `3-${tab[2]}-4`
            if(tab[3] === 'decks')
              current = `3-${tab[2]}-2`
            if(tab[3] === 'info')
              tab[2] === 'libre' ? current = `3-7-5` : current = `3-${tab[2]}-5`
            if(tab[3] === 'compare' && tab[2] === 'libre')
              current = `3-7-2`
            if(tab[3] === 'calendar' && tab[2] === 'libre')
              current = `3-7-1`
          }
        }
      }
    }
    this.state = { current, openKeys }
  }

  handleClick = (e) => {
    console.log(e.key)
    this.setState({ current: e.key })
  }

  render() {
    if(this.props.spotlights.length === 0)
      this.props.fetchSpotlights()
    let component = ''
    let { spotlights, user } = this.props
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
            <Menu.Item key={`3-${spotlight.id}-1`} selected>
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
              </Menu.Item>) : (spotlight.name === 'Hearthstone' ?
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
            <Menu.Item key={`3-${spotlight.id}-5`}>
              <Link to={`/dashboard/tournois/${spotlight.id}/info`}>
                <Icon type="info-circle" />
                <span>Informations</span>
              </Link>
            </Menu.Item>
          </SubMenu>)
      )
    } else spotlights = []
    
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[this.state.current]}
        defaultOpenKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        onClick={this.handleClick}
      >
        <Menu.Item key="1" style={{ marginTop: 0 }}>
          <Link to="/dashboard/home">
            <Icon type="home" />
            <span>Accueil</span>
          </Link>
        </Menu.Item>
        {user && user.isAdmin === 100 ? (
          <SubMenu
            key="2"
            title={
              <span>
                <Icon type="thunderbolt" />
                <span>Administration</span>
              </span>
            }
          >
            <Menu.Item key="2-1">
              <Link to={`/dashboard/admin/users`}>
                <Icon type="user" />
                <span>Utilisateurs</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2-2">
              <Link to={`/dashboard/admin/paids`}>
                <Icon type="euro" />
                <span>Mais qui a payé ?</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='2-3'>
              <Link to={'/dashboard/admin/conversations'}>
                <Icon type='message' />
                <span>Messagerie admin</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="2-4"
              title={
                <span>
                  <Icon type="team" />
                  <span>Équipes inscrites</span>
                </span>
              }
            >
            {spotlights.map((spotlight) => (
              <Menu.Item key={`2-4-${spotlight.id}`}>
                <Link to={`/dashboard/admin/spotlights/${spotlight.id}`}>
                  <Icon type="team" />
                  <span>{spotlight.shortName}</span>
                </Link>
              </Menu.Item>
            ))}
            </SubMenu>
            <Menu.Item key="2-4">
              <Link to={`/dashboard/admin/material`}>
                <Icon type="desktop" />
                <span>Matériel</span>
              </Link>
            </Menu.Item>
          </SubMenu>
        ) : null}
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
            <Menu.Item key={`3-${spotlights.length + 1}-1`}>
              <Link to={`/dashboard/tournois/libre/calendar`}>
                <Icon type="calendar" />
                <span>Planning</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={`3-${spotlights.length + 1}-2`}>
              <Link to={`/dashboard/tournois/libre/compare`}>
                <Icon type="build" />
                <span>Comparer mes jeux</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={`3-${spotlights.length + 1}-4`}>
              <Link to={`/dashboard/tournois/libre/contact`}>
                <Icon type="customer-service" />
                <span>Contact</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={`3-${spotlights.length + 1}-5`}>
              <Link to={`/dashboard/tournois/libre/info`}>
                <Icon type="info-circle" />
                <span>Informations</span>
              </Link>
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        <Menu.Item key="6">
          <a href="https://arena.utt.fr/partners">
            <Icon type="star-o" />
            <span>Partenaires</span>
          </a>
        </Menu.Item>
        <Menu.Item key="7">
          <a href="https://arena.utt.fr/mentions-legales">
            <Icon type="copyright" />
            <span>Mentions légales</span>
          </a>
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  location: state.routing.location.pathname,
  spotlights: state.spotlights.spotlights
})

const mapDispatchToProps = dispatch => ({
  fetchSpotlights: () => dispatch(fetchSpotlights())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(LeftBar)
