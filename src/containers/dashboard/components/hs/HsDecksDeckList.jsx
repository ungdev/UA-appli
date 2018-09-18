import React from 'react';
import { Col, Icon, Popover, Row, Tag } from 'antd';

class HsDecksDeckList extends React.Component {
  render() {
    return this.props.deck.cards.map((card, key) => {
      let cardId = card[2].id;
      return (
        <Popover
          content={
            <img
              src={`http://localhost:3000/cardImage/${cardId}.png`}
              alt={card[2].name}
            />
          }
          trigger="hover"
          key={key}
          placement="rightBottom">
          <Row align="center" justify="center">
            <Col span={2}>
              <Tag color="#2db7f5">{card[2].cost}</Tag>
            </Col>
            <Col offset={1} span={18}>
              <div className="cardName">{card[2].name.toUpperCase()}</div>
            </Col>
            <Col offset={1} span={1}>
              <Tag color="#736a61">
                {card[2].rarity === 'LEGENDARY' ? (
                  <Icon type="star" />
                ) : (
                  <div>x{card[1]}</div>
                )}
              </Tag>
            </Col>
          </Row>
        </Popover>
      );
    });
  }
}
export default HsDecksDeckList;
