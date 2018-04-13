import React from 'react';
import { Col, Icon, Row, Tag } from 'antd';
import HearthstoneJSON from 'hearthstonejson-client';

class HsDecksDeckInfo extends React.Component {
  render() {
    return this.props.deck.cards.map(card => {
      return (
        <p>
          <Row align="top" justify="center" type="flex">
            <Col span={3}>
              <Tag color="#2db7f5">{card[0].cost}</Tag>
            </Col>
            <Col span={18}>
              <div fontSize="smaller">{card[0].name.toUpperCase()}</div>
            </Col>
            <Col span={3}>
              <Tag>
                {card[0].rarity == 'LEGENDARY' ? (
                  <Icon type="star" />
                ) : (
                  <div>{card[1]}</div>
                )}
              </Tag>
            </Col>
          </Row>
        </p>
      );
    });
  }
}
export default HsDecksDeckInfo;
