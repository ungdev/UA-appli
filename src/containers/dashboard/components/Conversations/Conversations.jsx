import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { autoLogin } from '../../../../modules/login'
import { fetchUsers } from '../../../../modules/admin'
import {
  fetchConversations,
  SET_CONVERSATIONS_LOADING
} from '../../../../modules/conversations'
import { List, Avatar, Collapse, Input, Button, Tooltip, Icon, Select, Table } from 'antd'

const InputGroup = Input.Group

class Conversations extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      conversations: this.props.conversations,
      user: this.props.user,
      search: []
    }

    this.loadConversations()
    this.props.fetchUsers()
  }

  loadConversations() {
    this.props.setLoading()
    this.props.getConversations()
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        conversations: this.props.conversations,
        user: this.props.user
      })
    }
  }

  setSearch = v => {
    this.setState({
      search: v
    })
  }

  clearSearch = () => {
    this.setState({
      search: []
    })
  }

  startConversation = (id) => {
    this.props.goToConversation(window.location.pathname.split('/')[2], id)
  }

  getTournamentNameById = (id) => {
    const spotlight = this.props.spotlights.find(spotlight => spotlight.id === id)
    return spotlight ? spotlight.shortName : id
  }

  render() {
    let { conversations } = this.state
    let { users } = this.props

    users = users.map(user => {
      return {
        ...user,
        fullname: `${user.name} (${user.firstname} ${user.lastname})`,
        spotlight: this.getTournamentNameById(user.spotlightId)
      }
    })
    
    let conversationsList = ''
    if (conversations) {
      conversationsList = (
        <List
          itemLayout="horizontal"
          dataSource={conversations.map(conversation => {
            return {
              title: conversation.User2.name,
              idTo: conversation.User2.id,
              lastMessage: conversation.messages[0] ? conversation.messages[0].senderId : null // only one element in messages[] got through API
            }
          })}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                avatar={
                  item.lastMessage === null ? (
                    <Avatar
                      icon="check-circle"
                      style={{ backgroundColor: '#3FA9FF' }}
                      theme="filled"
                    />
                  ) : (
                    <Avatar
                      icon="exclamation-circle"
                      style={{ backgroundColor: '#8E8C8A' }}
                      theme="filled"
                    />
                  )
                }
                description={
                  <Link
                    to={{ pathname: `/dashboard/${window.location.pathname.split('/')[2]}/messages/${item.idTo}` }}
                  >
                    Accéder à la conversation
                  </Link>
                }
              />
            </List.Item>
          )}
          locale={{ emptyText: 'Aucune conversation' }}
        />
      )
    }

    let columns = [
      {
        title: 'Utilisateur',
        dataIndex: 'fullname'
      },
      {
        title: 'Équipe',
        dataIndex: 'team'
      },
      {
        title: 'Tournoi',
        dataIndex: 'spotlight'
      },
      {
        title: 'Actions',
        dataIndex: 'id',
        render: (id) => <Tooltip title="Commencer une conversation"><Button type="primary" onClick={() => this.startConversation(id)}><Icon type="arrow-right" /></Button></Tooltip>
      }
    ]

    let rows = users
    if(this.state.search.length > 0) {
      rows = rows.filter(user => {
        return this.state.search.includes(user.fullname)
      })
    }
    
    return (
      <div>
        <Collapse>
          <Collapse.Panel header="Commencer une conversation">
            <InputGroup compact style={{ marginTop: '10px' }}>
              <Select
                mode="tags"
                placeholder="Nom d'utilisateur"
                value={this.state.search}
                onChange={v => this.setSearch(v)}
                style={{ width: '250px' }}
              >
                {users.map((user, i) => <Select.Option value={user.fullname} key={i}>{user.fullname}</Select.Option>)}
              </Select>
              <Tooltip title="Réinitialiser" placement="right">
                <Button type="primary" style={{ paddingRight: '10px', paddingLeft: '10px' }} onClick={this.clearSearch}><Icon type="close"></Icon></Button>
              </Tooltip>
            </InputGroup>

            <Table
              columns={columns}
              dataSource={rows}
              rowKey="id"
              locale={{ emptyText: 'Aucun utilisateur' }}
              style={{ marginTop: '20px' }}
            />
          </Collapse.Panel>
        </Collapse>
        <br />

        {conversationsList}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  users: state.admin.users,
  spotlights: state.spotlights.spotlights,
  conversations: state.conversations.conversations,
  loading: state.conversations.loading,
  location: state.routing.location.pathname
})

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin()),
  redirectToHome: () => dispatch(push('/dashboard/home')),
  goToHome: () => dispatch(push('/dashboard/home')),
  getConversations: () => dispatch(fetchConversations()),
  fetchUsers: () => dispatch(fetchUsers()),
  setLoading: () => dispatch({ type: SET_CONVERSATIONS_LOADING }),
  goToConversation: (role, id) => {console.log(`/dashboard/${role}/messages/${id}`); dispatch(push(`/dashboard/${role}/messages/${id}`))}
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversations)
