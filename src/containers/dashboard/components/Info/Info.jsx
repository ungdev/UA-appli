import React from 'react'
import { List, Avatar, Button, Skeleton, Divider, Input } from 'antd'
import GameStatusBar from '../GameStatusBar/GameStatusBar'
import { connect } from 'react-redux'
import { fetchInfos, sendMessage, SET_INFOS_LOADING } from '../../../../modules/infos'
import infoCircle from '../../assets/info-circle.png'
import Delete from './Delete'

const { TextArea } = Input

class Info extends React.Component {

  constructor(props) {
    super(props)
    this.loadData(0, 5)
    this.state = {
      tournament: props.tournament,
      titleValue: '',
      textValue: '',
      maxTitleCaracters: 100,
      maxTextCaracters: 1000,
    }
  }

  loadData = (start, end) => {
    this.props.setLoading()
    this.props.getInfos(this.props.tournament, start, end)
  }

  loadMoreData = () => {
    this.loadData(this.props.infos.length, this.props.infos.length + 5)
  }

  getDate = (time) => {
    let date = time.split('T')[0].split('-')
    let hour = time.split('T')[1].split(':')
    return `Le ${date[2]}/${date[1]} à ${parseInt(hour[0], 10) + 1}:${hour[1]}`
  }

  onTitleChange = (e) => {
    let title = e.target.value
    if(title.length > this.state.maxTitleCaracters)
    title = title.substring(0, this.state.maxTitleCaracters)
    this.setState({ titleValue: title })
  }

  onTextChange = (e) => {
    let message = e.target.value
    if(message.length > this.state.maxTextCaracters)
    message = message.substring(0, this.state.maxTextCaracters)
    this.setState({ textValue: message })
  }

  sendMessage = () => {
    this.props.sendMessage(this.props.tournament === 'libre' ? '7' : this.props.tournament, this.state.titleValue, this.state.textValue)
    this.loadData(0, 5)
    this.setState({ textValue: '', titleValue: '' })
  }


  render() {
    const { loading, tournament, user } = this.props
    let { infos } = this.props
    const { maxTextCaracters } = this.state
    infos = infos.filter(info => `${info.spotlightId}` === (tournament === 'libre' ? '7' : tournament))
    if(tournament !== this.state.tournament) {
      this.loadData(0, 5)
      this.setState({ tournament })
    }
    const loadMore = ( !loading ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        <Button onClick={this.loadMoreData}>voir plus ancien</Button>
      </div>
    ) : null)
    
    return (
      <div>
        {this.props.tournament !== 'libre' && <GameStatusBar game={this.props.tournament} noLastInfo />}
        {user && user.permission && ((user.permission.respo && user.permission.respo.includes(this.props.tournament)) || user.permission.admin) ? (
          <React.Fragment>
            <TextArea
            style={{ marginTop: '20px', width: '25%' }}
            rows={1}
            onChange={this.onTitleChange}
            placeholder="Titre"
            value={this.state.titleValue}
          />
          <TextArea
            style={{ marginTop: '5px', marginBottom: '20px' }}
            rows={2}
            onChange={this.onTextChange}
            placeholder="Message"
            value={this.state.textValue}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }} >
            <Button type="primary" onClick={this.sendMessage}>Envoyer</Button>
            <span style={this.state.textValue.length > maxTextCaracters - 50 ? { color: '#ff0000'} : {}} >{maxTextCaracters - this.state.textValue.length} caractères restants</span>
          </div>
        </React.Fragment>) : null}

        <Divider />
        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={infos}
          locale={{ emptyText: 'Pas d\'informations à afficher' }}
          renderItem={info => (
            <List.Item actions={user && user.permission && ((user.permission.respo && user.permission.respo.includes(this.props.tournament)) || user.permission.admin) ? [
              <Delete infoId={info.id} spotlightId={this.props.tournament} />] : null}>
              <Skeleton avatar title loading={info.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={infoCircle} />}
                  title={info.title}
                  description={info.content}
                  style={{ wordBreak: 'break-word'}}
                />
                <div>{this.getDate(info.createdAt)}</div>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  infos: state.infos.infos,
  loading: state.infos.loading,
  location: state.routing.location.pathname,
})

const mapDispatchToProps = dispatch => ({
  getInfos: (spotlight, start, end) => dispatch(fetchInfos(spotlight, start, end)),
  sendMessage: (spotlight, title, text) => dispatch(sendMessage(spotlight, title, text)),
  setLoading: () => dispatch({ type: SET_INFOS_LOADING })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info)
