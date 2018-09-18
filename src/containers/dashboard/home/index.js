import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { logout } from '../../../modules/login'

import List from '../../../components/list'
import ListItem from '../../../components/list-item'

const Home = props => [
  <h2 key="0">Équipe</h2>,
  <List key="1">
    {!props.user.team && (
      <ListItem clickable={true} onClick={props.createTeam}>
        <h3>Créer une équipe</h3>
        <span>
          Crée ton équipe et invite tes amis à te rejoindre pour participez aux tournois !
        </span>
      </ListItem>
    )}
    {!props.user.team && (
      <ListItem clickable={true} onClick={props.joinTeam}>
        <h3>Rejoindre une équipe</h3>
        <span>Rejoins ton équipe de compétiteurs pour vous inscrire aux tournois !</span>
      </ListItem>
    )}
    {!props.user.team && (
      <ListItem clickable={true} onClick={props.solo}>
        <h3>Rejoindre un tournoi solo</h3>
        <span>Pour rejoindre le tournoi Hearthstone, c'est par ici !</span>
      </ListItem>
    )}
    {!props.user.team && (
      <ListItem clickable={true} onClick={props.requests}>
        <h3>Mes demandes</h3>
        <span>La liste des demandes d'équipe que tu as faite</span>
      </ListItem>
    )}
    {props.user.team && (
      <ListItem clickable={true} onClick={props.teamManagement}>
        <h3>{props.user.team.name}</h3>
        <span>Gère ton équipe, ses membres et vérifie son status d'inscription !</span>
      </ListItem>
    )}
    <ListItem clickable={true} onClick={props.viewParticipants}>
      <h3>Liste des participants</h3>
      <span>Tu veux voir qui est inscrit ? C'est possible ici !</span>
    </ListItem>
  </List>,
  <h2 key="3">{props.user.name}</h2>,
  <List key="4">
    <ListItem clickable={true} onClick={props.payment}>
      <h3>Payer ma place</h3>
      <span>Paye ta place et récupère ton billet d'entrée ! Obligatoire pour les tournois</span>
    </ListItem>
    <ListItem clickable={true} onClick={props.editUser}>
      <h3>Éditer mes infos</h3>
      <span>Accède à ton profil et modifie tes informations si besoin</span>
    </ListItem>
    <ListItem clickable={true} onClick={props.logout}>
      <h3>Déconnexion</h3>
    </ListItem>
  </List>
]

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  editUser: () => dispatch(push('/dashboard/user')),
  payment: () => dispatch(push('/dashboard/payment')),
  requests: () => dispatch(push('/dashboard/requests')),
  solo: () => dispatch(push('/dashboard/solo')),
  createTeam: () => dispatch(push('/dashboard/createTeam')),
  teamManagement: () => dispatch(push('/dashboard/team')),
  joinTeam: () => dispatch(push('/dashboard/joinTeam')),
  viewParticipants: () => dispatch(push('/dashboard/participants')),
  logout: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
