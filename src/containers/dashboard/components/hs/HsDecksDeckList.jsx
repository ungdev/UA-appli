import React from 'react';
import { Col, Icon, Popover, Row, Tag } from 'antd'
import { connect } from 'react-redux'

class HsDecksDeckList extends React.Component {
  render() {
    return this.props.deck.cards.sort((c1, c2) => {
      if(c1.cost > c2.cost) return 1
      if(c1.cost < c2.cost) return -1
      return 0
    })
    .map((card, key) => {
      return (
        <Popover
          content={
            this.props.golden ?
              <img
                src={`http://media.services.zam.com/v1/media/byName/hs/cards/enus/animated/${card.id}_premium.gif`}
                alt={card.name}
              /> :
              <img
              src={`http://media.services.zam.com/v1/media/byName/hs/cards/enus/${card.id}.png`}
              alt={card.name}
            />
          }
          trigger="hover"
          key={key}
          placement="rightBottom">
          <Row align="center" justify="center">
            <Col span={2}>
              <Tag color="#2db7f5">{card.cost}</Tag>
            </Col>
            <Col offset={1} span={18}>
              <div className="cardName">{card.name.toUpperCase()}</div>
            </Col>
            <Col offset={1} span={1}>
              <Tag color="#736a61">
                {card.rarity === 'LEGENDARY' ? (
                  <Icon type="star" />
                ) : (
                  <div>x{card.quantity}</div>
                )}
              </Tag>
            </Col>
          </Row>
        </Popover>
      );
    });
  }
}


const mapStateToProps = state => ({
  alldecks: state.hearthstone.decks,
})

const mapDispatchToProps = dispatch => ({
  //getCardImage: (id) => dispatch(getCardImage(id))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps)(HsDecksDeckList)

