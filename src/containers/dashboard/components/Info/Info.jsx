import React from 'react'
import { List, Avatar, Button, Skeleton, Divider, Icon } from 'antd'
import GameStatusBar from '../GameStatusBar/GameStatusBar'
import { connect } from 'react-redux'
import { fetchInfos, SET_INFOS_LOADING } from '../../../../modules/infos'
import infoCircle from '../../assets/info-circle.png'

class Info extends React.Component {

  constructor(props) {
    super(props)
    this.loadData(0, 5)
    this.state = {
      tournament: props.tournament,
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
    return `Le ${date[2]}/${date[1]} à ${hour[0]}:${hour[1]}`
  }


  render() {
    const { loading, tournament } = this.props
    let { infos } = this.props
    infos = infos.filter(info => info.spotlightId == tournament)
    if(tournament != this.state.tournament) {
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
        <GameStatusBar game={this.props.tournament} noLastInfo />
        <Divider />
        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={infos}
          renderItem={info => (
            <List.Item actions={[<a>edit</a>, <a><Icon type="delete"/></a>]}>
              <Skeleton avatar title loading={info.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={infoCircle} />}
                  title={info.title}
                  description={(info.content)}
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
  infos: state.infos.infos,
  loading: state.infos.loading,
  location: state.routing.location.pathname,
})

const mapDispatchToProps = dispatch => ({
  getInfos: (spotlight, start, end) => dispatch(fetchInfos(spotlight, start, end)),
  setLoading: () => dispatch({ type: SET_INFOS_LOADING })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info)
